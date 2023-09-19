#!/usr/bin/env bash

echo '[=] Running patch for prisma adapter'

sed -i "s/linkAccount: (data) => p.account.create({ data }),/linkAccount: (data) => {delete data['not-before-policy'];p.account.create({ data })},/" ./node_modules/@auth/prisma-adapter/index.js

echo '[+] Finished patching prisma adapter'
