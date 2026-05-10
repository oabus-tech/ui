terraform {
  backend "s3" {
    bucket         = "oabus-terraform-state"
    key            = "oabus-ui/storybook/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "oabus-terraform-locks"
    encrypt        = true
  }
}
