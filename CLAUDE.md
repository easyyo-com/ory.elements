# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Ory Elements**는 Ory 네트워크와 통합된 React/Next.js 기반 인증 UI 컴포넌트 라이브러리입니다.

- **모노레포 구조**: Nx 워크스페이스로 구성
- **주요 패키지**:
  - `@ory/elements-react`: 핵심 React 컴포넌트 및 테마 시스템
  - `@ory/nextjs`: Next.js 통합 패키지 (App Router/Pages Router + 미들웨어)
- **예제 앱**: `examples/nextjs-app-router`, `examples/nextjs-pages-router`

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

## 주요 파일 위치

- **핵심 컴포넌트**: `packages/elements-react/src/components/`
- **테마 파일**: `packages/elements-react/src/theme/`
- **다국어 파일**: `packages/elements-react/src/locales/`
- **Next.js 미들웨어**: `packages/nextjs/src/middleware/`
- **설정 파일**: `nx.json`, `eslint.config.mjs`, `tsconfig.json`