variable "enable_custom_domain" {
  type        = bool
  description = "Provision ACM cert + Route53 alias for var.domain_name. Set false when NS not yet pointing to Route53."
  default     = true
}

variable "domain_name" {
  type        = string
  description = "Public domain served by CloudFront (used only when enable_custom_domain = true)."
  default     = ""
}

variable "hosted_zone_name" {
  type        = string
  description = "Route53 hosted zone name (used only when enable_custom_domain = true)."
  default     = ""
}

variable "bucket_name" {
  type        = string
  description = "Globally unique S3 bucket name for site assets."
}

variable "price_class" {
  type        = string
  description = "CloudFront price class."
  default     = "PriceClass_100"
}

variable "default_root_object" {
  type    = string
  default = "index.html"
}

variable "spa_fallback" {
  type        = bool
  description = "Map 403/404 to /index.html (200) for client-side routing."
  default     = true
}

variable "tags" {
  type    = map(string)
  default = {}
}
