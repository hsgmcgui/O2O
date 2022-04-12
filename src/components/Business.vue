<template>
  <div class="business">
      <ul >
          <BusinessList v-for="(item,index) in shopList" :key="index" :item="item" />
      </ul>
  </div>
</template>

<script>

import BusinessList from '@/components/BusinessList.vue'

export default {
    props: ["shopList"],
    components: {
        BusinessList
    }
}
</script>

<style>

</style>