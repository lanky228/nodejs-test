#!/bin/sh

if [ -d "util-model/" ];then
    rm -rf util-model
fi

yarn babel src -d util-model/src

mkdir -p util-model
cp *.* util-model

cd util-model
yarn pack
cd ..

mkdir -p ../lib/util-model
cp util-model/util-model*.tgz ../lib/util-model/
