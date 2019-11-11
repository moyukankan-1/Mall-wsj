<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/navbar"
  import cartList from "./childComps/cartList";
  import cartBottomBar from "./childComps/cartBottomBar";
  import {mapGetters} from "vuex"

  export default {
    name: "cart",
    components: {
      NavBar,
      cartList,
      cartBottomBar
    },
    computed: {
      ...mapGetters({
        length: "cartLength"
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
