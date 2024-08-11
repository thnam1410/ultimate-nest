#! /bin/bash

SRC_DIR="./libs/proto-schema/src/proto/*.proto"
DEST_DIR="./"

protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=nestJs=true,addGrpcMetadata=true,useDate=true --ts_proto_out=${DEST_DIR} ${SRC_DIR}
