<template>
  <div class="header">
      <Location />
      <Search />
  </div>
</template>

<script>
import Location from '@/components/Location.vue'
import Search from '@/components/Search.vue'
export default {
    components: {
        Location,
        Search
    }
}
</script>

<style scoped lang="less">
    .header{
        background-color: #1C1B20;
        padding: 10px 5px;
    }
</style>