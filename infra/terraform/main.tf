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

# The zone is managed outside this stack — it also carries the cloudflared
# tunnel records for self-hosted services, so Terraform reads it rather than
# owning it. Nothing here can destroy the zone or touch unrelated records.
data "cloudflare_zone" "primary" {
  name = var.domain_name
}
