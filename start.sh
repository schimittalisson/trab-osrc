#!/bin/bash

# OpenID Connect Authentication - Startup Script for Linux/Mac
# This script installs dependencies and starts the development server

echo "=================================="
echo "OpenID Connect Authentication App"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local file not found!"
    echo ""
    echo "Please create .env.local file with your Firebase credentials:"
    echo "  cp .env.local.example .env.local"
    echo "  # Then edit .env.local with your Firebase config"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Failed to install dependencies!"
        echo "Please check the error messages above."
        exit 1
    fi
    
    echo ""
    echo "✓ Dependencies installed successfully!"
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "=================================="
echo "Starting development server..."
echo "=================================="
echo ""
echo "The application will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
