SHELL=/bin/bash -o pipefail

# 프로젝트 루트 디렉토리
ROOT_DIR := $(shell cd .. && pwd)


.PHONY: help install clean
.PHONY: build-elements-react build-nextjs build-all
.PHONY: publish-elements-react publish-nextjs publish-all
.PHONY: sync-package-elements-react sync-package-nextjs sync-all-packages

# 기본 타겟
help:
	@./utils/log.sh log_info "Ory Elements 빌드 및 퍼블리시 Makefile"
	@echo ""
	@echo -e "\033[1;33m사용법:\033[0m"
	@echo "  make help                     - 이 도움말 표시"
	@echo "  make install                  - 의존성 설치"
	@echo ""
	@echo -e "\033[1;33m빌드:\033[0m"
	@echo "  make build-elements-react     - elements-react 패키지 빌드"
	@echo "  make build-nextjs             - nextjs 패키지 빌드"
	@echo "  make build-all                - 모든 패키지 빌드"
	@echo ""
	@echo -e "\033[1;33m동기화:\033[0m"
	@echo "  make sync-package-elements-react  - elements-react package.json 동기화"
	@echo "  make sync-package-nextjs          - nextjs package.json 동기화"  
	@echo "  make sync-all-packages            - 모든 package.json 동기화"
	@echo ""
	@echo -e "\033[1;33m퍼블리시:\033[0m"
	@echo "  make publish-elements-react   - elements-react 패키지 퍼블리시 (빌드 포함)"
	@echo "  make publish-nextjs           - nextjs 패키지 퍼블리시 (빌드 포함)"
	@echo "  make publish-all              - 모든 패키지 퍼블리시 (빌드 포함)"
	@echo ""
	@echo -e "\033[1;33m유틸리티:\033[0m"
	@echo "  make clean                    - 빌드 결과물 정리"

# 의존성 설치
install:
	@./utils/log.sh log_info "의존성 설치 중..."
	@cd $(ROOT_DIR) && npm install
	@./utils/log.sh log_success "의존성 설치 완료"

# 정리
clean:
	@./utils/log.sh log_info "빌드 결과물 정리 중..."
	@rm -rf elements-react/dist nextjs/dist
	@./utils/log.sh log_success "정리 완료"

# elements-react 빌드
build-elements-react: install sync-package-elements-react
	@./utils/log.sh log_build "elements-react 패키지 빌드 시작..."
	@cd $(ROOT_DIR) && npx nx build @ory/elements-react
	@./utils/log.sh log_info "elements-react 빌드 파일 복사 중..."
	@if [ -d "$(ROOT_DIR)/packages/elements-react/dist" ]; then \
		rm -rf elements-react/dist; \
		cp -r $(ROOT_DIR)/packages/elements-react/dist elements-react/; \
		./utils/log.sh log_success "elements-react 빌드 파일 복사 완료"; \
	else \
		./utils/log.sh log_error "elements-react 빌드 파일을 찾을 수 없습니다: $(ROOT_DIR)/packages/elements-react/dist"; \
		exit 1; \
	fi
	@./utils/log.sh log_info "메타데이터 파일 복사 중..."
	@if [ -f "$(ROOT_DIR)/LICENSE" ]; then \
		cp $(ROOT_DIR)/LICENSE elements-react/; \
		./utils/log.sh log_success "LICENSE 파일 복사 완료: elements-react"; \
	else \
		./utils/log.sh log_warning "LICENSE 파일을 찾을 수 없습니다"; \
	fi
	@if [ -f "$(ROOT_DIR)/packages/elements-react/README.md" ]; then \
		cp $(ROOT_DIR)/packages/elements-react/README.md elements-react/; \
		./utils/log.sh log_success "README 파일 복사 완료: $(ROOT_DIR)/packages/elements-react/README.md -> elements-react"; \
	else \
		./utils/log.sh log_info "README 파일이 없습니다: $(ROOT_DIR)/packages/elements-react/README.md"; \
	fi
	@./utils/log.sh log_success "elements-react 패키지 빌드 완료"

