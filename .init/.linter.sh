#!/bin/bash
cd /home/kavia/workspace/code-generation/conversational-query-assistant-1326-1335/chatbot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

