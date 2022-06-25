// 1. Write a Stack class that simulates the structure and methods of the stack
//    Write a Queue class to simulate the structure and methods of the queue

class Stack {
  constructor() {
    this.item = [];
  }
  //LIFO
  //add element to top of stack
  push(element) {
    this.item.push(element);
  }

  //return top element
  pop() {
    if (!this.isEmpty) {
      return this.item.pop();
    }
    //stack empty
    return undefined;
  }

  //return value top element of stack
  peek() {
    if (!this.isEmpty) {
      return this.item[this.item.length - 1];
    }
    return undefined;
  }

  //check stack is empty
  isEmpty() {
    return this.item.length === 0;
  }
}

// Queue
class Queue {
  constructor() {
    this.item = [];
  }
  //FIFO
  //Add element to the end of the queue.
  enqueue(element) {
    this.item.push(element);
  }

  //Remove element front of the queue
  dequeue() {
    if (!this.isEmpty) {
      return this.item.shift();
    }
  }

  peek() {
    if (!this.isEmpty) {
      return this.item[0];
    }
    return undefined;
  }

  isEmpty() {
    return this.item.length === 0;
  }
}
