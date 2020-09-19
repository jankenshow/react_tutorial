#!/bin/bash

docker run -it --rm \
-p 8080:8080 \
-v ../tutorial:/workspace/tutorial \
react_app:latest \
/bin/bash
