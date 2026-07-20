locals {
  www_domain = "www.${var.domain_name}"

  tags = merge(
    {
      Project   = "amanbind.com"
      ManagedBy = "terraform"
      Owner     = "amanbind007"
    },
    var.tags,
  )
}

data "aws_caller_identity" "current" {}

# Route 53 zone for the domain. Registered separately — this only reads it,
# so Terraform never risks destroying the zone (and its NS delegation).
data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}
