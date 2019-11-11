<template>
  <div class="goodsItem" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit("itemImgLoad")
      },
      itemClick() {
        this.$router.push("/detail/"+ this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goodsItem {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .goodsItem img {
    width: 100%;
    border-radius: 5px;
  }
  .goodsInfo {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    text-align: center;
  }
  .goodsInfo p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .goodsInfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodsInfo .collect {
    position: relative;
  }
  .goodsInfo .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
