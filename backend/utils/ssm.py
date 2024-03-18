import boto3

ssm = boto3.client('ssm')

def get_parameter(name):
    """Returns SSM parameter
    
    :param: name: SSM parameter string name
    :return: value: SSM parameter value
    """
    value = ssm.get_parameter(Name=name,WithDecryption=True)['Parameter']['Value']
    return value