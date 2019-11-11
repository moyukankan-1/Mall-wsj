<template>
  <div class="detail">
    <detail-nav-bar class="detail-content" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shops"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import detailNavBar from "./childCom/detailNavBar";
  import detailSwiper from "./childCom/detailSwiper";
  import detailBaseInfo from "./childCom/detailBaseInfo";
  import detailShopInfo from "./childCom/detailShopInfo";
  import detailGoodsInfo from "./childCom/detailGoodsInfo";
  import detailParamInfo from "./childCom/detailParamInfo";
  import detailCommentInfo from "./childCom/detailCommentInfo";
  import detailBottomBar from "./childCom/detailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "common/utils"
  import {itemListenerMixin,backTopMixin} from "common/mixin"

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import BackTop from "components/content/backTop/BackTop";

  import {mapActions} from "vuex"


  export default {
    name: "detail",
    components: {
      BackTop,
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      detailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: {},
        themeTopY: [],
        currentIndex: 0
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //获取顶部的图片轮播
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //创建店铺信息
        this.shops = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    mounted() {

    },
    methods: {
      ...mapActions(["addCart"]),
      imgLoad() {
        this.$refs.scroll.refresh()

        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
      },
      contentScroll(position) {
        const positionY = -position.y

        let length = this.themeTopY.length
        for(let i=1; i<length; i++) {
          if(this.currentIndex !== i && ((i< length-1 && positionY > this.themeTopY[i] && positionY <
        this.themeTopY[i+1]) || (i === length-1 && positionY > this.themeTopY[i]))) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }
        //混合调用向上按钮
        this.demo(position)
      },
      addToCart() {
        //获取购物车要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.checked = true

        this.addCart(product).then(res => {
          this.$toast.show(res,1500)
        })
      }
    },
    destroyed() {
      this.$bus.$off("itemImgLoad",this.itemImgListener)
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .detail-content {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
