resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = local.alias_domains
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Validation records live in Cloudflare — see cloudflare.tf.
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site.arn
  validation_record_fqdns = [
    for record in cloudflare_record.cert_validation : record.hostname
  ]

  timeouts {
    create = "15m"
  }
}
