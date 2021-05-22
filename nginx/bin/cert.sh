#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"
# Become a Certificate Authority

# Generate private key
# openssl genrsa -des3 -out myCA.key 2048
# Generate root certificate
# openssl req -x509 -new -nodes -key myCA.key -sha256 -days 825 -out myCA.pem

# Create CA-signed certs

# Domain name
NAME=localhost.dev 

# Variables
CERT_PATH=../certs
CERT_KEY=$CERT_PATH/$NAME.key
CERT_CSR=$CERT_PATH/$NAME.csr
CERT_CRT=$CERT_PATH/$NAME.crt
CERT_EXT=$CERT_PATH/$NAME.ext
ROOT_PEM=$CERT_PATH/$NAME.pem
ROOT_KEY=$CERT_PATH/$NAME.key

# Generate a private key
openssl genrsa -out $CERT_KEY 2048

# Create a certificate-signing request
openssl req -new -key $CERT_KEY -out $CERT_CSR

# Create a config file for the extensions
>$CERT_EXT cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $NAME # Include the domain name here because Common Name is not so commonly honoured by itself
DNS.2 = api.$NAME # Optional: add domains or subdomains
DNS.3 = freqtrade.$NAME
DNS.4 = code.$NAME
IP.1 = 192.168.86.175 # Add an IP address if the connection requires it
EOF

# Create the signed certificate
openssl x509 -req -in $CERT_CSR -CA ../certs/root.pem -CAkey ../certs/root.key -CAcreateserial \
-out $CERT_CRT -days 825 -sha256 -extfile $CERT_EXT