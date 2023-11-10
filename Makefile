CONTAINER_NAME=web

up:
	@echo "Starting container..."
	@docker-compose up ${CONTAINER_NAME}

up-silent:
	@echo "Starting container..."
	@docker-compose up -d ${CONTAINER_NAME}

down:
	@echo "Stopping container..."
	@docker-compose down

build:
	@echo "Building container..."
	@docker-compose build
