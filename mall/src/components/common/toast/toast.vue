<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data() {
      return {
        message: "",
        isShow: false
      }
    },
    methods: {
      show(message,duration) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ""
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    background: rgba(0,0,0,.7);
    padding: 10px;
    z-index: 999;
  }
</style>
