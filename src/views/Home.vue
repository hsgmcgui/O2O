<template>
  <div class="home">
    <div class="home-son">
      <router-view />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="$router.push('/home')"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" @click="$router.push('/order')"
        >订单</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" @click="$router.push('/my')"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      // 通过 `vm` 访问组件实例
    //   console.log((vm.active = to.name));
      if (to.name == "Index") {
        vm.active = 0;
      }
      if (to.name == "Order") {
        vm.active = 1;
      }
      if (to.name == "My") {
        vm.active = 2;
      }
    });
  },
};
</script>

<style scoped lang="less">
.home {
  .home-son {
    padding-bottom: 50px;
  }
}
</style>