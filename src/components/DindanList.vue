<template>
  <li class="dindan-list">
    <ul class="dindan-list-son">
      <li class="left">
        <div>{{ item.name }}</div>
        <div>{{ item.description }}</div>
      </li>
      <li class="center">
        ￥{{ (item.min_price * item.mport_sell_status) | formatPlayCountWan }}
      </li>
      <li class="right">
        <ul>
          <li @click="$emit('delDindan', index)">
            <img src="../assets/signin/jian.png" alt="" />
          </li>
          <li>{{ item.mport_sell_status }}</li>
          <li @click="$emit('addDindan', index)">
            <img src="../assets/signin/jia.png" alt="" />
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ["item", "index"],
  created() {
    // console.log(this.item);
  },
  filters: {
    formatPlayCountWan: function (value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style scoped lang="less">
.dindan-list {
  width: 100%;
  .dindan-list-son {
    width: 100%;
    // height: 50px;
    // line-height: 50px;
    display: flex;
    & > li {
      flex: 1;
      //   text-align: center;
      // height: 50px;
      line-height: 50px;
      height: 50px;
      border-bottom: 1px solid #ddd;
    }
    .left {
      div {
        height: 25px;
        line-height: 25px;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      div:nth-child(1) {
        font-size: 16px;
      }
      div:nth-child(2) {
        font-size: 12px;
        color: #666;
      }
    }
    .center {
      text-align: center;
      // line-height: 50px;
      color: red;
    }
    .right {
      // line-height: 50px;
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
}
</style>