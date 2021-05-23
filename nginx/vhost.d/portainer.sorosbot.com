error_page 401 = @error401;
location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=https://portainer.sorosbot.com$request_uri redirect;
}

location ^~ /.well-known/acme-challenge/ {
  auth_request off;
}

location = /auth {
  internal;
  proxy_pass https://api.sorosbot.com-upstream;
}
