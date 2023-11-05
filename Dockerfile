# Seleccionar la imagen base
FROM node:18

# Crear y Establecer el directorio de trabajo
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Copiar los archivos de la aplicación web al contenedor
COPY package.json ./
COPY package-lock.json ./
# Instalar las dependencias de la aplicación
RUN npm install
COPY . .
# Exponer el puerto en el que la aplicación web se ejecutará
EXPOSE 3000

# Iniciar la aplicación web
CMD ["npm", "start"]
