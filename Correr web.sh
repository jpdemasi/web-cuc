#!/bin/bash

(cd client/src && npm run dev) &
CLIENT_PID=$!

(cd server/src && npm run dev) &
SERVER_PID=$!

trap 'kill $CLIENT_PID $SERVER_PID 2>/dev/null' EXIT

wait
