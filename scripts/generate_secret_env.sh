#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo "Script directory: $SCRIPT_DIR"

# Read input variables
OPEN_API_KEY=$1
HUGGINGFACEHUB_API_TOKEN=$2

# Generating secret_env.sh
SECRET_ENV_EXPORT=$SCRIPT_DIR/secret_env.sh
cp $SCRIPT_DIR/secret_env.sh.template $SECRET_ENV_EXPORT
sed -i -e "s/%OPEN_API_KEY%/$OPEN_API_KEY/g" $SECRET_ENV_EXPORT
sed -i -e "s/%HUGGINGFACEHUB_API_TOKEN%/$HUGGINGFACEHUB_API_TOKEN/g" $SECRET_ENV_EXPORT

echo "Generated secret environment script"
cat $SECRET_ENV_EXPORT


