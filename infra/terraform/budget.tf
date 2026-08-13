# Cheap insurance. CloudFront has no spend cap, and while this site sits far
# inside the perpetual free tier (1 TB egress / 10M requests per month), a
# sustained flood could in principle push past it. A budget alert turns a
# surprise invoice into an email.
#
# The first two AWS Budgets on an account are free.

resource "aws_budgets_budget" "monthly" {
  name         = "${replace(var.domain_name, ".", "-")}-monthly"
  budget_type  = "COST"
  limit_amount = var.monthly_budget_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  # Warn well before the number matters, then again if it keeps climbing.
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 50
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_alert_email]
  }

  # Catches a spike early, before the month's actual spend has landed.
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.budget_alert_email]
  }
}
