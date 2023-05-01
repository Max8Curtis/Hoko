FROM python:3.9

WORKDIR /usr/src/app
COPY api/ api/
COPY speech/ speech/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python","api/server.py"]