<template>
  <div class="search">
    <van-search v-model="value" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div style="padding: 10px;">
        <Business :shopList="shopList" />
    </div>
  </div>
</template>

<script>

import Business from '@/components/Business.vue'
export default {
  data() {
    return {
      value: "",
      shopList: []
    };
  },
  components: {
      Business
  },
  methods: {
    onSearch: function () {
      // console.log(this.value)
      if(this.value == ''){
        this.shopList = [];
        return;
      }
      this.axios({
        url: "api/search",
        method: "post",
        data: {
          value: this.value
        },
        transformRequest: [
          function (data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        // console.log(res)
        this.shopList = res.data;
      });
    },
  },
};
</script>

<style>
</style>