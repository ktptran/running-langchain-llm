"""Sample handler"""
import json
import logging
import os

from botocore.exceptions import ClientError
from utils.processing import api_response
from utils.ssm import get_parameter

logger = logging.getLogger()
logger.setLevel(logging.INFO)


HUGGINGFACE_KEY = os.environ['HUGGINGFACE_KEY']
OPEN_API_KEY = os.environ['OPEN_API_KEY']

def lambda_handler(event, context):
    """Returns response from OpenAI model.
    
    :param: event: lambda event
    :param: context: lambda context
    :return: api_response: response of 200 or 500 associated with message/response
    """
    try:
        logger.info("Lambda event: %s", event)
        logger.info("Lambda context: %s", context)

        logger.info("Getting SSM parameter keys")
        hugging_face = get_parameter(HUGGINGFACE_KEY)
        open_api = get_parameter(OPEN_API_KEY)

        logger.info("Generating LLM response")
        response = generate_response(hugging_face, open_api)     

        logger.info("Returning response")
        return api_response(200, response)
    except ClientError as e:
        logger.error(e)
        return api_response(500, e)


def generate_response(hugging_face, open_api):
    return "Sample Response"


if __name__ == "__main__":
    sample_event = {}
    print(lambda_handler(sample_event, {}))    