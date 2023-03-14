FROM python:3.9

WORKDIR /usr/src/app
ADD api/server.py api/
COPY speech/ speech/
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python","api/server.py"]