const fn = require('./fn');

// let num = 0;

// // beforeEach : 각 테스트 직전에 실행되는 함수
// // afterEach : 각 테스트 직후 실행
// beforeEach(() => {
//   num = 0;
// });

// test('0 더하기 1은 1이다', () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1);
// });

// test('0 더하기 2은 2이다', () => {
//   num = fn.add(num, 2); //num이 계속 바뀌기 때문에 beforeEach로 초기화 필요
//   expect(num).toBe(2);
// });

// test('0 더하기 3은 3이다', () => {
//   num = fn.add(num, 3);
//   expect(num).toBe(3);
// });

let user;
// 작업 전에 DB에서 유저 정보 가져온다
// 작업 후 DB 커넥트 끊는다
// 각 테스트 케이스마다 DB connent, disconnect할 필요 없기 때문에 beforeAll, afterAll 이용
// beforeAll(async () => {
//   user = await fn.connectUserDb();
// });
// afterAll(() => {
//   return fn.disconnectUserDb();
// });

// test('이름은 Mike', () => {
//   expect(user.name).toBe('Mike');
// });

// test('나이는 30', () => {
//   expect(user.age).toBe(30);
// });

// test('성별은 남자', () => {
//   expect(user.gender).toBe('male');
// });

// // 유사한 작업 descirbe
// describe('Car 관련 작업', () => {
//   let car;

//   beforeAll(async () => {
//     car = await fn.connectCarDb();
//   });
//   afterAll(() => {
//     return fn.disconnectCarDb();
//   });

//   test('브랜드는 벤츠', () => {
//     expect(car.brand).toBe('Benz');
//   });

//   test('차종은 GLA', () => {
//     expect(car.name).toBe('GLA');
//   });

//   test('색은 검은색', () => {
//     expect(car.color).toBe('black');
//   });
// });

// 실행 순서
//밖 beforeEach, after는 describe 안 테스트에도 영향
//밖 beforeEach는 describe 안 beforeEach보다 먼저
//밖 afterEach는 describe 안 afterEach보다 나중
// beforeAll(() => console.log('밖 beforeAll')); // 1
// beforeEach(() => console.log('밖 beforeEach')); //2, 6
// afterEach(() => console.log('밖 afterEach')); //4, 10
// afterAll(() => console.log('밖 afterAll')); // 마지막

// test('0 + 1 = 1', () => {
//   console.log('밖 test');
//   expect(fn.add(0, 1)).toBe(1); //3
// });

// describe('describe 작업', () => {
//   beforeAll(() => console.log('안 beforeAll')); //5
//   beforeEach(() => console.log('안 beforeEach')); //7
//   afterEach(() => console.log('안 afterEach')); //9
//   afterAll(() => console.log('안 afterAll')); //마지막에서 두 번째

//   test('0 + 1 = 1', () => {
//     console.log('안 test');
//     expect(fn.add(0, 1)).toBe(1); //8
//   });
// });

// test 케이스 내, 외부 원인 찾기
// test.only로 다른 케이스 스킵
// test.skip 해당 케이스 스킵
// test.only 가 통과 -> 그 코드에느 문제 없다 -> 외부 문제
let num = 0;

test('0 더하기 1은 1', () => {
  expect(fn.add(num, 1)).toBe(1);
});

test('0 더하기 2은 2', () => {
  expect(fn.add(num, 2)).toBe(2);
});

// 얘 스킵해서 성공 -> 얘가 문제임
test.skip('0 더하기 3은 3', () => {
  expect(fn.add(num, 3)).toBe(3);
  num = 10;
});

//test.only로 여기에 문제 없음을 확인
test('0 더하기 4은 4', () => {
  expect(fn.add(num, 4)).toBe(4);
});
