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
