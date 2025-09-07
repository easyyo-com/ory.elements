# Ory Elements NPM 패키지 발행 가이드

이 폴더는 Ory Elements의 두 주요 패키지를 @easyyo npm 조직으로 발행하기 위한 워크플로우를 제공합니다.

## 📦 패키지 개요

- **@ory/elements-react** → **@easyyo/ory.elements-react**: React 인증 UI 컴포넌트 라이브러리
  - 현재 버전: 1.0.0-165f59bd.mod4
- **@ory/nextjs** → **@easyyo/ory.nextjs**: Next.js 통합 패키지 (App Router/Pages Router + 미들웨어 지원)
  - 현재 버전: 1.0.0-rc.0-165f59bd.mod2

## 📁 폴더 구조

```
publish/
├── README.md                                    # 이 파일 - 전체 가이드
├── Makefile                                     # 빌드 및 퍼블리시 통합 관리
├── utils/
│   ├── log.sh                                  # Makefile에서 사용하는 색상 로그 유틸리티
│   ├── sync-package-json.js                    # package.json 동기화 Node.js 스크립트
│   └── sync-package.sh                         # package.json 동기화 실행 쉘 스크립트
├── elements-react/
│   ├── .gitignore                              # Git 무시 파일 (dist, LICENSE, README.md 제외)
│   ├── package.json                            # @easyyo/ory.elements-react 패키지 설정
│   ├── dist/                                   # 빌드 결과물 (빌드 후 생성)
│   ├── README.md                               # 패키지 README (빌드 시 복사)
│   └── LICENSE                                 # 라이센스 파일 (빌드 시 복사)
└── nextjs/
    ├── .gitignore                              # Git 무시 파일 (dist, LICENSE, README.md 제외)
    ├── package.json                            # @easyyo/ory.nextjs 패키지 설정
    ├── dist/                                   # 빌드 결과물 (빌드 후 생성)
    ├── README.md                               # 패키지 README (빌드 시 복사)
    └── LICENSE                                 # 라이센스 파일 (빌드 시 복사)
```

## 🚀 사용법

### 1. 환경 설정

#### npm 로그인
발행하기 전에 npm에 로그인되어 있는지 확인하세요:

```bash
# npm 로그인 상태 확인
npm whoami

# 로그인이 필요한 경우
npm login
```

### 2. 빌드 및 발행

#### 🔧 Makefile 사용법

**기본 사용법:**
```bash
# 도움말 보기
make help

# 의존성 설치
make install
```

**빌드:**
```bash
# 개별 패키지 빌드
make build-elements-react
make build-nextjs

# 모든 패키지 빌드
make build-all
```

**package.json 동기화:**
```bash
# 개별 패키지 동기화
make sync-package-elements-react
make sync-package-nextjs

# 모든 패키지 동기화
make sync-all-packages
```

**퍼블리시 (빌드 자동 포함):**
```bash
# 개별 패키지 퍼블리시
make publish-elements-react
make publish-nextjs

# 모든 패키지 퍼블리시
make publish-all
```

#### 💡 활용 예시

**시나리오 1: 처음 사용하는 경우**
```bash
# 도움말 확인
make help

# 의존성 설치 후 모든 패키지 빌드 및 퍼블리시
make install
make publish-all
```

**시나리오 2: 개별 패키지만 업데이트**
```bash
# elements-react만 빌드 및 퍼블리시
make publish-elements-react
```

## ⚙️ 작업 과정

Makefile이 자동으로 처리하는 작업 과정:

1. **의존성 설치**: `make install` - 프로젝트 루트에서 `npm install` 실행
2. **package.json 동기화**: 원본 패키지의 package.json을 발행용 패키지에 동기화
3. **원본 패키지 빌드**: `nx build @ory/elements-react` 또는 `nx build @ory/nextjs` 실행
4. **빌드 파일 복사**: `packages/{package}/dist/` 폴더의 빌드 결과물을 `publish/{package}/dist/`로 복사
5. **메타데이터 파일 복사**: LICENSE, README.md 파일을 패키지 폴더에 복사
6. **npm 발행**: 각 패키지 폴더에서 `npm publish --tag latest` 실행

