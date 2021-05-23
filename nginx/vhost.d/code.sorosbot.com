error_page 401 = @error401;
location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=https://code.sorosbot.com$request_uri redirect;
}

location = /auth {
  internal;
  proxy_pass https://api.sorosbot.com-upstream;
}
