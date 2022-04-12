<template>
  <div class="index">
    <Header />
    <div class="index-son">
      <Menu :konglongList="konglongList" />
      <div class="fujin">附近商家</div>
      <Business :shopList="shopList" />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Business from '@/components/Business.vue'

export default {
  data() {
    return {
      konglongList: [],
      shopList: []
    }
  },
  components: {
    Menu,
    Header,
    Business
  },
  created() {
    this.axios.get("api/kongling").then((response) => {
      // console.log(response)
      this.konglongList = response.data;
    });
    this.axios.get("api/shopList").then((response) => {
      console.log(response)
      this.shopList = response.data;
      console.log(this.shopList)
    });
  },
}
</script>

<style scoped lang="less">
  .index{
    .index-son{
      padding: 0 10px;
      .fujin{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
      }
    }
  }
</style>