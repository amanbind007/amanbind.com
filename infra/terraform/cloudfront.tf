resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for the ${var.domain_name} origin bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# One viewer-request function does two jobs:
#
#   1. Redirect www -> apex with a 301, so the canonical host is unambiguous.
#      Doing it here rather than at Cloudflare keeps the behaviour with the
#      distribution, so it holds regardless of how DNS is pointed.
#   2. Rewrite directory-style routes. Astro emits /about/index.html, and
#      CloudFront only resolves a default root object at the root, so /about
#      would otherwise 404.
resource "aws_cloudfront_function" "router" {
  name    = "${replace(var.domain_name, ".", "-")}-router"
  runtime = "cloudfront-js-2.0"
  comment = "www -> apex redirect and directory index rewrite"
  publish = true

  code = <<-JS
    function handler(event) {
      var request = event.request;
      var host = request.headers.host ? request.headers.host.value : '';
      var uri = request.uri;

      if (host === '${local.www_domain}') {
        var qs = '';
        for (var key in request.querystring) {
          qs += (qs === '' ? '?' : '&') + key;
          if (request.querystring[key].value !== '') {
            qs += '=' + request.querystring[key].value;
          }
        }
        return {
          statusCode: 301,
          statusDescription: 'Moved Permanently',
          headers: {
            location: { value: 'https://${var.domain_name}' + uri + qs },
            'cache-control': { value: 'max-age=3600' }
          }
        };
      }

      if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
      } else if (!uri.includes('.')) {
        request.uri = uri + '/index.html';
      }

      return request;
    }
  JS
}

resource "aws_cloudfront_response_headers_policy" "security" {
  name = "${replace(var.domain_name, ".", "-")}-security-headers"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 63072000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=(), interest-cohort=()"
      override = true
    }
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.domain_name} static site"
  default_root_object = "index.html"
  price_class         = var.price_class
  aliases             = [var.domain_name, local.www_domain]

  origin {
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    # AWS managed policies: CachingOptimized + CORS-S3Origin.
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.router.arn
    }
  }

  # Hashed assets are immutable — cache them hard.
  ordered_cache_behavior {
    path_pattern           = "/_astro/*"
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
