FROM node:12.18.4

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    sudo vim build-essential ca-certificates software-properties-common \
    libsm6 libxext6 libxrender-dev locales locales-all && \
    mkdir /workspace/tutorial
    
# ADD ../tutorial /workspace/tutorial/

WORKDIR /workspace