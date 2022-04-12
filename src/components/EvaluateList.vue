<template>
  <li class="evaluate-list">
    <div class="evaluate-list-son">
      <div class="left">
        <img :src="item.userPicUrl" alt="" v-if="item.userPicUrl" />
        <img src="../assets/signin/signin.png" alt="" v-else>
      </div>
      <div class="right">
          <div class="right-header">
              {{item.userName}}
          </div>
          <div class="content">
              {{item.content}}
          </div>
          <div class="time">
              <div>{{item.deliveryTime}}</div>
              <div>{{item.commentTime}}</div>
          </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  created() {},
};
</script>

<style scoped lang="less">
.evaluate-list {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .evaluate-list-son {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ddd;
    .left {
      width: 40px;
      height: 40px;
      img {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .right{
        width: 100%;
        margin-left: 8px;
        .right-header{
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 600;
        }
        .content{
            line-height: 20px;
            font-size: 14px;
        }
        .time{
            display: flex;
            color: #666;
            font-size: 12px;
            line-height: 30px;
            position: relative;
            div:nth-child(2){
                // float: right;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
  }
}
</style>