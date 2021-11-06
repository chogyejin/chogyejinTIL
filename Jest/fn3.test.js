const fn = require('./fn');

// // 비동기 함수 테스트 : done이라는 콜백함수 이용
test('3초 후에 getName으로 Mike 받음?', (done) => {
  function callback(name) {
    expect(name).toBe('Mike');
    done();
  }
  fn.getName(callback);
});

// // API 호출 try - catch
test('3초 후에 getName으로 Mike 받음?', (done) => {
  function callback(name) {
    try {
      expect(name).toBe('Mike');
      done();
    } catch (error) {
      done();
    }
  }
  fn.getName2(callback);
});

// Promise 이용 : done 사용 x, return 필요
test('3초 후에 받아올 나이는 30임', () => {
  //   1. return fn.getAge().then((age) => {
  //     expect(age).toBe(30);
  //   });
  // 2. resolves Matcher 이용(rej는 rejects)
  return expect(fn.getAge(30)).resolves.toBe(30);
  //return expect(fn.getAge(30)).rejects.toMatch("error");
});

// async await
test('3초 후에 받아올 나이는 30임 두 번째', async () => {
  //   const age = await fn.getAge();
  //   expect(age).toBe(30);
  await expect(fn.getAge(30)).resolves.toBe(30);
});
