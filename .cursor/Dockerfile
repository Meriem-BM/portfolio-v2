# Use Node.js LTS as base image
FROM node:20-bullseye

# Install system dependencies and development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -s /bin/bash ubuntu && \
    echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Set user and working directory
USER ubuntu
WORKDIR /home/ubuntu

# Install global Node.js development tools
RUN npm install -g yarn typescript @types/node

# Set up git (will be configured by the agent)
RUN git config --global init.defaultBranch main
