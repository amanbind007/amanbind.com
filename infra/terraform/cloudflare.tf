# ---------------------------------------------------------------------------
# DNS
#
# Both names are CNAMEs to the CloudFront distribution. Cloudflare flattens the
# apex CNAME automatically, so no ALIAS/ANAME support is needed.
#
# proxied = false is deliberate. CloudFront already terminates TLS with the ACM
# certificate below and serves as the CDN; proxying through Cloudflare as well
# would mean two CDNs, two caches to invalidate, and Cloudflare re-originating
# to CloudFront on every miss. DNS-only keeps one cache and one TLS chain.
# ---------------------------------------------------------------------------

resource "cloudflare_record" "apex" {
  zone_id = data.cloudflare_zone.primary.id
  name    = "@"
  type    = "CNAME"
  content = aws_cloudfront_distribution.site.domain_name
  proxied = false
  ttl     = 1 # 1 = automatic
  comment = "Portfolio site — CloudFront origin (managed by Terraform)"
}

resource "cloudflare_record" "www" {
  zone_id = data.cloudflare_zone.primary.id
  name    = "www"
  type    = "CNAME"
  content = aws_cloudfront_distribution.site.domain_name
  proxied = false
  ttl     = 1
  comment = "Redirects to apex via CloudFront function (managed by Terraform)"
}

resource "cloudflare_record" "bio" {
  zone_id = data.cloudflare_zone.primary.id
  name    = "bio"
  type    = "CNAME"
  content = aws_cloudfront_distribution.site.domain_name
  proxied = false
  ttl     = 1
  comment = "Legacy host — 301s to apex via CloudFront function (managed by Terraform)"
}

# ---------------------------------------------------------------------------
# ACM DNS validation records
# ---------------------------------------------------------------------------

resource "cloudflare_record" "cert_validation" {
  for_each = {
    for option in aws_acm_certificate.site.domain_validation_options :
    option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  zone_id = data.cloudflare_zone.primary.id
  name    = each.value.name
  type    = each.value.type
  content = each.value.record
  proxied = false
  ttl     = 60

  # ACM re-issues on renewal; letting Terraform adopt an existing record
  # avoids a conflict if validation has already been satisfied once.
  allow_overwrite = true
}
