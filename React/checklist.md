# React checklist

1. 소문자로 시작하는 컴포넌트

   - React는 소문자로 시작하는 컴포넌트에 대해 html 태그로 인식함

   ```
   function Hello({name}){
       return(
           <div>
            {name ? (
                <div>Hello I`m {name}</div>
            ) : (
                <div>no name</div>
            )}
            </div>
       );
   }

   export default function Home(){
       return(
           <div>
           Welcome
           <Hello name="Mike" /> // 대문자로 시작!
           </div>
       );
   }
   ```

2. export vs export default

   - export : import 할 때 중괄호 안에 export 된 이름 그대로 사용
   - export default : 파일에 하나, import 할 때 중괄호 안해도 되고 아무 이름이나 사용 가능
   - as로 컴포넌트 이름 별칭 짓기 가능

   ```
   // Home.js
   // import RedBox from "../src/component/Box"; // 에러
   import {RedBox as RB} from "../src/component/Box";
   import GB from "../src/component/Box";

   export default function Home() {
       return(
           <div>
           Hi
           <Redbox />
           </div>
       )
   }
   ```

   ```
   // Box.js

   export function RedBox() {
       return <div style={{backgroudColor:'red'}}>Red<div>;
   }

   export function BlueBox() {
       return <div style={{backgroudColor:'blue'}}>Blue<div>;
   }

   export default function GreenBox() {
       return <div style={{backgroudColor:'green'}}>Green<div>;
   }
   ```

3. return null;

   - `return;`은 `return undefiend;` 와 같음
   - 어떤 컴포넌트를 분기에 따라 숨기려할 때는 null을 리턴

   ```
   function Hello(){
       if(조건) {
           return null;
       }
   }
   ```

4. setState는 비동기로 동작

   - set 실행 직후 state에 접근했을 때 기대하는 결과값을 못 얻을 수도 있음(변경 전 값을 얻게 된다)
   - 연속적으로 실행해도 하나의 값만 업데이트 될 수 있음
   - 따라서 updater 함수 사용 : state를 인자로 받아 최신의 값이 보장됨

   ```
   const [count, setCount] = useState(0);

   function clickHandler() {
       // 1만 증가됨
       //setCount(count + 1);
       //setCount(count + 1);
       //setCount(count + 1);
       //setCount(count + 1);
       //setCount(count + 1);

       // 해결책
       setCount((prevState) => (prevState + 1));
       setCount((prevState) => (prevState + 1));
       setCount((prevState) => (prevState + 1));
       setCount((prevState) => (prevState + 1));
       setCount((prevState) => (prevState + 1));
   }

   return (
       <button onClick={clickHandler}>5 증가할래</button>
   );
   ```

5. state는 불변으로 관리

   - 이전 state 값과 이후 state 값을 비교하여 다른 경우에만 update

   ```
   const Mike = {
       name: "Mike",
       age: 30,
   };

   const [user, setUser] = useState(Mike);

   // Mike의 나이 바꾸고 set 하기
   function clickHandler() {
       // 이렇게 하면 같은 객체로 인식 -> set 안됨
       //Mike.age = 10;
       //setUser(Mike);

       // 새 객체 생성해서 set, 혹은 Object.assign
       const newMike = {...Mike, age: 10};
       setUser(newMike);
   }

   return (
       <div>
        <button onClick={clickHandler}>버튼</button>
       </div>
   );
   ```

6. 배열의 길이가 0

   - React에선 숫자나 문자형은 스킵하지 않고 표현
   - 단순히 arr.length && () 이용하면 length가 0일 때 0 표현
     - arr.length > 0 이용

   ```
   // 유저리스트가 있으면 보여주고 없으면 영역 없애줘
   const userList = [];

   return(
       <>
        {userList.length > 0 && (
            <div>
                사용자 리스트 :
                {userList.map(user => (
                    <div key={user}>{user}</div>
                ))}
            </div>
        )}
       </>
   );
   ```
