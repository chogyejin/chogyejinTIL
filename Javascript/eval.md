# [eval](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)

- MDN eval을 들어가자마자 위험하다고 나온다.
- 문법: `eval(string)`
  - `'2 + 2'`, `'alert("hello")'`, ...
  - 문자열로 표현된 인자를 JavaScript로 평가하여 completion value return, 없으면 undefined
- 문제점
  1. 웹페이지나 확장 프로그램(caller)의 권한으로 악의적인 문자열(무한 루프, `location.href` 등)을 넣어 실행 가능 => 보안 문제
  2. JS 엔진으로 최적화가 되지 않음(인터프리터로 해석해야 함) => 성능 문제
  3. 디버깅 힘듦(ex)몇 번째 줄이 문제인지 알 수 없음)
- 해결법(대체 방법)

  - `Function`을 이용하여 함수 객체를 만들어서 평가해보자([링크](https://www.educative.io/answers/eval-vs-function-in-javascript))

  ```js
  let userInput = "2*4";
  let result = Function("return " + userInput)(); // return이 없으면 익명 함수 내부에 2*4만 덜렁 있는 상태
  console.log(result); // 8
  ```

  - 하지만 `Function`도 eslint를 돌려보면 no-new-func 룰에 걸려 노란 줄 경고가 뜬다.

- 결론
  - 테스트 문자에 문자열 식을 평가해야 하는 상황이 나왔는데 급하게 생각나는대로 사용한 eval은 문제점이 있었고, Function으로도 어느 정도 보완이 되지만 똑같이 string을 JavaScript로 평가하려는 행동이기 때문에 권장되지 않는 상황이라고 생각된다.
  - 정석대로 문자열을 순회하며 숫자와 연산자 기호에 따라(연산 순서도 체크) 차례대로 계산해내는 방법을 사용해야 할 것 같다.
