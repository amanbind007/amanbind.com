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

variable "monthly_budget_usd" {
  description = "Monthly cost alert threshold. Expected steady state is $0 — this is a tripwire, not a target."
  type        = string
  default     = "5"
}

variable "budget_alert_email" {
  description = "Where budget alerts are sent."
  type        = string
  default     = "amanbind007@gmail.com"
}

variable "github_environment" {
  description = "GitHub Actions environment used by the deploy job. Its deployment-branch policy must be restricted to github_branch."
  type        = string
  default     = "production"
}

variable "github_owner" {
  description = "GitHub account that owns the repository."
  type        = string
  default     = "amanbind007"
}

variable "github_owner_id" {
  description = "Numeric GitHub account ID, used in the immutable OIDC subject claim. `gh api /users/<owner> --jq .id`"
  type        = string
  default     = "75306571"
}

variable "github_repo_name" {
  description = "Repository name without the owner prefix."
  type        = string
  default     = "amanbind.com"
}

variable "github_repo_id" {
  description = "Numeric repository ID, used in the immutable OIDC subject claim. `gh api /repos/<owner>/<repo> --jq .id`"
  type        = string
  default     = "1333547611"
}
