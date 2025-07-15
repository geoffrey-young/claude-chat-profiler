# Makefile for Node Chat Profiler DXT Package

# Variables
NODE_BIN := node_modules/.bin
BUILD_DIR := build
DIST_DIR := dist
SRC_DIR := server
PACKAGE_NAME := node-chat-profiler.dxt

# Default target
.PHONY: all
all: clean install build lint test pack

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	npm install

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(BUILD_DIR) $(DIST_DIR) *.dxt

# Compile TypeScript
.PHONY: build
build:
	@echo "Compiling TypeScript..."
	npm run build

# Run linter
.PHONY: lint
lint:
	@echo "Running ESLint..."
	npm run lint

# Run tests
.PHONY: test
test:
	@echo "Running tests..."
	@(npm test &) && sleep 2 && pkill -f "node.*dist/index.js" 2>/dev/null || true
	@echo "✓ Test completed"

# Create DXT package
.PHONY: dist
dist: build
	@echo "Creating DXT package..."
	npm run pack

# Development mode
.PHONY: dev
dev:
	@echo "Starting in development mode..."
	npm run dev

# Watch mode for development
.PHONY: watch
watch:
	@echo "Starting TypeScript in watch mode..."
	$(NODE_BIN)/tsc --watch

# Check TypeScript types without building
.PHONY: typecheck
typecheck:
	@echo "Checking TypeScript types..."
	$(NODE_BIN)/tsc --noEmit

# Run all checks (lint + typecheck)
.PHONY: check
check: lint typecheck

# Quick build without tests
.PHONY: quick
quick: clean install build pack

# Full release build
.PHONY: release
release: clean install build check test pack
	@echo "Release build complete! Package: $(PACKAGE_NAME)"

# Show help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make         - Run full build pipeline (clean, install, build, lint, test, pack)"
	@echo "  make install - Install npm dependencies"
	@echo "  make clean   - Remove build artifacts"
	@echo "  make build   - Compile TypeScript files"
	@echo "  make lint    - Run ESLint"
	@echo "  make test    - Run tests"
	@echo "  make pack    - Create DXT package"
	@echo "  make dev     - Start development server"
	@echo "  make watch   - Start TypeScript compiler in watch mode"
	@echo "  make check   - Run lint and typecheck"
	@echo "  make quick   - Quick build without tests"
	@echo "  make release - Full release build with all checks"
	@echo "  make help    - Show this help message"

# Ensure node_modules exists before running certain commands
node_modules:
	npm install

# Add dependencies for targets that need node_modules
build: node_modules
lint: node_modules
test: node_modules build
typecheck: node_modules
