#!/bin/bash

# Create data and log directories if they don't exist
mkdir -p ~/mongodb/data
mkdir -p ~/mongodb/logs

# Start MongoDB server
mongod --dbpath ~/mongodb/data --logpath ~/mongodb/logs/mongod.log --port 27017 --bind_ip 127.0.0.1 --fork


#to start mongod
#sudo mkdir -p /data/db
#sudo chown -R $USER:$USER /data/db