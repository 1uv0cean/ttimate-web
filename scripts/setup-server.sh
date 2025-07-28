#!/bin/bash

# 띠메이트 서버 초기 설정 스크립트
# Ubuntu 20.04+ 기준

set -e

echo "🚀 띠메이트 서버 설정을 시작합니다..."

# 시스템 업데이트
echo "📦 시스템 패키지 업데이트..."
sudo apt update && sudo apt upgrade -y

# 필수 패키지 설치
echo "📦 필수 패키지 설치..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Node.js 설치 (NVM 사용)
echo "📦 Node.js 설치..."
if [ ! -d "$HOME/.nvm" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
    nvm alias default 20
fi

# pnpm 설치
echo "📦 pnpm 설치..."
corepack enable
corepack prepare pnpm@9 --activate

# PM2 설치
echo "📦 PM2 설치..."
npm install -g pm2

# PM2 시작 스크립트 설정
pm2 startup
echo "⚠️ 위 명령어가 출력한 스크립트를 실행하세요!"

# Nginx 설치
echo "📦 Nginx 설치..."
sudo apt install -y nginx

# Nginx 서비스 시작 및 활성화
sudo systemctl start nginx
sudo systemctl enable nginx

# 방화벽 설정
echo "🔒 방화벽 설정..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 애플리케이션 디렉토리 생성
echo "📁 애플리케이션 디렉토리 생성..."
sudo mkdir -p /var/www/ttimate
sudo chown -R $USER:$USER /var/www/ttimate

# Nginx 설정 파일 복사 (수동으로 해야 함)
echo "📝 Nginx 설정:"
echo "1. nginx.conf 파일을 /etc/nginx/sites-available/ttimate 에 복사"
echo "2. sudo ln -s /etc/nginx/sites-available/ttimate /etc/nginx/sites-enabled/"
echo "3. sudo nginx -t && sudo systemctl reload nginx"

# SSL 인증서 설치 (Certbot)
echo "🔒 SSL 인증서 설치 준비..."
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot

echo "📝 SSL 인증서 발급 명령어:"
echo "sudo certbot --nginx -d ttimate.com -d www.ttimate.com"

# Git 설정 (배포용)
echo "📝 Git 설정:"
echo "git config --global user.name 'Your Name'"
echo "git config --global user.email 'your.email@example.com'"

# GitHub Actions Secrets 안내
echo ""
echo "🔑 GitHub Secrets에 다음 값들을 설정하세요:"
echo "SSH_PRIVATE_KEY: $(cat ~/.ssh/id_rsa 2>/dev/null || echo 'SSH 키를 생성하세요: ssh-keygen -t rsa -b 4096')"
echo "EC2_HOST: $(curl -s http://checkip.amazonaws.com/ || echo '서버 IP 주소')"
echo "EC2_USER: $USER"
echo "NEXT_PUBLIC_SITE_URL: https://ttimate.com"
echo "NEXT_PUBLIC_KAKAO_KEY: 카카오 JavaScript 키"
echo "NEXT_PUBLIC_GOOGLE_ADSENSE_ID: Google AdSense ID"
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID: Google Analytics ID"

echo ""
echo "✅ 기본 서버 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "1. SSH 키를 GitHub에 등록"
echo "2. Nginx 설정 파일 적용"
echo "3. SSL 인증서 발급"
echo "4. GitHub Secrets 설정"
echo "5. 도메인 DNS 설정"
echo ""
echo "🚀 이제 GitHub Actions로 배포할 준비가 되었습니다!"