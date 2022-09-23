# [React Router](https://reactrouter.com/en/main),

## React Router란

- React의 client side routing을 가능하게 해주는 라이브러리

  - React에서 자체적으로 라우팅을 지원하지는 않기 때문에 third party 라이브러리를 활용하는 것이 간편함

- 규모가 커졌을 때 필요하지 않은 컴포넌트들까지 불러오지 않게 하는 것은 코드 스플리팅 필요([참고](https://ui.dev/react-router-code-splitting))

## 시작

- 설치: `npm i react-router-dom`

## 적용

### `BrowserRouter`로 `<App />` 감싸기

- `BrowserRouter`는 브라우저 주소창의 현재 location을 저장하고 내장 history 스택을 이용하여 navigate 해준다.

```js
// src/index.tsx
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 페이지로 사용할 컴포넌트(`Home`, `About` 등)를 만들고 `Routes` 안에 `Route` 만들기

- `Route`는 URL segment와 컴포넌트, 데이터를 연결
  - `path`에 경로,` element`에 React 컴포넌트를 대입

```js
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
```

- properties
  - 컴포넌트가 render 되기 전 데이터를 가져오는 `loader`
  - loader에 대한 mutate를 제공하는 `action`
  - loader와 action에 대한 에러나 컴포넌트 rendering에 문제가 생겼을 때 보여줄 컴포넌트를 지정하는 `errorElement`
  - loader 데이터에 대한 최적화된 재검증을 해주는 `shouldRevalidate`

### 페이지 간 navigate를 시켜주는 `<Link>`

- HTML `<a href>`를 render 시킴
- properties

  - `reloadDocument`으로 기본 a 태그 같은 효과를 내기도 함
  - `relative="path"`로 Route 계층에 상대적으로 접근도 가능(`<Link to="..">`)
  - `<ScrollRestoration>`를 사용 중이라면, tab 등에서 scroll position을 유지할 수 있는 `preventScrollReset` props이 있다.

  ```js
  <Link to="?tab=one" preventScrollReset={true} />
  ```

### useParams, useLocation, useSearchParams, useNavigate

- URL 파라미터는 주소의 경로에 유동적인 값을 넣음, 쿼리 스트링은 주소의 뒷부분에 ? 문자열 이후에 key=value 로 값을 정의하며 & 로 구분
  - URL 파라미터는 ID 또는 이름을 사용하여 특정 데이터를 조회할 때 사용하고, 쿼리 스트링은 키워드 검색, 페이지네이션, 정렬 방식 등 데이터 조회에 필요한 옵션을 전달할 때 사용
- `useParams`

  - 현재 URL의 `<Route path>`에 대응하는 동적 파라미터의 키/밸류 객체 반환, 주로 동적 라우팅의 URL 파라미터 파싱에 사용

  ```js
  function ProfilePage() {
    // Get the userId param from the URL.
    let { userId } = useParams();
    // ...
  }

  function App() {
    return (
      <Routes>
        <Route path="users">
          <Route path=":userId" element={<ProfilePage />} />
          <Route path="me" element={...} />
        </Route>
      </Routes>
    );
  }
  ```

- `useLocation`
  - 현재 URL로 방문한 페이지에 대한 `location` 객체 반환, 주로 쿼리스트링 파싱에 사용
    - pathname(쿼리스트링 제외), search(쿼리스트링), hash(# 문자 뒤 값), state(페이지 이동할 때 전달하는 값), key(location 객체의 고유 값)
- `useSearchParams`

  - `useLocation`보다 쉽게 쿼리스트링을 얻을 수 있음
  - 현재 location의 [search params](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)와 이를 업데이트하는 set 함수 반환, `useState` hook과 유사

  ```js
  // URL: /about?detail=true
  const About = () => {
    const [searchParams, setSearchParams] = useSearchParams({
      detail: "true",
    });
    const detail = searchParams.get("detail");

    const handleClick = () => {
      setSearchParams({ detail: detail === "true" ? "false" : "true" });
    };

    return (
      <div>
        <h1>About</h1>
        <div>{detail}</div>
        <button onClick={handleClick}>detail 값 변경하기</button>
      </div>
    );
  };
  ```

- `useNavigate`

  - `<Link>`를 사용하지 않고 페이지 이동(navigate programmatically)하는 함수 반환

  ```js
  const Layout = () => {
    const navigate = useNavigate();

    const goBack = () => {
      // 이전 페이지로 이동
      navigate(-1);
    };

    const goArticles = () => {
      // articles 경로로 이동
      navigate("/articles");
    };

    return (
      <div>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
      </div>
    );
  };
  ```

### Nested Route

- Route가 중첩될 때, `<Outlet />` 컴포넌트로 children 컴포넌트를 보여줄 수 있다(`Article`, `Layout`).

```js
// src/App.tsx
// Home을 쓰는 Route는 상위 라우트의 경로와 일치하지만, 그 이후에 경로가 주어지지 않았을때 보여지는 라우트를 설정할때 사용
// path="*"은 위에서 Route가 매치되지 않았을 때 아무 문자열을 매칭시켜서 NotFound 페이지 보여줌
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />}>
          <Route path=":id" element={<Article />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
```

```js
// src/Layout.tsx
const Layout = () => {
  return (
    <>
      <Gnb />
      <main>
        <Outlet />
      </main>
    </>
  );
};
```

```js
const Article = () => {
  const { id } = useParams();

  return <div>{id}번째 게시물</div>;
};
```

- 참고: [React Router v6 튜토리얼](https://velog.io/@velopert/react-router-v6-tutorial#61-usenavigate)
