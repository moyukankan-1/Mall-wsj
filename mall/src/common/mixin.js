import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
   return {
      itemImgListener: null
   }
  },
  mounted() {
    //监听item中图片加载完成
    let refresh = debounce(this.$refs.scroll.refresh,200)
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on("itemImgLoad",this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    demo(position) {
      this.isShow = -position.y > 1000
    }
  }
}
