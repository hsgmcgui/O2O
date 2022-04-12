<template>
  <div class="menu">
    <van-grid square icon-size="50">
      <van-grid-item
        v-for="(item,index) in konglongList.slice(0,8)"
        :key="index"
        :icon="item.icon"
        :text="item.name"
        @click="tiaozhuan(index,item.name)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["konglongList"],
  created() {
    console.log(this.konglongList);
  },
  methods: {
    tiaozhuan: function(index,name){
      // console.log(index)
      // if(index == 3){
        this.$router.push({path: '/delicacy',query: {index: index,name: name}})
      // }
    }
  },
};
</script>

<style scoped lang="less">
  .menu{
    margin-top: 15px;
    // padding: 0 10px;
  }
</style>