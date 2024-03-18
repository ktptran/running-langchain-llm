#!/bin/bash

# Setting environment variables
export ENV="dev"
export PROJECT_NAME="llm"
export AWS_REGION="us-east-1"
export AWS_ACCOUNT_ID=`aws sts get-caller-identity --query Account --output text`