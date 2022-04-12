<template>
  <div class="order">
      <ul class="order-son" v-if="lishi.length">
        <HistoryList v-for="(item,index) in lishi" :key="index" :item="item" :i="index" @delList="delLishi" />
      </ul>

      <div class="lishi" v-else>
        暂无历史订单~
      </div>
  </div>
</template>

<script>


import HistoryList from '@/components/HistoryList.vue'

export default {
  data(){
    return {
      lishi: []
    }
  },
  components: {
    HistoryList
  },
  created() {
    // console.log(JSON.parse(window.localStorage.getItem("key")));
    this.lishi = JSON.parse(window.localStorage.getItem("key"));
    // console.log(this.lishi)
    console.log(this.lishi)
  },
  methods: {
    delLishi: function(e){
      this.lishi.splice(e,1);
      console.log(this.lishi)
      window.localStorage.setItem("key",JSON.stringify(this.lishi))
    }
  },
}
</script>

<style scoped lang="less">
  .order{
    width: 100%;
    padding-bottom: 50px;
    .order-son{
      width: 100%;
      // padding: 0 15px;
      background-color: #ddd;
      box-sizing: border-box;
    }
    .lishi{
      width: 100%;
      height: 50px;
      color: #000;
      text-align: center;
      line-height: 50px;
      background-color: rgb(126, 125, 125);
    }
  }
</style>