# nextjs 빌드  
build-nextjs: install sync-package-nextjs
	@./utils/log.sh log_build "nextjs 패키지 빌드 시작..."
	@cd $(ROOT_DIR) && npx nx build @ory/nextjs
	@./utils/log.sh log_info "nextjs 빌드 파일 복사 중..."
	@if [ -d "$(ROOT_DIR)/packages/nextjs/dist" ]; then \
		rm -rf nextjs/dist; \
		cp -r $(ROOT_DIR)/packages/nextjs/dist nextjs/; \
		./utils/log.sh log_success "nextjs 빌드 파일 복사 완료"; \
	else \
		./utils/log.sh log_error "nextjs 빌드 파일을 찾을 수 없습니다: $(ROOT_DIR)/packages/nextjs/dist"; \
		exit 1; \
	fi
	@./utils/log.sh log_info "메타데이터 파일 복사 중..."
	@if [ -f "$(ROOT_DIR)/LICENSE" ]; then \
		cp $(ROOT_DIR)/LICENSE nextjs/; \
		./utils/log.sh log_success "LICENSE 파일 복사 완료: nextjs"; \
	else \
		./utils/log.sh log_warning "LICENSE 파일을 찾을 수 없습니다"; \
	fi
	@if [ -f "$(ROOT_DIR)/packages/nextjs/README.md" ]; then \
		cp $(ROOT_DIR)/packages/nextjs/README.md nextjs/; \
		./utils/log.sh log_success "README 파일 복사 완료: $(ROOT_DIR)/packages/nextjs/README.md -> nextjs"; \
	else \
		./utils/log.sh log_info "README 파일이 없습니다: $(ROOT_DIR)/packages/nextjs/README.md"; \
	fi
	@./utils/log.sh log_success "nextjs 패키지 빌드 완료"

# 빌드 타겟들
build-all: build-elements-react build-nextjs
	@./utils/log.sh log_success "모든 패키지 빌드가 완료되었습니다!"
	@./utils/log.sh log_info "빌드된 패키지들:"
	@./utils/log.sh log_info "  - elements-react: publish/elements-react/"
	@./utils/log.sh log_info "  - nextjs: publish/nextjs/"

# 퍼블리시 타겟들
publish-elements-react: build-elements-react
	@./utils/log.sh log_publish "elements-react 패키지 퍼블리시 시작"
	@./utils/log.sh log_info "========================================"
	@if [ ! -d "elements-react/dist" ]; then \
		./utils/log.sh log_error "빌드 파일이 없습니다. 먼저 make build-elements-react를 실행해주세요"; \
		exit 1; \
	fi
	@./utils/log.sh log_publish "elements-react 패키지 발행 중..."
	@cd elements-react && npm publish --tag latest
	@./utils/log.sh log_success "========================================"
	@./utils/log.sh log_success "elements-react 패키지 퍼블리시가 완료되었습니다!"
	@./utils/log.sh log_info "발행된 패키지:"
	@./utils/log.sh log_info "  - @easyyo/ory.elements-react"

publish-nextjs: build-nextjs
	@./utils/log.sh log_publish "nextjs 패키지 퍼블리시 시작"
	@./utils/log.sh log_info "========================================="
	@if [ ! -d "nextjs/dist" ]; then \
		./utils/log.sh log_error "빌드 파일이 없습니다. 먼저 make build-nextjs를 실행해주세요"; \
		exit 1; \
	fi
	@./utils/log.sh log_publish "nextjs 패키지 발행 중..."
	@cd nextjs && npm publish --tag latest
	@./utils/log.sh log_success "========================================="
	@./utils/log.sh log_success "nextjs 패키지 퍼블리시가 완료되었습니다!"
	@./utils/log.sh log_info "발행된 패키지:"
	@./utils/log.sh log_info "  - @easyyo/ory.nextjs"

publish-all: build-all
	@./utils/log.sh log_publish "모든 패키지 퍼블리시 시작"
	@./utils/log.sh log_info "========================================"
	@if [ ! -d "elements-react/dist" ] || [ ! -d "nextjs/dist" ]; then \
		./utils/log.sh log_error "일부 빌드 파일이 없습니다. 먼저 make build-all을 실행해주세요"; \
		exit 1; \
	fi
	@./utils/log.sh log_info "1/2: elements-react 패키지 퍼블리시 중..."
	@cd elements-react && npm publish --tag latest
	@./utils/log.sh log_info "2/2: nextjs 패키지 퍼블리시 중..."
	@cd nextjs && npm publish --tag latest
	@./utils/log.sh log_success "========================================"
	@./utils/log.sh log_success "모든 패키지 퍼블리시가 완료되었습니다!"
	@./utils/log.sh log_info "발행된 패키지들:"
	@./utils/log.sh log_info "  - @easyyo/ory.elements-react"
	@./utils/log.sh log_info "  - @easyyo/ory.nextjs"

# package.json 동기화 타겟들
sync-package-elements-react:
	@./utils/log.sh log_info "elements-react package.json 동기화 중..."
	@./utils/sync-package.sh elements-react

sync-package-nextjs:
	@./utils/log.sh log_info "nextjs package.json 동기화 중..."
	@./utils/sync-package.sh nextjs

sync-all-packages:
	@./utils/log.sh log_info "모든 package.json 동기화 시작"
	@./utils/log.sh log_info "========================================"
	@$(MAKE) sync-package-elements-react
	@$(MAKE) sync-package-nextjs
	@./utils/log.sh log_info "========================================"
	@./utils/log.sh log_success "모든 package.json 동기화가 완료되었습니다!"
