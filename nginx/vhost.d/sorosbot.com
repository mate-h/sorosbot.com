location /signin {
  proxy_pass http://sorosbot.com-upstream;
}
location /_app {
  proxy_pass http://sorosbot.com-upstream;
}
location /SFSymbols-Medium.woff2 {
  proxy_pass http://sorosbot.com-upstream;
}
location /Inter.var.woff2 {
  proxy_pass http://sorosbot.com-upstream;
}
location /favicon.png {
  proxy_pass http://sorosbot.com-upstream;
}

location ^~ /.well-known/acme-challenge/ {
  auth_request off;
}

location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=https://sorosbot.com$request_uri redirect;
}

location = /auth {
  internal;
  proxy_pass https://api.sorosbot.com-upstream;
}