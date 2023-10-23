```bash
sudo vim /etc/hosts

127.0.0.1    vue-nest.com
```
```bash
brew install mkcert
mkcert vue-nest.com
```

```bash
// nginx.conf
server {
  listen    443 ssl;

  server_name vue-nest.com; # 设置域名，将请求映射到此配置

  # 以自己的实际文件路径为准
  ssl_certificate      /opt/homebrew/etc/nginx/certs/vue-next.com.pem;
  ssl_certificate_key  /opt/homebrew/etc/nginx/certs/vue-next.com-key.pem;

  ssl_session_cache    shared:SSL:1m;
  ssl_session_timeout  5m;

  ssl_ciphers  HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers  on;

  # 匹配任何以 静态资源，匹配成功则停止往下搜索正则
  location ^~ /public/ {
    root /Applications/code/word/my/vue-nest/packages/server;  # 静态资源目录的绝对路径
  }
  location ^~ /api/ {
    proxy_pass http://localhost:8081;
  }
  location / {
    proxy_pass http://localhost:8081/static/$request_uri;
  }
}

```