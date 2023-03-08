FROM python:3.9

ADD api/server.py api/
COPY ./speech/ speech/
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

CMD ["python","api/server.py"]