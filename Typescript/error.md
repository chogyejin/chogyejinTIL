# TypeError

- TypeError 객체는 일반적으로 값이 기대하던 자료형이 아니라서 연산을 할 수 없을 때 발생하는 오류
  - 함수에 전달된 피연산자 또는 인수가 해당 연산자나 함수가 예상하는 타입과 호환되지 않을 때
  - 변경할 수 없는 값을 수정하려고 하거나,
  - 부적절한 방법으로 값을 사용하려고 할 때.

```
catch (e: any) {
    console.log(e instanceof TypeError); // true나 false
    console.log(e.message);
    console.log(e.name); // "TypeError"
    console.log(e.fileName);
    console.log(e.lineNumber);
    console.log(e.columnNumber);
    console.log(e.stack); // 어느 스택인지
    //res.send related with error
  }
```
