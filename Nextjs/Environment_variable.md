# NextJS 환경변수

- NextJS는 기본적으로 환경 변수를 지원
- 개발 모드(development mode)와 배포 모드(production mode)에 따라 다르게 작업해야 함
- 최상단(root) 디렉토리에서 .env 파일 만듦
- .env 파일에는 민감한 정보(비밀키나 토큰)가 있을 수 있기 때문에 git에 push하지 않는 게 좋음(.gitignore 이용
  )
  - .env :
  - .env.development : 개발 모드(`npm run dev`) 환경변수 저장
  - .env.production : 배포 모드(`npm run build` 후 `npm run start`) 환경변수 저장

### process.env.변수명

- Node js 환경에서 사용
- 서버사이드 환경에 있는 변수(getServerSideProps 등)
- 클라이언트 단에서 undefined(노출 x)

### process.env.NEXT_PUBLIC\_변수명

- Browser 환경에서 사용
- 서버와 클라이언트 단 모두에서 사용 가능한 환경에 있는 변수
