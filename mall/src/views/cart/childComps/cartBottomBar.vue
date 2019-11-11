<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-active="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="buy-product">
      去结算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import checkButton from "components/content/checkButton/checkButton";

  export default {
    name: "cartBottomBar",
    components: {
      checkButton
    },
    computed: {
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) {
          return false
        }
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        //找到后就不执行了，比上面的效率高
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    display: flex;
    width:100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .1);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
  }

  .bottom-menu .select-all {
    position: absolute;
    height: 20px;
    left: 12px;
    top: 13px;
    line-height: 20px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    margin-left: 110px;
  }
</style>
