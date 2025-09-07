#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# 로그 함수들
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_build() {
    echo -e "${PURPLE}[BUILD]${NC} $1"
}

log_publish() {
    echo -e "${CYAN}[PUBLISH]${NC} $1"
}

# 첫 번째 인자는 함수명, 두 번째 인자는 메시지
# source로 호출된 경우가 아닐 때만 CLI 로직 실행
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    if [ "$#" -ge 2 ]; then
        "$1" "$2"
    elif [ "$#" -eq 1 ]; then
        "$1"
    else
        echo "Usage: $0 <function_name> [message]"
        exit 1
    fi
fi