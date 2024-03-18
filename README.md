# Docker 🐳

## 1. What is Docker?
Docker is a platform used for containerization, allowing developers to package applications and their dependencies into a standardized unit called a container. These containers can be easily deployed and run consistently across different environments.

## 2. Problem Statement and Why Docker is Used
Traditional deployment methods often face issues related to environment inconsistencies, dependencies, and scalability. Docker solves these problems by providing a lightweight, portable, and self-sufficient containerization solution.

## 3. Docker Components: Images and Containers
- **Images**: Docker images are the blueprints used to create containers. They contain everything needed to run an application, including code, runtime, libraries, and dependencies.
- **Containers**: Containers are instances of Docker images that are running as processes. They isolate the application and its dependencies from the host system, ensuring consistency and portability.

## 4. Command Line Explanations

### Listing Docker Images
```bash
  docker images
```
This command lists all the Docker images available on your system. It provides information about the repository, tag, image ID, creation time, and size.

### Listing Docker Containers
```bash
  docker container ls
```
This command lists all the running Docker containers. It displays information such as container ID, image used, command running in the container, creation time, status, and ports exposed.

### Listing All Docker Containers
```bash
  docker container ls -a
```
This command lists all Docker containers, including those that are stopped or exited. It provides information similar to `docker container ls` but includes all containers.

### Pulling Docker Images from Registry 
```bash
docker pull <image_name>
```
This command pulls Docker images from a registry (e.g., Docker Hub) to your local machine. It downloads the specified image so that you can use it to create containers.

### Running a Docker Container Interactively 
```bash
  docker run -it <image_name>
```
This command runs a Docker container interactively, allowing you to interact with it via a terminal session. It starts a new container based on the specified image and opens an interactive shell within the container.

### Starting a Stopped Docker Container 
```bash
docker start <container_name>
```
This command starts a stopped Docker container. It resumes the container from its previous state, allowing it to run again.

### Stopping a Running Docker Container 
```bash
docker stop <container_name>
```
This command stops a running Docker container. It sends a signal to the container to stop its processes gracefully.

### Executing a Command in a Running Container 
```bash
docker exec -it <container_name> bash
```
This command executes a command within a running Docker container. It allows you to run arbitrary commands inside the container, such as opening a shell (`bash`) for interactive use.

## Port Mapping Example
Port mapping allows you to map ports on your host machine to ports within the Docker container. This is useful for exposing services running inside the container to the outside world.

Example:
```bash
docker run -it -p 8080:80 --name web_server nginx /bin/bash
```
In this example, port 8080 on the host machine is mapped to port 80 inside the Docker container running the NGINX web server.

## 5. Dockerizing a Node Application 💻

### Dockerfile Content

```bash
FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.js index.js

RUN npm install

ENTRYPOINT [ "node","index.js" ]
```
#### Explanation:
- **FROM ubuntu**: Sets the base image for the Dockerfile as Ubuntu.
- **RUN ... :** Installs necessary packages (e.g., curl, nodejs) and sets up Node.js environment.
- **COPY ... :** Copies application files (e.g., package.json, index.js) into the Docker image.
- **RUN npm install:** Installs Node.js dependencies.
- **ENTRYPOINT [ "node", "index.js" ]:** Specifies the command to run when the container starts.

### Building Docker Image 
```bash
docker build -t sample-nodejs
````
This command builds a Docker image based on the instructions in the Dockerfile. It tags the image with the name `sample-nodejs`.

### Running Docker Container 
```bash
docker run -it -p 8000:8000 --name container_name sample-nodejs /bin/bash
```
This command runs a Docker container based on the `sample-nodejs` image. It maps port `8000` on the host machine to port `8000` inside the container and gives the container the name `container_name`.

### Running Docker Container with Environment Variable
```bash
docker run -it -e PORT=4000 -p 4000:4000 sample-nodejs
```
This command runs a Docker container based on the sample-nodejs image, setting the PORT environment variable to `4000` and mapping port `4000` on the host machine to port `4000` inside the container.

## 6. Cache Layer in Docker
Docker uses a layered file system for images. Each instruction in a Dockerfile adds a new layer to the image. When an image is built, Docker caches intermediate layers to improve build performance. If a Dockerfile instruction doesn't change, Docker reuses the cached layer rather than rebuilding it. This is known as the cache layer.

## 7. Docker Compose
Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to use a YAML file to configure the services, networks, and volumes required for your application. Docker Compose simplifies the process of managing complex applications with multiple containers.

## Docker Compose Example

```yaml
version: "3.8"

services:
  postgres:
    image: postgres # hub.docker.com
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: review
      POSTGRES_PASSWORD: password

  redis:
    image: redis
    ports:
      - "6379:6379"
```
In this Docker Compose example:

- We define two services: postgres and redis.
- For postgres, we use the postgres image from Docker Hub. We expose port `5432` on the host machine and set environment variables for the PostgreSQL user, database, and password.
- For redis, we use the redis image and expose port `6379`.

### Docker Compose Commands
```bash
docker compose up
```
This command creates and starts all the services defined in the docker-compose.yml file. It also builds images if they don't exist and attaches to the container output, so you can see the logs.
```bash
docker compose down
```
This command stops and removes all containers defined in the docker-compose.yml file. It also removes any networks and volumes created by docker-compose up.

# Docker Networking 🌐

## Docker Network
Docker networking allows containers to communicate with each other and with other services outside of the container environment. Docker provides various network drivers for different use cases, such as bridge, host, overlay, and macvlan.

### Bridge Network
- The bridge network is the default network driver used by Docker.
- Each container connected to the bridge network has its own isolated network stack.
- Containers on the same bridge network can communicate with each other using container names.
- By default, containers on the bridge network can't communicate with the host machine or other bridge networks without port mapping.

### Host Network
- The host network mode removes network isolation between the container and the Docker host.
- Containers using the host network share the host's network namespace, including IP address and ports.
- In the host network mode, port mapping is not required because containers directly use host ports.

#### Difference between Bridge and Host Networks
- Bridge network provides isolation between containers and between containers and the host, while host network does not.
- In bridge network, port mapping is required to expose container ports to the host, whereas in host network, port mapping is not required as containers directly use host ports.

## Docker Network Commands

```bash
docker network inspect bridge
```
This command inspects the bridge network, displaying detailed information about the network configuration, connected containers, and network settings.

```bash
 docker network ls
 ```
This command lists all the Docker networks available on the Docker host, showing their names, IDs, and drivers.

## Creating Custom Network

### Example:
```bash
docker network create maheshnetwork
docker run -it --network=maheshnetwork --name tony_stark ubuntu
docker run -it --network=maheshnetwork --name dr_strange busybox
```
In this example:

- We create a custom network named `maheshnetwork` using the docker network create command.
- We run two containers `(tony_stark and dr_strange)` using the custom network by specifying `--network=mahesnetwork` option.
- Both containers are now connected to the `mahesnetwork` and can communicate with each other.


Feel free to adjust and expand the README file as needed for your project documentation!

