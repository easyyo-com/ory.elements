#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 로그 함수들
const log = {
    info: (msg) => console.log('\x1b[34m[INFO]\x1b[0m', msg),
    success: (msg) => console.log('\x1b[32m[SUCCESS]\x1b[0m', msg),
    error: (msg) => console.log('\x1b[31m[ERROR]\x1b[0m', msg)
};

// 사용법 출력
function usage() {
    console.log('사용법: node sync-package-json.js <source-path> <target-path>');
    console.log('예시: node sync-package-json.js ../packages/elements-react/package.json ../publish/elements-react/package.json');
    process.exit(1);
}

// 매개변수 검증 (최소 2개의 경로 매개변수 필요, 옵션은 추가 가능)
if (process.argv.length < 4) {
    usage();
}

const sourcePath = path.resolve(process.argv[2]);
const targetPath = path.resolve(process.argv[3]);

// 파일 존재 확인
if (!fs.existsSync(sourcePath)) {
    log.error(`원본 package.json 파일을 찾을 수 없습니다: ${sourcePath}`);
    process.exit(1);
}

if (!fs.existsSync(targetPath)) {
    log.error(`대상 package.json 파일을 찾을 수 없습니다: ${targetPath}`);
    process.exit(1);
}

// 제외할 필드 목록
const excludedFields = new Set(['name', 'version', 'author', 'repository', 'bugs', 'homepage', 'devDependencies', 'scripts', 'publishConfig']);

log.info(`package.json 동기화 시작`);
log.info(`원본: ${sourcePath}`);
log.info(`대상: ${targetPath}`);

try {
    // JSON 파일 읽기
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    const targetContent = fs.readFileSync(targetPath, 'utf8');
    
    const sourceData = JSON.parse(sourceContent);
    const targetData = JSON.parse(targetContent);
    
    // 새로운 패키지 데이터 생성 (대상 키 순서 보존)
    const newPackageData = {};
    
    // 1. 대상의 키 순서대로 순회하면서 처리
    for (const [key, value] of Object.entries(targetData)) {
        if (excludedFields.has(key)) {
            // 제외 필드는 대상 값을 그대로 유지
            newPackageData[key] = value;
        } else if (key in sourceData) {
            // 제외 필드가 아니고 원본에 있으면 원본 값 사용
            newPackageData[key] = sourceData[key];
        } else {
            // 제외 필드가 아니지만 원본에 없으면 대상 값 유지
            newPackageData[key] = value;
        }
    }
    
    // 2. 원본에만 있는 비제외 필드들 추가 (대상에 없는 경우)
    for (const [key, value] of Object.entries(sourceData)) {
        if (!excludedFields.has(key) && !(key in newPackageData)) {
            newPackageData[key] = value;
        }
    }
    
    // JSON 문자열로 변환 (2칸 들여쓰기)
    const newContent = JSON.stringify(newPackageData, null, 2) + '\n';
    
    // 변경사항 확인
    if (targetContent === newContent) {
        log.info('변경사항이 없습니다.');
        return;
    }
    
    log.info('변경사항이 감지되었습니다. 파일을 업데이트합니다.');
    
    // 파일 업데이트
    fs.writeFileSync(targetPath, newContent);
    log.success('package.json 동기화 완료');
    
    // 동기화된 필드 개수 출력
    const syncedFields = Object.keys(newPackageData).filter(key => !excludedFields.has(key));
    log.info(`동기화된 필드: ${syncedFields.length}개`);
    
} catch (error) {
    log.error(`처리 중 오류 발생: ${error.message}`);
    process.exit(1);
}

process.exit(0);
