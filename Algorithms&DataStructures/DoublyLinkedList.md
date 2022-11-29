# Doubly Linked List

- 이중 연결 리스트
  - 단일 연결 리스트에 이전 노드를 가리키는 포인터가 추가됨 => 메모리 사용량 많아짐
  - `push(val)`, `pop()`

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length += 1;
    return this;
  }

  // 맨앞부터 tail의 앞 노드를 찾을 필요 없이 prev 포인터 이용
  pop() {
    if (!this.head) {
      return undefined;
    }

    const removedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removedNode.prev;
      this.tail.next = null;
      removedNode.prev = null; // 기존 tail의 prev 비워줌
    }
    this.length -= 1;
    return removedNode;
  }
}
```
