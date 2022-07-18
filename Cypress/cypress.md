# Cypress

## Get started

- `npm i -D cypress`,
- [공식 docs](https://docs.cypress.io/guides/overview/why-cypress)

## config

- `cypress.config.ts`

  ```ts
  import { defineConfig } from "cypress";

  export default defineConfig({
    e2e: {
      baseUrl: "http://localhost:3000", // 기본 url을 npm start 했을 때의 주소로 설정
    },
  });
  ```

## Test

- type: E2E, Component 두 종류 가능
- `npx cypress open`: cypress에 의해 제어되는 chrome 창 띄워줌
- E2E 테스팅을 선택하고 스크립트를 작성, 예시는 로그인 상황

  ```ts
  // spec.cy.ts
  describe("empty spec", () => {
    // 매 it 블록 실행 전마다 실행, 한 번만 실행은 before
    beforeEach(() => {
      cy.visit("/"); // 홈(baseUrl) 방문
      cy.visit("/login");
    });

    it("logged in fail with empty value", () => {
      const email = "123@123.com";
      const password = "123123";

      cy.get("input[name='logInEmail']").invoke("val", ""); // 빈 값 주입
      cy.get("input[name='logInPassword']").invoke("val", "");
      cy.get("form button").contains("로그인").click();

      cy.get("input[name='logInEmail']").type(email);
      cy.get("form button").contains("로그인").click();

      cy.get("input[name='logInEmail']").clear(); // 값 clear
      cy.get("input[name='logInPassword']").type(password);
      cy.get("form button").contains("로그인").click();
    });

    it("logged in fail with wrong value", () => {
      const email = "123@123.com";
      const password = "123123123";

      cy.get("input[name='logInEmail']").type(email); // type into DOM
      cy.get("input[name='logInPassword']").type(password);
      cy.get("form button").contains("로그인").click();
      cy.get("body").contains("로그인에 실패했습니다!"); // 실패 toast 포함했는지
    });

    it("logged in success", () => {
      const email = "asd@asd.com";
      const password = "123123";

      cy.get("input[name='logInEmail']").type(email);
      cy.get("input[name='logInPassword']").type(password);
      cy.get("form button").contains("로그인").click();
      cy.get("body").contains("로그인 성공했습니다!"); // 성공 toast 포함했는지
    });
  });
  ```

- cypress 내의 selector를 사용하면 get할 요소를 쉽게 찾을 수 있지만 다음과 같은 문제가 있었다.
  - Chakra ui를 사용하여 DOM에 id가 없고 class name이 추측하기 힘들고 복잡하다.
  - 로그인 페이지에서 두 개의 폼이 렌더링 되기 때문에 단순히 `cy.get("form button")`에 match되는 element가 2개였다.
  - textContent나 innerText로 찾을 수 있을 줄 알았는데 실패했고, cypress의 `contains()` 메서드를 통해 문자열을 찾을 수 있다.
