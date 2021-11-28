# Next js 페이지 이동

- \<a>, location.href
  - 이동 시 페이지가 전부 새로고침 됨 -> SPA 장점 사라짐
  - 서버 사이드 이동
- useRoute()의 router.push()
  - 이벤트 핸들러를 통해 동작할 때 사용
  ```
  <button onClick={() => router.push("/")}>홈으로</button>
  ```
  - 어떤 함수가 동작하며 사용자가 데이터의 request와 response을 받는 것처럼 자동으로 페이지를 넘기고 싶지 않을 때
  - 클라이언트 사이드 이동(Client-side transition)
  - 다른 페이지로 이동하는 것으로 인식 못해 SEO에 불리
- \<Link>
  - 주소가 있기 때문에 SEO에 좋음, 페이지를 단순히 보여주기만 하면 될 때
  - 클라이언트 사이드 이동(Client-side transition)
  - prefetch 속성(default true) : 백그라운드에서 페이지를 prefetch함. 스크롤을 내릴 때 viewport 안에 있는 Link 태그들이 preload된다.