## 🔧 커스터마이징

### 버전 관리
- 각 패키지의 `package.json`에서 버전을 수정할 수 있습니다. 버전은 `[original 라이브러리 현재 버전]-[빌드 시의 original 레포지토리 커밋sha 7자리].mod[번호;1부터 시작]`
  - 예: "version": "1.0.0-165f59bd.mod3"

### 패키지 설정 수정
`publish/elements-react/package.json`과 `publish/nextjs/package.json`에서 필요시 수정:
- `name`: 패키지 이름 (현재: @easyyo/ory.elements-react, @easyyo/ory.nextjs)
- `version`: 패키지 버전
- `description`: 패키지 설명
- `repository`: Git 저장소 URL
- `bugs`: 이슈 트래커 URL

### Makefile 커스터마이징
`publish/Makefile`을 수정하여 빌드 과정을 커스터마이징할 수 있습니다:

**주요 구성 요소**:
- **로그 유틸리티**: `utils/log.sh` 스크립트를 통한 색상 로그 출력
- **타겟 정의**: 빌드, 퍼블리시, 정리 등의 작업 타겟
- **의존성 관리**: 타겟 간 의존성 관리

**커스터마이징 포인트**:
- 새로운 패키지 추가
- 빌드 과정 수정 (예: 추가 전처리 작업)
- 로그 메시지 변경
- 퍼블리시 태그 변경 (`--tag latest` 부분)
- 메타데이터 파일 추가/변경
- package.json 동기화 필드 변경

### package.json 동기화 커스터마이징
`utils/sync-package-json.js`에서 동기화 로직을 커스터마이징할 수 있습니다:

**동기화 제외 필드**:
현재 다음 필드들은 원본에서 복사되지 않고 발행용 패키지의 값을 유지합니다:
- `name`: 패키지 이름 (예: @easyyo/ory.elements-react)
- `version`: 패키지 버전
- `author`: 패키지 작성자
- `repository`: Git 저장소 URL
- `bugs`: 이슈 트래커 URL
- `homepage`: 홈페이지 URL
- `devDependencies`: 개발 의존성
- `scripts`: NPM 스크립트
- `publishConfig`: 발행 설정

**동기화되는 필드**:
위 필드를 제외한 모든 필드 (dependencies, peerDependencies, description, keywords 등)가 원본 패키지에서 발행용 패키지로 동기화됩니다.

## 📋 체크리스트

발행 전 확인사항:
- [ ] npm 로그인 상태 확인 (`npm whoami`)
- [ ] package.json 버전 정보 업데이트
- [ ] 빌드 스크립트가 성공적으로 실행됨

## 🐛 문제 해결

### 빌드 실패
```bash
# 빌드 결과물 정리 후 재빌드
make clean
make install
make build-all

# 개별 패키지 디버깅 (프로젝트 루트에서)
cd ..
npx nx reset
npx nx build @ory/elements-react
npx nx build @ory/nextjs
```

### 발행 권한 오류
```bash
# npm 로그인 확인
npm whoami

# 재로그인이 필요한 경우
npm logout
npm login
```

## 📚 추가 자료

- [Ory Elements 공식 문서](https://www.ory.sh/docs/elements)
- [Ory Elements GitHub](https://github.com/ory/elements)
- [npm 발행 가이드](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [Nx 빌드 시스템](https://nx.dev/getting-started/intro)
- [npm 조직 관리](https://docs.npmjs.com/creating-an-organization)

## 📊 현재 발행된 패키지

- [@easyyo/ory.elements-react](https://www.npmjs.com/package/@easyyo/ory.elements-react)
- [@easyyo/ory.nextjs](https://www.npmjs.com/package/@easyyo/ory.nextjs)

---

**주의사항**: 
- 이 워크플로우는 원본 Ory Elements 저장소와 독립적으로 운영됩니다.
- 원본 저장소의 업데이트를 반영하려면 정기적인 동기화가 필요합니다.
- 발행 전 반드시 테스트를 통해 패키지가 정상 작동하는지 확인하세요.
