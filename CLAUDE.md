# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Ory Elements**는 Ory 네트워크와 통합된 React/Next.js 기반 인증 UI 컴포넌트 라이브러리입니다.

- **모노레포 구조**: Nx 워크스페이스로 구성
- **주요 패키지**:
  - `@ory/elements-react`: 핵심 React 컴포넌트 및 테마 시스템
  - `@ory/nextjs`: Next.js 통합 패키지 (App Router/Pages Router + 미들웨어)
- **발행 패키지** (@easyyo 조직):
  - `@easyyo/ory.elements-react`: 핵심 React 컴포넌트 라이브러리
  - `@easyyo/ory.nextjs`: Next.js 통합 패키지
- **예제 앱**: `examples/nextjs-app-router`, `examples/nextjs-pages-router`
- **발행 워크플로우**: `publish/` 디렉토리에서 NPM 패키지 발행 관리

## 개발 명령어

### 기본 명령어 (Makefile 기반)
```bash
make install          # 의존성 설치 (npm install)
make build           # 전체 빌드 + Storybook 정적 빌드
make test            # 전체 테스트 실행
make dev             # 모든 패키지 개발 모드
make format          # Ory 헤더 추가 + Prettier 포맷팅
```

### Nx 기반 개별 패키지 작업
```bash
# React 패키지 작업
nx build @ory/elements-react
nx test @ory/elements-react
nx run @ory/elements-react:storybook

# Next.js 패키지 작업
nx build @ory/nextjs
nx test @ory/nextjs
nx dev @ory/nextjs

# 전체 작업
nx run-many --target=build --all
nx run-many --target=test --all
nx run-many --target=lint --all
```

### 특수 명령어
```bash
make build-sdk       # Kratos SDK 재생성 (KRATOS_DIR 환경변수 필요)
make licenses        # 오픈소스 라이센스 확인
```

### NPM 패키지 발행 명령어 (publish/ 디렉토리)
```bash
# publish/ 디렉토리에서 실행
cd publish/

# 도움말 및 기본 설정
make help            # 발행 관련 명령어 도움말 보기
make install         # 의존성 설치

# 개별 패키지 빌드
make build-elements-react    # elements-react 패키지만 빌드
make build-nextjs           # nextjs 패키지만 빌드
make build-all              # 모든 패키지 빌드

# package.json 동기화
make sync-package-elements-react  # elements-react package.json 동기화
make sync-package-nextjs         # nextjs package.json 동기화
make sync-all-packages           # 모든 package.json 동기화

# NPM 발행 (빌드 자동 포함)
make publish-elements-react  # @easyyo/ory.elements-react 발행
make publish-nextjs         # @easyyo/ory.nextjs 발행
make publish-all            # 모든 패키지 발행

# 유틸리티
make clean              # 빌드 결과물 정리
```

## 기술 스택

- **언어**: TypeScript
- **UI 프레임워크**: React ≥18
- **스타일링**: Tailwind CSS + CSS 변수 기반 테마 시스템
- **UI 컴포넌트**: Radix UI
- **폼 관리**: React Hook Form
- **빌드 도구**: Nx, tsup
- **개발 도구**: Storybook, Jest, ESLint, Prettier
- **요구사항**: Node.js ≥22, `@ory/client-fetch`

## 아키텍처 구조

### packages/elements-react
```
src/
├── components/       # UI 컴포넌트
│   ├── card/        # 카드 컨테이너
│   ├── form/        # 폼 관련 컴포넌트
│   ├── settings/    # 설정 페이지 컴포넌트
│   └── generic/     # 공통 컴포넌트
├── context/         # React Context
├── theme/           # 테마 및 스타일
├── locales/         # 다국어 지원
├── client/          # Ory 클라이언트 통합
└── util/            # 유틸리티 함수
```

### packages/nextjs
```
src/
├── app/             # App Router 컴포넌트
├── pages/           # Pages Router 컴포넌트
├── middleware/      # Next.js 미들웨어
└── utils/           # Next.js 관련 유틸리티
```

