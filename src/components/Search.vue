<template>
  <div class="search" @click="$router.push('/search')">
      <van-search v-model="value" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
export default {
    data() {
        return {
          value: '',
        };
  },
}
</script>

<style scoped lang="less">
    
</style>