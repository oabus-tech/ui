module "site" {
  source = "../../modules/static-site"

  enable_custom_domain = true

  domain_name      = var.domain_name
  hosted_zone_name = var.hosted_zone_name
  bucket_name      = var.bucket_name
  price_class      = "PriceClass_100"
}

output "bucket_name" {
  value = module.site.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.site.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  value = module.site.cloudfront_domain_name
}

output "domain_name" {
  value = module.site.domain_name
}

output "site_url" {
  value = module.site.site_url
}
