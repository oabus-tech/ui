output "bucket_name" {
  value       = aws_s3_bucket.site.id
  description = "S3 bucket name for site assets."
}

output "bucket_arn" {
  value = aws_s3_bucket.site.arn
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.site.id
  description = "CloudFront distribution ID (use for invalidations)."
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "domain_name" {
  value       = var.enable_custom_domain ? var.domain_name : aws_cloudfront_distribution.site.domain_name
  description = "Public domain (custom when enabled, else *.cloudfront.net)."
}

output "site_url" {
  value = var.enable_custom_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.site.domain_name}"
}
