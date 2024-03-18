"""Sample handler"""
import json
import os

import boto3

ssm = boto3.client('ssm')


HUGGINGFACE_KEY = os.environ['HUGGINGFACE_KEY']
OPEN_API_KEY = os.environ['OPEN_API_KEY']

def lambda_handler(event, context):
    print("[INFO] Open API: "+ ssm.get_parameter(Name=HUGGINGFACE_KEY,WithDecryption=True)['Parameter']['Value'])
    print("[INFO] Hugging Face: "+ ssm.get_parameter(Name=OPEN_API_KEY,WithDecryption=True)['Parameter']['Value'])

if __name__ == "__main__":
    event = {}
    print(lambda_handler(event, {}))    