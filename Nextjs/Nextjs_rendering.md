# Next js 렌더링 방식

- Next js 모든 페이지 사전 렌더링 (Pre-rendering)
  - 더 좋은 퍼포먼스
  - 검색엔진최적화(SEO)
- Pre-rendering의 종류 : html 파일 생성 시점에 따라

  - 정적 생성
  - Server Side Rendering (SSR, Dynamic Rendering)

### 정적 생성

- 유저가 요청하기 전에 미리 만들어도 되는 페이지
- 프로젝트가 빌드하는 시점에 html파일들이 생성
- 모든 요청에 재사용
- 퍼포먼스 이유로, 넥스트 js는 정적 생성을 권고
- 정적 생성된 페이지들은 CDN에 캐시
- 상품 리스트, 도움말 문서 등
- getStaticProps / getStaticPaths

### 서버사이드 렌더링

- 매 요청마다 html 을 생성
- 항상 최신 상태 유지(여러 변동적인 정보)
- CDN에 캐시되지 않기 때문에 조금 느릴 수 있음
- 상세페이지 등
- getServerSideProps
