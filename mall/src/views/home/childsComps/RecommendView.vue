<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    padding: 15px 0 25px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
  }
</style>
