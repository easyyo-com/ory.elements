#!/bin/bash

set -euo pipefail

# 스크립트 디렉토리
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLISH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$PUBLISH_DIR/.." && pwd)"

# 로그 함수 로드
source "$SCRIPT_DIR/log.sh"

# 사용법 출력
usage() {
    echo "사용법: $0 <package-name>"
    echo "예시: $0 elements-react"
    echo "      $0 nextjs"
    exit 1
}

# 매개변수 검증
if [ $# -ne 1 ]; then
    usage
fi

PACKAGE_NAME="$1"
SOURCE_PACKAGE_JSON="$ROOT_DIR/packages/$PACKAGE_NAME/package.json"
TARGET_PACKAGE_JSON="$PUBLISH_DIR/$PACKAGE_NAME/package.json"

# Node.js 스크립트 실행
node "$SCRIPT_DIR/sync-package-json.js" "$SOURCE_PACKAGE_JSON" "$TARGET_PACKAGE_JSON"
