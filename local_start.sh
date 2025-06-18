#!/bin/bash

export VITE_APP_USERNAME=admin
export VITE_APP_PASSWORD=mypass
export VITE_API_URL=https://www.dbeelogs.me/api

export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=logapp
export DB_USER=postgres
export DB_PASS=postgrespass
export DB_SSLMODE=false

npm run dev
