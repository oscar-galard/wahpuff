# Stage 1: Build Laravel assets
FROM debian AS builder

# Instalar Node.js y herramientas de build
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    nodejs \
    npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Directorio de trabajo
WORKDIR /var/www

# Copiar todo el código Laravel
COPY . /var/www

# Instalar dependencias Node.js y construir assets
RUN npm install && npm run build

# Stage 2: Imagen de producción Nginx
FROM nginx:alpine

# Crear carpeta para certificados y well-known
RUN mkdir -p /etc/letsencrypt /var/www/public/.well-known/acme-challenge

# Copiar configuración personalizada de Nginx
COPY ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf

# Copiar assets públicos de Laravel desde el builder
COPY --from=builder /var/www/public /var/www/public

# Directorio de trabajo
WORKDIR /var/www/public

# Exponer puertos HTTP y HTTPS
EXPOSE 80 443

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
