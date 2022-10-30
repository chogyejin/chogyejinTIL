# 📌 7주차 과제[Mission7]

모든 CSS 과제는 개발자 도구로 긁어오지 않고, 본인이 직접 구현해봅니다!
아래 두 과제 중 한 개를 수행해 주시면 됩니다. :)

- 과제 기한
  - 과제 수행 기간: 2022년 5월 2일 ~ 2022년 5월 6일 오후 23시 59분
  - 코드 리뷰 기간: 2022년 5월 9일 ~ 2022년 5월 13일 오후 23시 59분
  - 코드 리뷰 반영 기간: 2022년 5월 13일 ~ 2022년 5월 16일

## 💡 네이버 or 유튜브 메인 레이아웃 클론

- 내용
  - [유튜브](https://www.youtube.com) 메인 페이지(라이트모드) 레이아웃 클론 코딩
- 프로젝트 루트 디렉토리에서 `npx serve -s`로 실행 혹은 VSCode Live server로 index.html 실행(cmd + L)

### 기본 요구사항

### 선택 요구사항

- [ ] JS가 필요한 부분은 생략하고 이유를 명시해 보세요.(CSS로 대체 가능한지 피드백이 있을 수 있어요)
- [ ] JS가 필요한 부분 중 구현할 부분이 있다면 자유롭게 구현해 보세요.
- [x] 레거시 코드 활용보단 최신의 CSS Flex와 Grid를 활용해 보세요.
  - float을 사용하지 않고 정렬이나 구조에 flex와 grid를 사용
- [x] 시멘틱 태그를 최대한 활용해 보세요.
  - `main`, `asdie`, `nav` 활용
- [ ] SCSS 컴파일에 Webpack이나 Parcel 같은 번들러를 활용해 보세요.
- [ ] BEM 방법론을 도입해 보세요.
  - Block(블럭) / Element(블럭 구성 단위) / Modifier(속성),

### 구현하지 못한 점

- 카테고리를 고를 수 있는 버튼이 모인 `main-navigator`에서 <, > 버튼을 통해 좌우로 이동
- `aside` 태그를 이용해서 만든 왼쪽 fixed한 사이드 네비게이션 바
- `@media`를 통한 반응형 구현 실패
  - 브라우저의 크기에 따라 main contents의 아이템의 width 및 height를 늘이고 줄이며 각 행에 적절한 수만 보여주기

### 참고 & 도움받은 곳

- scss 파일 watch : `npx sass --watch scss/main.scss css/main.css` => scss 저장 시 자동 css 컴파일

- 초기 normalizing : [Normalize.css](https://necolas.github.io/normalize.css/)

- icon 출처 : [icon8](https://icons8.kr/icons/set/%08play-button)

- css 순서 정렬 플러그인 : `npm install postcss prettier-plugin-css-order --save-dev`, [CSS Order Prettier Plugin](https://github.com/Siilwyn/prettier-plugin-css-order)
- BEM 방법론: [개념](https://nykim.work/15), [예제](https://github.com/uyeong/bem-style-mdn)
