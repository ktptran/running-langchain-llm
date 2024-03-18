"""Module providing image processing and api response."""
import json


def api_response(status_code, body):
    """Returns API response.
    
    :param status_code: api status code
    :param body: response body
    :returns api_response: api response
    """
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
        },
        "body": json.dumps(body)
    }
