#!/bin/bash

dropdb onions
createdb onions

dir=$(dirname "$0")

psql -d onions --single-transaction -v ON_ERROR_STOP=1 -f "${dir}/initdb.sql"