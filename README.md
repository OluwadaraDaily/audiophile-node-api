# Audiophile API

This is an API built for the [Audiophile UI](https://github.com/OluwadaraDaily/audiophile-ui). It is written in Express.

More details to come

## Running with Docker

### Build image of Node API

  `docker build -t image-name .`

### Create network

  A network is the means by which two separate containers can communicate with one another.

  `docker network create network-name`

### Start MySQL container

  ```bash

    docker pull mysql
  
    docker run \
    --rm \
    -d \
    --name sql-container-name \
    -e MYSQL_DATABASE=audiophile \
    -e MYSQL_ROOT_PASSWORD=apipassword \
    --network network-name \
    -v mysql_data:/var/lib/mysql \
    -p 3306:3306
    mysql:latest

  ```

### Start Node API

  ```bash
    
    docker run \
    --rm \
    --name node-container-name \
    --network network-name \
    -p 8000:3000 \
    -v .:/app \
    -v /app/node_modules \
    image-name

  ```

### Stop running containers

- `docker stop node-container-name`
- `docker stop sql-container-name`

### Using Docker Compose

#### Start the containers

- `docker-compose up`

#### Stop the containers

- `docker-compose down`
