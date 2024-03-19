"""Sample handler"""
import logging
import os

from botocore.exceptions import ClientError
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import HuggingFaceInstructEmbeddings
from langchain_community.llms import HuggingFaceEndpoint
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from PyPDF2 import PdfReader
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
        question = event['question']
        logger.info("Lambda context: %s", context)

        logger.info("Getting SSM parameter keys")
        hugging_face = get_parameter(HUGGINGFACE_KEY)
        OPENAI_API_KEY = get_parameter(OPEN_API_KEY)
        os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

        logger.info("Generating LLM response")
        response = generate_response(question, hugging_face)     

        logger.info("Returning response")
        return api_response(200, response)
    except ClientError as e:
        logger.error(e)
        return api_response(500, e.response['Error']['Code'])


def get_pdf_text(pdf_doc):
    """Gets PDF text
    :params: pdf_docs: list of pdfs
    :return: text: string of pdf text
    """
    text = ""
    pdf_reader = PdfReader(pdf_doc)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text


def get_text_chunks(raw_text):
    """Split raw text into chunks
    :params: raw_text: text of pdfs
    :return: chunks: chunks of text
    """
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(raw_text)
    return chunks


def get_vectorstore(text_chunks):
    """Generates vector store
    :params: text_chunks: text chunks of pdfs
    :return: vectorstore: vector store
    """
    # Conducting through OpenAI servers
    embeddings = OpenAIEmbeddings()
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore, hugging_face):
    """Generates conversation chain
    :params: vectorstore: vector store
    :return: conversation_chain: conversation chain
    """
    # llm = ChatOpenAI()
    llm = HuggingFaceEndpoint(
        huggingfacehub_api_token=hugging_face,
        repo_id="google/flan-t5-xxl",
    )
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain

def generate_response(question, hugging_face):
    pdf_doc = open('./running.pdf', 'rb')
    # TODO: Train model beforehand and have it available
    raw_text = get_pdf_text(pdf_doc)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)
    chat = get_conversation_chain(vectorstore, hugging_face)
    # Then we can simply ask question
    response = chat.invoke({"question": question})
    summary = {
        "question": response["question"],
        "answer": response["answer"],
    }
    return summary



if __name__ == "__main__":
    event = {
        "question": "Testing this is the way."
    }
    response = lambda_handler(event, {})
    print(response['body'])
