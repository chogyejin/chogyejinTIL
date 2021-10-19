# Next js 페이지 이동

- location.href나 a 태그
  - 이동 시 페이지가 전부 새로고침 됨 -> SPA 장점 사라짐
- useRoute()의 push
  - 어떤 함수가 동작하며 사용자가 데이터의 request와 response을 받는 것처럼 자동으로 페이지를 넘기고 싶지 않을 때
- Link 태그
  - 주소가 있기 때문에 SEO에 좋음, 페이지를 단순히 보여주기만 하면 될 때
  - prefetch 속성(default true) : 백그라운드에서 페이지를 prefetch함. 스크롤을 내릴 때 viewport 안에 있는 Link 태그들이 preload된다.
