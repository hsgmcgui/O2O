<template>
  <div class="delicacy">
    <van-nav-bar
      :title="name"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <ul>
      <BusinessList
        v-for="(item, index) in shopList"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
import BusinessList from "@/components/BusinessList.vue";

export default {
  data() {
    return {
      shopList: [],
      index: 0,
      name: 0,
    };
  },
  components: {
    BusinessList,
  },
  created() {
    this.index = this.$route.query.index;
    this.name = this.$route.query.name;
    if(this.index == 0){
      this.axios.get("api/zhuanshopList").then((response) => {
        console.log(response);
        this.shopList = response.data;
        console.log(this.shopList);
      });
    }
    if(this.index == 1){
      this.axios.get("api/caoshopList").then((response) => {
        console.log(response);
        this.shopList = response.data;
        console.log(this.shopList);
      });
    }
    if (this.index == 2) {
      this.axios.get("api/shengshopList").then((response) => {
        console.log(response);
        this.shopList = response.data;
        console.log(this.shopList);
      });
    }
    if (this.index == 3) {
      this.axios.get("api/shopList").then((response) => {
        console.log(response);
        this.shopList = response.data;
        console.log(this.shopList);
      });
    }
  },
};
</script>

<style scoped lang="less">
.delicacy {
  ul {
    padding: 50px 10px 0 10px;
  }
  .van-nav-bar {
    width: 100%;
    background-color: rgb(238, 238, 10);
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>