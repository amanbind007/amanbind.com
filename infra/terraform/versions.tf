terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40"
    }
  }

  # Remote state. Create the bucket + lock table once, by hand or with a
  # bootstrap stack, then uncomment.
  # backend "s3" {
  #   bucket         = "amanbind-tfstate"
  #   key            = "portfolio/terraform.tfstate"
  #   region         = "ap-south-1"
  #   dynamodb_table = "amanbind-tflock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.region
  default_tags {
    tags = local.tags
  }
}

# ACM certificates consumed by CloudFront must live in us-east-1,
# regardless of where the rest of the stack is deployed.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = local.tags
  }
}

# Credentials come from CLOUDFLARE_API_TOKEN in the environment.
# Never commit the token — see README.
provider "cloudflare" {}
