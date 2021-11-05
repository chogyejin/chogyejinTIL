//npm test fn2
const fn = require('./fn');

test('이름과 나이 입력 받아 객체 반환', () => {
  expect(fn.makeUser('Mike', 30)).toBe({
    name: 'Mike',
    age: 30,
  });
});

//toEqual -> 얕은 비교
test('이름과 나이 입력 받아 객체 반환', () => {
  expect(fn.makeUser('Mike', 30)).toEqual({
    name: 'Mike',
    age: 30,
  });
});

// //객체는 toStrictEqual 사용
test('이름과 나이 입력 받아 객체 반환', () => {
  expect(fn.makeUser('Mike', 30)).toStrictEqual({
    name: 'Mike',
    age: 30,
  });
});

// toBeNull
// toBeUndefined
// toBeDefined
// toBeTruthy
// toBeFalsy
test('null은 null이다', () => {
  expect(null).toBeNull();
});

test('1+(-1)은 false이다', () => {
  expect(fn.add(1, -1)).toBeFalsy();
});

test('빈 문자열이 아니면 true다', () => {
  expect(fn.add('good', 'morning')).toBeTruthy();
});

// 숫자 관련, 아이디 길이 제한, 업로드 파일 크기 판별 등
// toBeGreaterThan : 크다
// toBeGreaterThanOrEqual : 크거나 같다
// toBeLessThan : 작다
// toBeLessThanOrEqual : 작거나 같다

test('ID는 10자 이하로', () => {
  const id = 'AABBCCDDEEFF';
  expect(id.length).toBeLessThanOrEqual(10);
});

test('비밀번호는 6자리', () => {
  const pw = '123456';
  expect(pw.length).toBe(6);
});

// 숫자 근사치(JS는 정확한 소수 계산 못함)
test('0.1 + 0.2는 0.3이다', () => {
  expect(fn.add(0.1, 0.2)).toBeClose(0.3);
});
