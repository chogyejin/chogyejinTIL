//npm test fn2
const fn = require('./fn');

// test('이름과 나이 입력 받아 객체 반환', () => {
//   expect(fn.makeUser('Mike', 30)).toBe({
//     name: 'Mike',
//     age: 30,
//   });
// });

// //toEqual -> 얕은 비교
// test('이름과 나이 입력 받아 객체 반환', () => {
//   expect(fn.makeUser('Mike', 30)).toEqual({
//     name: 'Mike',
//     age: 30,
//   });
// });

// //객체는 toStrictEqual 사용
// test('이름과 나이 입력 받아 객체 반환', () => {
//   expect(fn.makeUser('Mike', 30)).toStrictEqual({
//     name: 'Mike',
//     age: 30,
//   });
// });

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
