export default {
  //mutations尽可能完成比较单一的事件
  addCounter(state,payLoad) {
    payLoad.count++
  },
  addToCart(state,payLoad) {
    state.cartList.push(payLoad)
  }
}
