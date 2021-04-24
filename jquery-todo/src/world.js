export default class World {
  message

  constructor(message) {
    this.message = message
  }

  sayHello(elem) {
    if (elem) {
      elem.innerText = this.message
    }
  }
}