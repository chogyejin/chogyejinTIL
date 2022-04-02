# CSS, Styled Components

## CSS

- 기존 CSS는 중복되지 않는 class 이름에 대해 고민하거나, CSS 간 의존성을 파악하기 힘들고, JS와 상태를 공유하지 못하며 불필요한 코드 관리의 어려움 등이 있다. 이에 따라 전처리기, 프레임워크, JS를 활용한 CSS가 등장하게 됐다.

### 1. CSS preprocessor

- 작성(개발)할 때는 기존 CSS보다 편하고, 만들어졌을 때 CSS로 변환됨
- CSS 파일로 컴파일 하는 시간이 추가로 소요됨, 디버깅이 어려움
- Sass, Less, PostCSS 등

### 2. CSS Framework

- 완성된 stylesheet를 이용하여 class나 id 등을 적절하게 사용하면 HTML 만으로 스타일을 줄 수 있음
- 특정 문법을 익혀야 하고, 커스텀을 하려면 특정 파일을 찾아서 수정해야 함
- Bootstrap, Tailwind CSS 등

### 3. CSS-in-JS

- JS에서 component 단위로 CSS를 정의하고 결합, inline-style과 유사하지만 재사용성이 더 높고 가독성이 올라감
- JS를 파싱하여 CSSOM을 만들어 번들의 크기가 커짐, component 단위로 동작하기 때문에 사용자와 상호작용이 많다면 UX가 떨어질 수 있음
- Styled Components, Emotion 등

---

## Styled Components

- 참고 : [React Styled Components - Codevolution](https://www.youtube.com/watch?v=FSCSdAlLsYM&list=PLC3y8-rFHvwgu-G08-7ovbN9EyhF_cltM&index=1)
- Styled Components?

  - Tagged Template Literal을 사용하여 특정 component를 범위로 하는 CSS를 작성하는 CSS-in-JS 라이브러리
    - Tagged Template Literal이란 함수의 인자에 템플릿 리터럴을 이용하여 첫 번째 매개변수로 문자열을, 나머지는 변수를 넘긴다.

- 특징
  - 스타일마다 고유한 class 이름을 생성하여 중복이나 오타에 대한 신경을 안 써도 된다.
  - props를 이용하여 동적인 스타일링이 가능하다.
  - 브라우저별 vendor prefix가 없이 작성해도 라이브러리가 해결해줌
- Setup
  - Extensions : vscode-styled-components
  - Library : `npm install styled-components`, `npm install @types/styled-components`
- Usage

  ```typescript
  // components/styled/Button/Button.styles.js
  import styled from "styled-components";
  export const StyledButton = styled.button`
    <!-- 스타일 정의 -->
  `;
  ```

  ```typescript
  // components/styled/Button/Button.js
  import { StyledButton } from "./Button.styles";

  export default StyledButton;
  ```

  ```typescript
  // components/App.tsx
  import StyledButton from "./styled/Button/Button";
  function App() {
    return (
      <div>
        <StyledButton>버튼</StyledButton>
      </div>
    );
  }
  ```

- Using Props

  - 사용자 정의 component에서 prop(variant)을 넘긴다.
  - component가 선언된 곳에서 interface를 정의하고 표현식으로 prop을 응용한 함수를 사용한다.

  ```html
  <StyledButton>버튼</StyledButton>
  <StyledButton variant="outline">버튼</StyledButton>
  ```

  ```typescript
  // components/styled/Button/Button.styles.js
  import styled from "styled-components";

  interface IStyledButton {
    variant?: string;
  }

  export const StyledButton = styled.button<IStyledButton>`
    background-color: ${(props) =>
      props.variant === "outline" ? "#FFF" : "#4caf50"};
    color: ${(props) => (props.variant === "outline" ? "#4caf50" : "#FFF")};
  `;
  ```
