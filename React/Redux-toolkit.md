# Redux toolkit

## 개요

- Redux: 데이터 관리를 돕는 라이브러리, JS로 이루어졌다면 모두 사용 가능
  - `createStore`, `subscribe`, `getState`, `dispatch`
- React Redux: React에서 사용하기 쉽게 나온 React용 라이브러리
  - `connect`, `useDispatch`, `useSelector`
- Redux toolkit(RTK): Redux를 더 쉽게 사용하기 쉽도록 제공하는 도구 라이브러리
  - `configureStore`, `createSlice`, `createAsyncThunk`(비동기 로직)
  - 기존 Redux의 문제점(설정, 미들웨어, 반복되는 코드, 불변성 유지의 번거로움)을 해결

## 기존의 React Redux

```js
// src/App.js
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// reducer 정의
function reducer(state, action) {
  if (action.type === "up") {
    return { ...state, value: state.value + action.step }; // 불변성 유지해줘야 함
  }
  return state;
}
const initialState = { value: 0 }; // 초기값
const store = createStore(reducer, initialState); // store 생성

const Counter = () => {
  // react-redux의 hook 사용
  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "up", step: 2 }); // action.type = "up", action.step = 2
  };

  return (
    <div>
      <button onClick={handleClick}>+</button>
      <div>{count}</div>
    </div>
  );
};

// App에 Provider로 store 제공
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
```

## Redux toolkit

```js
// src/counterSlice.js, 공식 문서에선 feature라는 디렉토리 하위에 도메인별로 분리
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counterSlice", // slice 이름
  initialState: { value: 0 }, // 초기값 지정
  // reducers => s 붙음, up&down ...
  reducers: {
    up: (state, action) => {
      // up이 실행되면 state와 action은 {type: 'counterSlice/up', payload: 2}
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
    // ...
  },
});

export default counterSlice; // store에서만 import
export const { up, down } = counterSlice.actions; // 사용할 action만 export
```

```js
// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

// 여러 slice를 통합하여 store 생성
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    // another: anotherSlice.reducer,
  },
});

export default store; // Provider의 store 속성에 넘김
```

```js
// src/App.js
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { up, down } from "./counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value); // state는 store의 counter

  const handlePlusClick = () => {
    // action.payload로 2 전달
    // dispatch(counterSlice.actions.up(2)); => counterSlice를 통째로 import 할 때
    dispatch(up(2)); // counterSlice를 import 할 필요 없이 action(up)만 import
  };

  const handleMinusClick = () => {
    dispatch(down(1)); // counterSlice를 import 할 필요 없이 action(down)만 import
  };

  return (
    <div>
      <button onClick={handlePlusClick}>+</button>
      <button onClick={handleMinusClick}>-</button>
      <div>{count}</div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
```

## 정리

- `createSlice` 내에 name(slice 이름), initialState(초기값), reducers(함수들)을 정의
- `configureStore`는 여러 slice를 합쳐 하나의 큰 저장소(store)를 만듦
  - 관심사별로 state를 더 편하게 관리할 수 있게 됨
- 컴포넌트에선 store 내부의 slice에서 필요한 value를 가져오고(`useSelector`), 특정 action을 dispatch(`useDispatch`)한다.
- 참고: [공식 문서](https://redux-toolkit.js.org/), [생활코딩 Redux toolkit](https://www.youtube.com/watch?v=9wrHxqI6zuM)
