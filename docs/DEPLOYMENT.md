
---

### **Файл 4: `DEPLOYMENT.md`**

```markdown
# Деплой проекта

## Сервер
| Параметр | Значение |
|----------|----------|
| IP-адрес | 91.135.157.42 |
| ОС | Ubuntu 24.04 LTS |
| Провайдер | Timeweb |

## Установленное ПО
- Node.js 20.20.2
- npm 10.8.2
- Nginx 1.24.0
- PM2 5.4.3
- Git

## Шаги деплоя

### 1. Клонирование репозитория
```bash
git clone https://github.com/Mateush2131/my-portfolio.git /var/www/my-portfolio
cd /var/www/my-portfolio

npm install
npm run build


cp .env.example .env.local
nano .env.local


npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup


server {
    listen 80;
    server_name 91.135.157.42;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}

Деплой

Сервер: 91.135.157.42
ОС: Ubuntu 24.04
Процесс: PM2
URL: http://91.135.157.42
Админ-панель

URL: /admin
Логин: admin
Пароль: secret
Контакты

GitHub: https://github.com/Mateush2131
Telegram: @Alakir_22