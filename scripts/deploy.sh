#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Set environment variables
. $SCRIPT_DIR/env.sh

# Check for CDK Toolkit
echo "Checking for CDK Bootstrap in us-east-1 for AWS WAF..."
cfn_us_east_1=$(aws cloudformation describe-stacks \
    --query "Stacks[?StackName=='CDKToolkit'].StackName" \
    --region us-east-1 \
    --output text)

if [[ -z "$cfn_us_east_1" ]]; then 
    cdk bootstrap aws://$AWS_ACCOUNT_ID/us-east-1
fi

if [ "us-east-1" != "$AWS_REGION" ]; then
    echo "Checking for CDK Bootstrap in current $AWS_REGION..."
    cfn=$(aws cloudformation describe-stacks \
        --query "Stacks[?StackName=='CDKToolkit'].StackName" \
        --region $AWS_REGION \
        --output text)
    if [[ -z "$cfn" ]]; then
        cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION
    fi
fi

# Deploy CDK
echo "Launching CDK application..."
cd $SCRIPT_DIR/../cdk
cdk synth
cdk deploy --all --require-approval never

# Retrieve frontend configurations for aws-exports
AMPLIFY_EXPORT=$SCRIPT_DIR/../frontend/src/aws-exports.js
cp $SCRIPT_DIR/../frontend/src/aws-exports.js.template $AMPLIFY_EXPORT

# Get CloudFormation outputs
HTTP_API_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name ApiStack \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
    --region $AWS_REGION \
    --output text)

sed -i -e "s,%API_ENDPOINT%,$HTTP_API_ENDPOINT,g" $AMPLIFY_EXPORT

# Deploy frontend to S3 bucket
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --region $AWS_REGION \
    --stack-name WebStack \
    --query 'Stacks[0].Outputs[?OutputKey==`SiteBucketName`].OutputValue' \
    --output text)
cd $SCRIPT_DIR/../frontend/ && npm run build
aws s3 cp $SCRIPT_DIR/../frontend/build s3://$BUCKET_NAME/ --recursive

# Return to root project directory
CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --region $AWS_REGION \
    --stack-name WebStack \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionDomainName`].OutputValue' \
    --output text)
echo "Changing back to root project directory"
cd $SCRIPT_DIR/../
echo "Your application is ready at: $CLOUDFRONT_URL"
