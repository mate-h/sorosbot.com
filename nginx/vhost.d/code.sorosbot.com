error_page 401 = @error401;
location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=https://code.sorosbot.com$request_uri redirect;
}

auth_request /auth;
location = /auth {
  internal;
  proxy_pass https://api.sorosbot.com-upstream;
}
