# 1단계: React 앱 빌드
FROM node:18-alpine AS builder
WORKDIR /app

# 패키지 설치
COPY ./client/package*.json ./
RUN npm install

# 소스 복사 및 빌드
COPY ./client .
RUN npm run build

# 2단계: Nginx에서 정적 파일 서빙
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
