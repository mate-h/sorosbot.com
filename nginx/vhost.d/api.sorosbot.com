error_page 401 = @error401;
location @error401 {
  rewrite ^.*$ https://sorosbot.com/signin?next=https://api.sorosbot.com$request_uri redirect;
}
