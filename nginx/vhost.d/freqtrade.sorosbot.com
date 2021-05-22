error_page 401 = @error401;
location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=$1 redirect;
}

auth_request /auth;
location = /auth {
  internal;
  proxy_pass https://api.sorosbot.com-upstream;
}
