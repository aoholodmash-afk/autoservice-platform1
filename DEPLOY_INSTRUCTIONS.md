# ============================================
# Пошаговая установка AutoService на VPS
# Сервер: 80.78.241.124 | Домен: v3x3.ru
# ============================================

## Шаг 1: Подключиться к VPS
```bash
ssh root@80.78.241.124
```

## Шаг 2: Установить PocketBase
```bash
mkdir -p /opt/pocketbase && cd /opt/pocketbase
wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip
apt install -y unzip
unzip pocketbase_0.22.0_linux_amd64.zip
chmod +x pocketbase
rm pocketbase_0.22.0_linux_amd64.zip
```

## Шаг 3: Запустить PocketBase как сервис
```bash
cat > /etc/systemd/system/pocketbase.service << 'EOF'
[Unit]
Description=PocketBase
After=network.target
[Service]
Type=simple
User=root
WorkingDirectory=/opt/pocketbase
ExecStart=/opt/pocketbase/pocketbase serve --http=0.0.0.0:8090 --dir=/opt/pocketbase/pb_data
Restart=always
RestartSec=5
[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable pocketbase
systemctl start pocketbase
```

## Шаг 4: Клонировать проект
```bash
mkdir -p /opt/autoservice && cd /opt/autoservice
git clone https://github.com/aoholodmash-afk/autoservice-platform1.git .
npm install
```

## Шаг 5: Настроить окружение
```bash
echo "NEXT_PUBLIC_PB_URL=https://api.v3x3.ru" > .env.local
```

## Шаг 6: Собрать Next.js
```bash
npm run build
```

## Шаг 7: Запустить Next.js как сервис
```bash
cat > /etc/systemd/system/autoservice.service << 'EOF'
[Unit]
Description=AutoService Next.js
After=network.target pocketbase.service
[Service]
Type=simple
User=root
WorkingDirectory=/opt/autoservice
ExecStart=/usr/bin/npm start -- -p 3000
Restart=always
RestartSec=5
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable autoservice
systemctl start autoservice
```

## Шаг 8: Настроить nginx
```bash
apt install -y nginx

cat > /etc/nginx/sites-available/v3x3.ru << 'EOF'
server {
    listen 80;
    server_name api.v3x3.ru;
    location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name v3x3.ru www.v3x3.ru;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -sf /etc/nginx/sites-available/v3x3.ru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## Шаг 9: Настроить DNS
В панели регистратора домена v3x3.ru:
- A запись: v3x3.ru → 80.78.241.124
- A запись: api.v3x3.ru → 80.78.241.124
- A запись: www.v3x3.ru → 80.78.241.124

## Шаг 10: Настроить SSL
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d v3x3.ru -d www.v3x3.ru -d api.v3x3.ru
```

## Шаг 11: Настроить PocketBase
1. Открыть http://api.v3x3.ru/_/
2. Создать админа PocketBase
3. Создать коллекции (из файла pocketbase-collections.js)

## Шаг 12: Проверить
- http://v3x3.ru — главная страница
- http://api.v3x3.ru — PocketBase API
- http://v3x3.ru/super/register — регистрация Super Admin
