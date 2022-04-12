<template>
  <li class="list-item" v-if="lists">
    <van-card
      :price="lists.min_price"
      :desc="lists.description"
      :title="lists.name"
      :thumb="lists.picture"
    >
      <template #tags v-if="lists.promotion_info">
        <van-tag plain type="danger">{{ lists.promotion_info }}</van-tag>
      </template>
    </van-card>

    <div class="yue">
      {{ lists.month_saled_content }}
    </div>
    <div class="btn">
      <ul>
        <li @click="$emit('del', index)">
          <img src="../assets/signin/jian.png" alt="" />
        </li>
        <li>{{ lists.mport_sell_status }}</li>
        <li @click="$emit('add', index)">
          <img src="../assets/signin/jia.png" alt="" />
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: ["lists", "index"],
  data() {
    return {
      // num: 0
    };
  },
  created() {
    // price =
  },
  methods: {
    ddd: function () {
      console.log(111);
    },
  },
};
</script>

<style scoped lang="less">
.list-item {
  position: relative;
  .van-card {
    background-color: white;
    border-bottom: 1px solid #ddd;
    .van-card__title {
      color: #333333;
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .van-tag {
      max-width: 40px;
      overflow: hidden;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .van-card__bottom {
      .van-card__price {
        color: red;
      }
    }
  }
  .yue {
    color: #666;
    font-size: 12px;
    // background-color: pink;
    width: calc(100vw - 200px);
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 112px;
    bottom: 28px;
  }
  .btn {
    //   width: 50px;
    position: absolute;
    right: 0;
    bottom: 0;
    ul {
      display: flex;
      li {
        img {
          width: 25px;
          height: 25px;
          vertical-align: middle;
        }
      }
      li:nth-child(2) {
        text-align: center;
        width: 30px;
      }
    }
  }
}
</style>