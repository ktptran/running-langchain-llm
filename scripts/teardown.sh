#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Environment variables
. $SCRIPT_DIR/env.sh

# Deleting SSM Parameters
aws ssm delete-parameter --name "/$PROJECT_NAME/$ENV/OPEN_API_KEY"
aws ssm delete-parameter --name "/$PROJECT_NAME/$ENV/HUGGINGFACEHUB_API_TOKEN"

# Destroy CDK
echo "Tearing down CDK application..."
cd $SCRIPT_DIR/../cdk
cdk destroy --all --force

# Deleting CDK bootstrap
echo "Deleting CDK bootstrap in $AWS_REGION..."
CDK_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name CDKToolkit \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --region $AWS_REGION \
    --output text)
. $SCRIPT_DIR/delete-s3-object-version.sh --bucket $CDK_BUCKET
aws s3 rb s3://$CDK_BUCKET
aws cloudformation delete-stack --stack-name CDKToolkit --region $AWS_REGION

# Return to root project directory
echo "Changing back to root project directory"
cd $SCRIPT_DIR/../
