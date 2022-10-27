# useEffect 탐구

## 1. 기본 동작 순서

```ts
function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("useEffect 실행");
    document.title = `${num}번 클릭`; // 지연 시간이 보임
  }, [num]);

  console.log("컴포넌트 render!!");
  return (
    <div>
      <span>{num}번 클릭</span>
      <button onClick={() => setNum((prev) => prev + 1)}>증가</button>
    </div>
  );
}
```

- 컴포넌트: 야 리액트야 컴포넌트(정확히는 `<span>`) 렌더해, 그거 하고는 useEffect 실행해
- 리액트: 야 브라우저야 DOM 변경 있다
- 브라우저: 어 반영해서 보여줄게

## 2. deps에 대한 처리

```ts
function App() {
  const [name, setName] = useState("");
  const [state, setState] = useState({
    name: "",
    isSelected: false,
  });

  useEffect(() => {
    console.log("state가 변하면 useEffect 실행!"); // 버튼 클릭할 때마다 실행됨, state의 변화에 대한 비교가 항상 false
  }, [state]);

  const handleAdd = () => {
    setState((prev) => ({ ...prev, name }));
  };

  const handleSelect = () => {
    setState((prev) => ({ ...prev, isSelected: true }));
  };
  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <div>name: {state.name}</div>
      <div>isSelected: {state.isSelected.toString()}</div>
      <button onClick={handleAdd}>이름 추가</button>
      <button onClick={handleSelect}>선택</button>
    </>
  );
}
```

- 해결책: deps에 `object의 property 자체`를 넣기, `useMemo`를 이용한 변수 이용하기

```ts
useEffect(() => {
  console.log("state가 변하면 useEffect 실행!");
}, [state.name, state.selected]);
```

```ts
// useMemo: 연산한 값 재사용
const user = useMemo(
  () => ({
    name: state.name,
    isSelected: state.isSelected,
  }),
  [state.isSelected, state.name]
);

useEffect(() => {
  console.log("state가 변하면 useEffect 실행!");
}, [user]);
```

## 3. Scheduling

```js
// 매초마다 num이 바뀌며 이게 바뀔 때마다 useEffect를 무한 루프에 빠진다.
function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setNum(num + 1);
    }, 1000);
  }, [num]);

  return <div>{num}</div>;
}
```

- deps를 비우고 functional updates 사용?
  - 특정 상황에 문제가 생기기 때문에 **Strict Mode**로 조기 발견해보자

```js
// 잘 되는 것 같지만 interval을 clean up 되지 않아
// useEffect가 여러 번 mount되면 timer가 여러 개 생기고 num이 제대로 표현되지 않을 수 있음
useEffect(() => {
  setInterval(() => {
    setNum((prev) => prev + 1);
  }, 1000);
}, []);
```

```ts
// clean up 추가
useEffect(() => {
  const intervalId = setInterval(() => {
    setNum((prev) => prev + 1);
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

## 4. clean up

```ts
function App() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log("useEffect 실행!");

    return () => {
      console.log("clean up 실행!");
    };
  }, [toggle]);

  console.log("컴포넌트 render!");
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </div>
  );
}
```

- 첫 render
  - `컴포넌트 render!`
  - `useEffect 실행!`
- 다음 render(버튼 클릭)
  - `컴포넌트 render!`
  - `clean up 실행!`
  - `useEffect 실행!`

```js
// 이 페이지에서 slow network + 뒤로가기(CSR)를 하는 경우
// clean up 하지 않으면 다른 페이지로 라우팅 되어도 동작을 안 멈추고 계속 fetch 하고 있다.
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        alert("posts fetch 완료!");
        setPosts(data);
        console.log(data);
      });
  }, []);

  return <div>Page</div>;
};
```

```js
// flag 사용하여 적절하게 clean up
useEffect(() => {
  let isCancelled = false;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      if (!isCancelled) {
        alert("posts fetch 완료!");
        setPosts(data);
        console.log(data);
      }
    });

  return () => {
    isCancelled = true;
  };
}, []);
```

## 5. AbortController (abort === 유산시키다)

- 하나 이상의 Web requests(API 요청)를 원하는대로 중단하는 객체 생성해주는 인터페이스([MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController))
  - 에러를 보기 쉽게 남겨줌 `Uncaught (in promise) DOMException: The user aborted a request.`

```js
// clean up with fetch API
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  // fetch 두 번째 인자로 signal 전달
  fetch("https://jsonplaceholder.typicode.com/posts", { signal })
    .then((response) => response.json())
    .then((data) => {
      alert("posts fetch 완료!");
      setPosts(data);
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("취소!");
      } else {
        console.log("error를 여기서 handle 하세용"); // 예를 들면 error state update
      }
    });

  return () => {
    controller.abort();
  };
}, []);
```

```js
// clean up with axios
useEffect(() => {
  const source = axios.CancelToken.source();

  // cancelToken에 token 전달
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      cancelToken: source.token,
    })
    .then((response) => {
      alert("posts fetch 완료!");
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("취소!");
      } else {
        console.log("error를 여기서 handle 하세용"); // 예를 들면 error state update
      }
    });

  return () => {
    source.cancel();
  };
}, []);
```
