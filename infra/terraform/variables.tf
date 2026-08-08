variable "domain_name" {
  description = "Apex domain the site is served from."
  type        = string
  default     = "amanbind.com"
}

variable "region" {
  description = "Region for the origin bucket and supporting resources."
  type        = string
  default     = "ap-south-1"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the zone."
  type        = string
}

variable "github_repository" {
  description = "owner/repo allowed to assume the deploy role via GitHub OIDC."
  type        = string
  default     = "amanbind007/amanbind.com"
}

variable "github_branch" {
  description = "Branch permitted to deploy. Keep this narrow."
  type        = string
  default     = "main"
}

variable "create_oidc_provider" {
  description = "Set false if the GitHub OIDC provider already exists in this account."
  type        = bool
  default     = true
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_200 covers India + EU + NA."
  type        = string
  default     = "PriceClass_200"
}

variable "tags" {
  description = "Extra tags merged onto every AWS resource."
  type        = map(string)
  default     = {}
}
