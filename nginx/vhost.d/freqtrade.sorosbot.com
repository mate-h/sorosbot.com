error_page 401 = @error401;
location @error401 {
  return 302 https://sorosbot.com/signin;
}

auth_request /auth;
location = /auth {
  internal;
  proxy_pass http://api.sorosbot.com-upstream;
}