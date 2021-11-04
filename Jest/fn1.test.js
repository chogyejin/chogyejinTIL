// npm test : __test__ 폴더, test로 끝나는 파일 테스트
const fn = require('./fn');

//expect에 검증할 값, toBe에 기대되는 값
//tobe : Matcher, 기본 타입 값 비교할 때 사용
//유사한 것으로 toEqual이 있음
test('1은 1이야', () => {
  expect(1).toBe(1);
});

test('2+3은 5이야', () => {
  expect(fn.add(2, 3)).toBe(5);
});

test('3+3은 5가 아님', () => {
  expect(fn.add(3, 3)).not.toBe(5);
});
