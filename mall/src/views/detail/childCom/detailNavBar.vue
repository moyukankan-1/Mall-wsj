<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" class="title-item" :class="{active: currentIndex === index }" @click="titleClick(index)">{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/navbar"
  export default {
    name: "detailNavBar",
    components: {
      Navbar
    },
    data() {
      return {
        title: ["商品","参数","评论","推荐"],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit("titleClick",index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .back {
    margin-top: 7px;
  }
</style>
