#!/bin/bash

# Este script inicia el worker de la cola de Laravel en segundo plano.
echo "Iniciando Laravel Queue Worker..."

# Utiliza nohup y & para ejecutar el comando detached y en background.
# Redirige la salida a /dev/null para evitar que se cree un archivo nohup.out
nohup php artisan queue:work --tries=3 --delay=30 --timeout=90 > /dev/null 2>&1 &

echo "Worker iniciado. Usa 'ps aux | grep queue:work' para verificar y 'kill [PID]' para detener."

sleep 1
