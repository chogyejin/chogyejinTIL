// mock function

const fn = require('./fn');

const mockFn = jest.fn();

mockFn();
mockFn(1);

// // mockFn 함수에는 mock이라는 property와 calls라는 배열이 있음
// // 함수가 총 몇 번 호출되었는지, 전달된 인수는 뭔지 파악 가능
test('함수는 2번 호출된다', () => {
  expect(mockFn.mock.calls.length).toBe(2);
});

test('2번째로 호출된 함수의 첫 번째 인수는 1이다', () => {
  expect(mockFn.mock.calls[1][0]).toBe(1);
});

const mockFn2 = jest.fn();

function forEachAdd1(arr) {
  arr.forEach((num) => {
    mockFn2(num + 1);
  });
}

forEachAdd1([10, 20, 30]);

test('함수는 3번 호출된다', () => {
  expect(mockFn2.mock.calls.length).toBe(3);
});

test('전달된 값은 1씩 증가한 11, 21, 31이다', () => {
  expect(mockFn2.mock.calls[0][0]).toBe(11);
  expect(mockFn2.mock.calls[1][0]).toBe(21);
  expect(mockFn2.mock.calls[2][0]).toBe(31);
});

// 어떤 값을 리턴하는 함수가 필요할 때
const mockFn3 = jest.fn((num) => num + 1);

mockFn3(10);
mockFn3(20);
mockFn3(30);

// mock.results는 type과 value를 가진 객체 배열
// [
//   { type: 'return', value: 11 },
//   { type: 'return', value: 21 },
//   { type: 'return', value: 31 },
// ];
test('함수는 3번 호출된다', () => {
  console.log(mockFn3.mock.results);
  expect(mockFn3.mock.calls.length).toBe(3);
});

test('10에서 1 증가는 11', () => {
  expect(mockFn3.mock.results[0].value).toBe(11);
});

test('20에서 1 증가는 21', () => {
  expect(mockFn3.mock.results[1].value).toBe(21);
});

test('30에서 1 증가는 31', () => {
  expect(mockFn3.mock.results[2].value).toBe(31);
});

// mockFn.mockReturnValueOnce, mockFn.mockReturnValue : 중간에 리턴값 변경
// callback 함수 대신 먼저 mock 함수 이용
// 홀수만 찾기
const mockFn4 = jest.fn();

mockFn4
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValue(true);

const result = [1, 2, 3, 4, 5].filter((num) => mockFn4(num));

test('홀수는 1, 3, 5', () => {
  expect(result).toStrictEqual([1, 3, 5]);
});

// 비동기 함수 흉내내기
const mockFn5 = jest.fn();

mockFn5.mockResolvedValue({ name: 'Mike' });

test('받아올 이름은 Mike', () => {
  mockFn5().then((res) => {
    expect(res.name).toBe('Mike');
  });
});

// jest.mock()으로 fn을 mocking module로 만들고
// fn.createUser.mockReturnValue()를 통해 객체 리턴
// 이때 실제 createUser는 호출되지 않는다.(createUser의 console.log 안 찍힘)
jest.mock('./fn');

fn.createUser.mockReturnValue({ name: 'Mike' });

test('유저를 만들거야', () => {
  const user = fn.createUser('Mike');
  expect(user.name).toBe('Mike');
});

// toBeCalled 관련 Matcher

const mockFn6 = jest.fn();

mockFn6(10, 20);
mockFn6();
mockFn6(30, 40);

test('한 번 이상 호출됨?', () => {
  expect(mockFn6).toBeCalled();
});

test('3번 호출됨?', () => {
  expect(mockFn6).toBeCalledTimes(3);
});

test('인수로 10, 20 받아서 호출됨?', () => {
  expect(mockFn6).toBeCalledWith(10, 20); //30, 40으로 바꿔도 테스트 통과
});

test('마지막으로 실행된 함수 인자 30, 40으로 호출됨?', () => {
  expect(mockFn6).lastCalledWith(30, 40);
});
