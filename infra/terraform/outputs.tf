output "bucket_name" {
  description = "Origin bucket — set as AWS_S3_BUCKET in GitHub Actions."
  value       = aws_s3_bucket.site.id
}

output "distribution_id" {
  description = "CloudFront distribution — set as AWS_CLOUDFRONT_DISTRIBUTION_ID."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_domain" {
  description = "CloudFront domain name, for testing before DNS propagates."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "deploy_role_arn" {
  description = "Role ARN — set as AWS_DEPLOY_ROLE_ARN in GitHub Actions."
  value       = aws_iam_role.github_deploy.arn
}

output "site_url" {
  description = "Public URL once DNS has propagated."
  value       = "https://${var.domain_name}"
}
