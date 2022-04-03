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
    - Tagged Template Literal이란 함수의 인자에 template literal을 이용하여 첫 번째 매개변수로 문자열을, 나머지는 변수를 넘긴다.

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
  // 스타일 작성
  import styled from "styled-components";
  export const StyledButton = styled.button`
    <!-- 스타일 정의 -->
  `;
  ```

  ```typescript
  // components/styled/Button/Button.js
  // import한 스타일들 export
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

- Extending Styles

  - import한 styled 함수에 HTML element 외에 component 자체를 넘겨서 확장
  - component의 attribute를 `as="a"` 으로 넘겨 element 종류 바꿀 수도 있음

  ```typescript
  // components/styled/Button/Button.styles.js
  export const FancyButton = styled(StyledButton)`
    background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
    border: none;
  `;
  ```

  ```typescript
  // components/styled/Button/Button.js
  import { StyledButton, FancyButton } from "./Button.styles";

  export default StyledButton; // StyledButton으로 import
  export { FancyButton }; // { FancyButton }으로 import
  ```

- Pseudo Classes

  - hover, before, after 등 pseudo class는 `&:[pseudo-class] { }`로 작성

  ```typescript
  // components/styled/Button/Button.styles.js
  export const StyledButton = styled.button<IStyledButton>`
    // ..
    &:hover {
      background-color: ${(props) =>
        props.variant !== "outline" ? "#FFF" : "#4caf50"};
      color: ${(props) => (props.variant !== "outline" ? "#4caf50" : "#FFF")};
    }
  `;
  ```

- Adding Attributes

  - 사용자 정의 component에서 HTML 태그 내의 attribute를 일일이 넘기지 않고 styled 객체의 내장 함수 `attrs({ })`(attributes constructor)에게 key-value 형태로 선언하여를 이용한다.

  ```typescript
  // components/styled/Button/Button.styles.js
  export const SubmitButton = styled(StyledButton).attrs({
    type: "submit", // 직접 전달
  })``;

  export const SubmitButton = styled(StyledButton).attrs((props) => ({
    type: props.type, // props로 전달
  }))``;
  ```

- Animations

  - 애니메이션 스타일 + 키프레임(애니메이션 특정 시점 제어)으로 부드러운 CSS 만듦, [Using CSS Animations - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
  - Styled Components에선 `keyframes` 함수를 import하여 작성하고, 이의 return 값을 담은 변수를 template literal에서 animation 속성에서 표현값으로 사용

  ```typescript
  // components/styled/Button/Button.styles.js
  import styled, { keyframes } from "styled-components";

  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  export const AnimatedLogo = styled.img`
    animation: ${rotate} infinite 5s linear;
  `;
  ```

  - React image import [Using the Public Folder - CRA](https://create-react-app.dev/docs/using-the-public-folder/)

- Theming

  - 테마를 가진 object를 선언하고, ThemeProvider를 import하여 `theme` 속성으로 전달하면 그 아래의 모든 component가 테마 object에 접근 가능

  ```typescript
  // components/App.tsx
  import { ThemeProvider } from "styled-components";

  const theme = { // theme 가지고 있는 object
    dark: {
      primary: "#000",
      text: "#fff",
    },
    light: {
      primary: "#fff",
      text: "#000",
    },
  };

  function App() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <DarkButton>검정버튼</DarkButton>
        </ThemeProvider>
      </>
  }
  ```

  ```typescript
  // components/styled/Button/Button.styles.js
  export const DarkButton = styled(StyledButton)`
    border: solid 2px ${(props) => props.theme.dark.primary};
    background-color: ${(props) => props.theme.dark.primary};
    color: ${(props) => props.theme.dark.text};
  `;
  ```

- Global Styles

  - Styled Components는 기본적으로 component마다 분리되어 있지만, CSS resets이나 base 스타일들은 global하게 쓰여야 한다.
  - `createGlobalStyle` 함수를 import하여 component를 만들고 범위를 감싸준다. 다른 component와 마찬가지로 ThemeProvider에게 theme을 받을 수 있다.

  ```typescript
  // components/App.tsx
  import { ThemeProvider, createGlobalStyle } from "styled-components";

  const theme = {
    dark: {
      primary: "#000",
      text: "#fff",
    },
    light: {
      primary: "#fff",
      text: "#000",
    },
    fontFamily: "Segoe UI", // 하이픈(-) 사용 X
  };

  type ThemeType = typeof theme;

  const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
    button {
      font-family: ${(props) =>
        props.theme.fontFamily}; // 직접 주려면 font-family: cursive;
    }
  `;

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
      </ThemeProvider>
    );
  }
  ```
