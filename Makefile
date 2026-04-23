IMAGE     := ishakantony/ai-banking-app
PLATFORMS := linux/amd64,linux/arm64

.PHONY: publish publish-local setup-builder

# Setup multi-platform builder (run once)
setup-builder:
	docker buildx create --name multiplatform --driver docker-container --use 2>/dev/null || docker buildx use multiplatform
	docker buildx inspect --bootstrap

publish:
	docker buildx build \
		--platform $(PLATFORMS) \
		--target runner \
		-t $(IMAGE):latest \
		--push \
		.

# Local single-platform build (loads into local docker)
publish-local:
	docker buildx build \
		--target runner \
		-t $(IMAGE):latest \
		--load \
		.
