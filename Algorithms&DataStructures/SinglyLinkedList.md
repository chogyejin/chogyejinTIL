# Singly Linked List

- 연결 리스트
  - `node`로 이루어져 있고, 각 node는 `value`와 `pointer`가 있다.
  - `head`, `tail`, `length`를 가지고 있는 자료 구조
    - index가 따로 없기 때문에 head부터 추적해야 함
- 단일 연결 리스트
  - `push(val)`, `pop()`, `shift()`, `unshift(val)`, `get(idx)`, `set(idx, val)`, `insert(idx, val)`, `remove(idx)`, `reverse()`
  - 맨앞 삽입/삭제, 맨뒤 삽입: O(1), 맨뒤 삭제: O(n), 탐색: O(n), 접근: O(n)

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

  get(idx) {
    if (idx < 0 || idx >= this.length) {
      return null;
    }
    let node = this.head;
    let count = 0;
    while (count < idx) {
      node = node.next;
      count += 1;
    }
    return node;
  }

  set(idx, val) {
    const node = this.get(idx);
    if (!node) {
      return false;
    }
    node.val = val;
    return true;
  }

  insert(idx, val) {
    // 길이 0일 땐 unshift, length와 같다면 push
    if (idx < 0 || idx > this.length) {
      return false;
    }
    // boolean 반환형을 강제 시켜 성공 시 true를 반환
    if (idx === 0) {
      return !!this.unshift(val);
    }
    if (idx === this.length) {
      return !!this.push(val);
    }

    const prevNode = this.get(idx - 1);
    const newNode = new Node(val);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length += 1;
    return true;
  }

  remove(idx) {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }
    if (idx === 0) {
      return this.shift();
    }
    if (idx === this.length - 1) {
      return this.pop();
    }

    const prevNode = this.get(idx - 1);
    const removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    this.length -= 1;
    return removedNode;
  }

  reverse() {
    // swap head and tail
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      // 방향 역으로 바꾸기
      next = node.next; // node의 시작은 바뀌기 전 head
      node.next = prev; // prev의 초기값은 null, tail의 next는 null이 된다.
      // 한 칸씩 전진
      prev = node;
      node = next;
    }
    return this;
  }
}
```
