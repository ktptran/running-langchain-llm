"""Sample handler"""


def handler(event, context):
    print(event)

if __name__ == "__main__":
    event = {}
    print(handler(event, {}))    