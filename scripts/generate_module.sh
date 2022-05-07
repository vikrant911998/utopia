#!/bin/bash

moduleName="$1"

mkdir -p "$moduleName" 
cd "$moduleName"
mkdir -p controller && cd controller && touch "$moduleName".controller.js
cd ..
mkdir -p routes && cd routes && touch "$moduleName".route.js
cd ..
mkdir -p services && cd services && touch "$moduleName".service.js
cd ..
mkdir -p middleware && cd middleware && touch "$moduleName".middleware.js
cd ..
mkdir -p model && cd model && touch "$moduleName".model.js