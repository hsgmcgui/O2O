<template>
  <div class="my">
    <div class="header">
      <ul>
        <li>
          <img src="../assets/signin/touxiang.png" alt="" />
        </li>
        <li>111111</li>
      </ul>
    </div>

    <div class="section">
      <ul class="lists">
        <li>
          <div><img src="../assets/signin/shouhuo.png" alt="" /></div>
          <div>收货地址</div>
        </li>
        <li @click="flag = true">
          <div><img src="../assets/signin/tuichu.png" alt="" /></div>
          <div>退出登录</div>
        </li>
      </ul>

      <div class="tanchuang" v-if="flag">
        <div class="tanchuang-son">
          <div>确定退出登录吗？</div>
          <ul>
            <li @click="$router.push('/');flag = false">确定</li>
            <li class="active" @click="flag = false">取消</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  data(){
    return {
      flag: false
    }
  },
  computed: {
    // ...mapState(["username"]),
  },
  created() {},
};
</script>

<style scoped lang="less">
.my {
  width: 100%;
  .header {
    width: 100%;
    height: 150px;
    background: url("../assets/signin/beijin.png") no-repeat;
    background-size: cover;
    ul {
      // margin: 0 auto;
      border-top: 0.1px solid transparent;
      text-align: center;
      li:nth-child(1) {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 20px auto;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  .section {
    width: 100%;
    .lists {
      width: 100%;
      li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        position: relative;
        left: 0;
        top: 0;
        div:nth-child(1) {
          margin-right: 10px;
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
        }
        &::before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          border: 2px solid transparent;
          border-left-color: #666;
          border-top-color: #666;
          transform: rotate(135deg);
          position: absolute;
          right: 15px;
          top: 15px;
        }
      }
    }
    .tanchuang{
      width: 100%;
      height: 100vh;
      background-color: rgba(0,0,0,0.4);
      position: fixed;
      left: 0;
      top: 0;
      .tanchuang-son{
        width: 90%;
        background-color: white;
        margin: 160px auto;
        border-radius: 10px;
        div{
          width: 100%;
          height: 80px;
          border-bottom: 1px solid #ddd;
          text-align: center;
          line-height: 80px;
        }
        ul{
          width: 100%;
          height: 50px;
          display: flex;
          li{
            flex: 1;
            text-align: center;
            line-height: 50px;
          }
          li:nth-child(1){
            border-right: 1px solid #ddd;
          }
          .active{
            color: #ffaf00;
          }
        }
      }
    }
  }
}
</style>