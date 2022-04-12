<template>
  <li class="history" v-if="item">
    <div class="header" @click="$router.push('/seller/'+poi_info._id)">
      <div class="left">
        <img :src="poi_info.pic_url" alt="" />
      </div>
      <div class="right">
        {{ poi_info.name }}
      </div>
    </div>

    <div class="center">
      <ul class="center-son">
        <li v-for="(list, index) in totalPrice" :key="index">
          <span>{{ list.name }}</span>
          <span>x{{ list.mport_sell_status }}</span>
        </li>
      </ul>
      <div class="price">
          <div>{{item.time}}</div>
          <div>实付￥{{item.price}}</div>
          <div @click="$router.push({path: '/comment' , query: {name: poi_info.name,id: poi_info._id}})">评价</div>
      </div>
    </div>

    <div class="bottom">
      <div>已完成</div>
      <div @click="$emit('delList',i)">删除</div>
      <div @click="$router.push('/seller/'+poi_info.seller_id)">再来一单</div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item","i"],
  data() {
    return {
      poi_info: {},
      totalPrice: [],
    };
  },
  created() {
    console.log(this.item);
    this.poi_info = this.item.poi_info;
    this.totalPrice = this.item.totalPrice;
  },
};
</script>

<style scoped lang="less">
.history {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
  background-color: white;
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    border-bottom: 1px solid #ddd;
    .left {
      width: 35px;
      height: 35px;
      // flex: 1;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .right {
      flex: 1;
      margin-left: 5px;
      position: relative;
      left: 0;
      top: 0;
      &::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border: 2px solid transparent;
        border-right-color: rgb(126, 123, 123);
        border-top-color: rgb(126, 123, 123);
        position: absolute;
        right: 0;
        top: 15px;
        transform: rotate(45deg);
      }
    }
  }
  .center {
    width: 100%;
    border-bottom: 1px solid #ddd;
    .center-son {
      li {
        width: 100%;
        height: 30px;
        line-height: 30px;
        position: relative;

        span {
          display: block;
          position: absolute;
          top: 0;
        }
        span:nth-child(1) {
          width: 80%;
          left: 0;
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        span:nth-child(2) {
          width: 20%;
          right: 0;
          text-align: center;
        }
      }
    }
    .price{
        width: 100%;
        height: 60px;
        position: relative;
        div:nth-child(1){
          position: absolute;
          left: 0;
          top: 15px;
        }
        div:nth-child(2),div:nth-child(3){
            height: 40px;
            line-height: 40px;
            position: absolute;
            right: 0;
            top: 0;
        }
        div:nth-child(3){
          top: 30px;
          width: 50px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border: 1px solid #000;
        }
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    line-height: 50px;
    //   display: flex;
    position: relative;
    left: 0;
    top: 0;
    div {
        position: absolute;
    }
    div:nth-child(1){
        color: #9b9494;
        left: 0;
    }
    div:nth-child(2){
        right: 100px;
        top: 8px;
        width: 35px;
        height: 30;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ddd;
    }
    div:nth-child(3){
        right: 0;
        top: 8px;
        width: 90px;
        height: 30;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ddd;
        background-color: yellow;
    }
  }
}
</style>