### publish/ (NPM 패키지 발행)
```
publish/
├── README.md                    # 발행 가이드 문서
├── Makefile                     # 빌드 및 발행 자동화
├── utils/
│   ├── log.sh                  # 색상 로그 유틸리티
│   ├── sync-package-json.js    # package.json 동기화 스크립트
│   └── sync-package.sh         # 동기화 실행 쉘 스크립트
├── elements-react/
│   ├── package.json            # @easyyo/ory.elements-react 패키지 설정
│   ├── dist/                   # 빌드 결과물 (빌드 후 생성)
│   ├── README.md               # 패키지 README (빌드 시 복사)
│   └── LICENSE                 # 라이센스 파일 (빌드 시 복사)
└── nextjs/
    ├── package.json            # @easyyo/ory.nextjs 패키지 설정
    ├── dist/                   # 빌드 결과물 (빌드 후 생성)
    ├── README.md               # 패키지 README (빌드 시 복사)
    └── LICENSE                 # 라이센스 파일 (빌드 시 복사)
```

## 주요 개발 포인트

### @ory/elements-react 패키지
- **인증 플로우 컴포넌트**: Login, Registration, Settings, Recovery, Verification
- **테마 시스템**: CSS 변수 기반 커스터마이징 지원
- **컴포넌트 오버라이드**: 개별 컴포넌트를 커스텀 구현으로 교체 가능
- **다국어 지원**: 기본 번역 제공 및 커스텀 번역 지원
- **핵심 훅**: `useOryFlow()` - 현재 플로우 상태 접근

### @ory/nextjs 패키지
- **App Router 및 Pages Router 모두 지원**
- **미들웨어**: Ory Tunnel 없이 로컬 개발 가능
- **필수 환경변수**: `NEXT_PUBLIC_ORY_SDK_URL` (Ory Network Project SDK URL)

### Ory 통합 패턴
1. **플로우 초기화**: `/self-service/{flowType}/browser` 엔드포인트 호출
2. **플로우 데이터 가져오기**: `getRegistrationFlowRaw()` 등의 API 사용
3. **컴포넌트 렌더링**: 플로우 데이터를 Elements 컴포넌트에 전달
4. **에러 처리**: `handleFlowError()` 함수 활용

### 개발 워크플로우
1. **Storybook 활용**: `nx run @ory/elements-react:storybook`로 컴포넌트 개발 및 테스트
2. **예제 앱 참조**: `examples/` 디렉토리에서 실제 구현 패턴 확인
3. **테마 커스터마이징**: CSS 변수 오버라이드 또는 컴포넌트 교체
4. **국제화**: `customTranslations` 설정으로 메시지 커스터마이징

### 스타일링 가이드
- **기본 스타일 임포트**: `@ory/elements-react/theme/styles.css`
- **테마 커스터마이징**: CSS 변수 오버라이드 (예: `--brand-500`, `--ui-100`)
- **Tailwind 통합**: `@ory/elements-react/theme/tailwind` 설정 활용

## NPM 패키지 발행

### @easyyo 조직으로 발행되는 패키지

이 프로젝트는 원본 Ory Elements 패키지를 @easyyo 조직으로 재발행하는 워크플로우를 제공합니다:

- **@easyyo/ory.elements-react**: 핵심 React 인증 UI 컴포넌트 라이브러리
- **@easyyo/ory.nextjs**: Next.js App Router/Pages Router 통합 패키지

### 발행 워크플로우

1. **의존성 설치**: `make install` (프로젝트 루트에서 npm install)
2. **package.json 동기화**: 원본 패키지 정보를 발행용 패키지에 동기화
3. **원본 패키지 빌드**: `nx build @ory/elements-react` 또는 `nx build @ory/nextjs`
4. **빌드 파일 복사**: dist 폴더를 publish 디렉토리로 복사
5. **메타데이터 복사**: LICENSE, README.md 파일 복사
6. **NPM 발행**: `npm publish --tag latest` 실행

### 버전 관리 규칙

패키지 버전은 다음 형식을 따릅니다:
```
[원본 라이브러리 버전]-[커밋 SHA 7자리].mod[번호]
```
예시: `1.0.0-165f59bd.mod4`

### 발행 전 준비사항

- npm 로그인 상태 확인: `npm whoami`
- 버전 정보 업데이트 (필요시)
- 빌드 및 테스트 성공 확인

## 주요 파일 위치

- **핵심 컴포넌트**: `packages/elements-react/src/components/`
- **테마 파일**: `packages/elements-react/src/theme/`
- **다국어 파일**: `packages/elements-react/src/locales/`
- **Next.js 미들웨어**: `packages/nextjs/src/middleware/`
- **설정 파일**: `nx.json`, `eslint.config.mjs`, `tsconfig.json`
- **발행 설정**: `publish/` 디렉토리 전체
- **발행 가이드**: `publish/README.md`