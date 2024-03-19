import base64
import json

from llama_cpp import Llama

# Load the LLM, outside the handler so it persists between runs
llm = Llama(
    model_path="./model/phi-2.Q4_K_M.gguf", # change if different model
    n_ctx=2048, # context length
    n_threads=6,  # maximum in AWS Lambda
)

def handler(event, context):
    print("Event is:", event)
    print("Context is:", context)

        # Locally the body is not encoded, via lambda URL it is
    try:
        if event.get('isBase64Encoded', False):
            body = base64.b64decode(event['body']).decode('utf-8')
        else:
            body = event['body']

        body_json = json.loads(body)
        prompt = body_json["prompt"]
    except (KeyError, json.JSONDecodeError) as e:
        return {"statusCode": 400, "body": f"Error processing request: {str(e)}"}

    output = llm(
        f"Instruct: {prompt}\nOutput:",
        max_tokens=512, 
        echo=True,
    )

    return {
        "statusCode": 200,
        "body": json.dumps(output)
    }
