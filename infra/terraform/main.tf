locals {
  www_domain = "www.${var.domain_name}"

  # Legacy hostname. It briefly served a self-hosted page and went out on job
  # applications, so it has to keep resolving — it 301s to the apex.
  bio_domain = "bio.${var.domain_name}"

  # Everything the distribution answers for. Only the apex serves content;
  # the rest redirect.
  alias_domains = [local.www_domain, local.bio_domain]

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
