const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age, gender: undefined }),
  throwError: () => {
    throw new Error('에러임');
  },
  getName: (callback) => {
    const name = 'Mike';
    setTimeout(() => {
      callback(name); // 3초 후에 callback() 함수에 name을 첫번째 인수로 넘겨줌
    }, 3000);
  },
  getName2: (callback) => {
    const name = 'Mike';
    setTimeout(() => {
      throw new Error('에러임');
    }, 3000);
  },
  getAge: () => {
    const age = 30;
    return new Promise((res, rej) => {
      //프로미스를 넘기면 jest는 rej까지 기다림
      setTimeout(() => {
        res(age);
        //rej('error');
      }, 3000);
    });
  },
  connectUserDb: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          name: 'Mike',
          age: 30,
          gender: 'male',
        });
      }, 500); // 0.5초 정도 걸리는 작업이라 가정
    });
  },
  disconnectUserDb: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 500); // 0.5초 정도 걸리는 작업이라 가정
    });
  },
  connectCarDb: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          brand: 'Benz',
          name: 'GLA',
          color: 'black',
        });
      }, 500); // 0.5초 정도 걸리는 작업이라 가정
    });
  },
  disconnectCarDb: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 500); // 0.5초 정도 걸리는 작업이라 가정
    });
  },
};

module.exports = fn;
