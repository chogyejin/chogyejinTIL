# Singly Linked List

- 연결 리스트
  - `node`로 이루어져 있고, 각 node는 `value`와 `pointer`가 있다.
  - `head`, `tail`, `length`를 가지고 있는 자료 구조
    - index가 따로 없기 때문에 head부터 추적해야 함
- 단일 연결 리스트
  - `push(val)`, `pop()`, `shift()`, `unshift(val)`, `get()`, `set()`, `insert()`, `remove()`, `reverse()`

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);
    // list가 아예 비어있을 때
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node; // tail의 next를 새 node를 가리키게
      this.tail = node; // tail이 새 node가 되게
    }
    this.length += 1;
    return this;
  }

  pop() {
    if (!this.head) {
      return undefined;
    }
    // 초기 포인터 설정
    let current = this.head;
    let newTail = this.head;

    // current는 맨끝, newTail은 그 앞
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail; // 새 tail 할당
    this.tail.next = null; // 연결 끊기
    this.length -= 1;

    // 리스트 비면 초기화
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) {
      return undefined;
    }
    const current = this.head;
    this.head = current.next;
    this.length -= 1;
    if (this.length === 0) {
      this.tail = null;
    }
    return current;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length += 1;
    return this;
  }
}
```
