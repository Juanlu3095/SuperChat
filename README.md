# SuperChat

SuperChat es una aplicación web que contiene un workspace de Angular 19 y una API de Express con la que gestionar un servicio de chats en tiempo real.

## Instalación

Primero instala pnpm en tu sistema globalmente:

```bash
npm install -g pnpm@latest-10
```

Instala las dependencias:

```bash
pnpm install
```

Crea una conexión en MongoDB, crea el archivo .env con la configuración de .env.example y rellena los datos.
A continuación podemos crear la base de datos:

```bash
pnpm run db:migrate
```

Creamos algunos datos en la base de datos:

```bash
pnpm run db:seed
```

## Ejecución de las aplicaciones

Podemos ejecutar el frontend de Angular con

```bash
ng serve
```

o

```bash
pnpm run frontend
```

Para el backend de Express:

```bash
pnpm run backend
```

o para desarrollo:

```bash
pnpm run backend:dev
```

Incluso se pueden ejecutar ambos a la vez con concurrently:

```bash
pnpm run iniciar
```