<template>
  <li class="business-list" @click="$router.push('/seller/' + item._id)">
    <van-card :title="item.shopName" :thumb="item.picUrl"> </van-card>
    <div class="information">
      <div class="haoping">
        <div class="xinxin">
          <ul>
            <li v-for="(item, index) in 5" :key="index"></li>
          </ul>
          <div class="pinfen">{{item.wmPoiScore | formatPlayCountWan}}</div>
          <div class="yueshou">{{item.monthSalesTip}}</div>
        </div>
      </div>

      <div class="peisong">
        <span>{{item.minPriceTip}}</span>
        <span>{{item.shippingFeeTip}}</span>
        <span>{{item.averagePriceTip}}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  filters: {
    formatPlayCountWan: function (value) {
      return value/10
    },
  },
};
</script>

<style scoped lang="less">
.business-list {
  margin: 10px 0 25px 0;
  position: relative;
  .van-card {
    padding: 8px 0;
    background-color: white;
    border-bottom: 1px solid #ddd;
    .van-card__header {
      .van-card__thumb {
        width: 76px;
        height: 57px;
      }
      .van-card__title {
        width: 80%;
        font-size: 16px;
        color: #333;
        font-weight: 600;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }
  .information {
    width: calc(100vw - 104px);
    // background-color: pink;
    position: absolute;
    right: 0;
    top: 30px;
    .haoping {
      .xinxin {
        display: flex;
        font-size: 14px;
        color: #333;
        ul {
          display: flex;
          margin-top: 5px;
          li {
            width: 14px;
            height: 13px;
            background: url("../assets/signin/xin.png") no-repeat;
            background-position: -2px -3px;
            background-size: cover;
          }
        }
        .pinfen{
          color: #FF4B10;
          line-height: 19.2px;
          margin-right: 5px;
        }
        .yueshou{
          color: #666;
          font-size: 12px;
          line-height: 19.2px;
        }
      }
    }
    .peisong{
      color: #666;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      span{
        margin-right: 5px;
      }
    }
  }
}
</style>