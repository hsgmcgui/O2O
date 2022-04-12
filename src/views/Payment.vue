<template>
  <div class="payment">
    <van-nav-bar
      title="提交订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="biaodan">
      <div class="biaodan-son">
        <div class="header">
          <div class="icon">
            <img :src="poi_info.pic_url" alt="" />
          </div>
          <div class="name">
            {{ poi_info.name }}
          </div>
        </div>
        <ul class="list">
          <li v-for="(item, index) in totalPrice" :key="index">
            <van-card
              :num="item.mport_sell_status"
              :price="item.mport_sell_status * item.min_price"
              :desc="item.description"
              :title="item.name"
              :thumb="item.picture"
            />
          </li>
        </ul>
        <div class="peisong">
          <div>配送费</div>
          <div>￥{{ poi_info.shipping_fee }}</div>
        </div>
      </div>
      <div class="heji">
        <div>
          <span>合计：</span>
          <span style="color: red">￥{{ price }}</span>
        </div>
      </div>
    </div>
    <div class="tijiao">
      <div @click="zhifu">立即支付</div>
    </div>

    <div class="zhifu" v-if="flagFu">
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        :error-info="errorInfo"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="
          showKeyboard = false;
          flagFu = false;
        "
      />
    </div>

    <div class="wancheng" v-if="zhifuwancheng">
      <div class="wancheng-son">
        <div class="header">
          <div>支付完成</div>
          <div>￥{{ price }}</div>
        </div>
        <div class="wan" @click="$router.push('/order')">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poi_info: {},
      totalPrice: [],
      price: 0,
      value: "",
      showKeyboard: true,
      flagFu: false,
      zhifuwancheng: false,
      localStorageData: []
    };
  },
  created() {
    this.poi_info = this.$route.query.poi_info;
    this.totalPrice = this.$route.query.totalPrice;
    this.price = this.$route.query.price;
    // console.log(this.poi_info);
    // console.log(this.totalPrice);
    // console.log(this.price);
  },
  methods: {
    zhifu: function () {
      this.flagFu = true;
    },
    getTime: function () {
      let date = new Date();
      // console.log(date)
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      // console.log(year,month,day)
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      // return
      // console.log(year + "-" + month + "-" + day)
      return year + "-" + month + "-" + day;
    },
  },
  watch: {
    value(value) {
      if (value.length === 6 && value !== "123456") {
        this.errorInfo = "密码错误";
      } else if (value === "123456") {
        //   value !== '123456'
        this.flagFu = false;
        this.value = "";
        let data = {
          poi_info: this.poi_info,
          totalPrice: this.totalPrice,
          price: this.price,
          time: this.getTime(),
        };
        if (JSON.parse(window.localStorage.getItem("key"))) {
          this.localStorageData = JSON.parse(window.localStorage.getItem("key"));
        }
        this.localStorageData.push(data);
        window.localStorage.setItem("key",JSON.stringify(this.localStorageData));
        this.zhifuwancheng = true;
      } else {
        this.errorInfo = "";
      }
    },
  },
};
</script>

<style scoped lang="less">
.payment {
  width: 100%;
  .biaodan {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .biaodan-son {
      width: 100%;
      border-bottom: 1px solid #ddd;
      .header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        .icon {
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-radius: 50%;
          }
        }
        .name {
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
      .peisong {
        width: 100%;
        height: 30px;
        line-height: 30px;
        //   display: flex;
        position: relative;
        div:nth-child(2) {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .heji {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
  }
  .tijiao {
    width: 100%;
    div {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: red;
      color: white;
      border-radius: 20px;
      margin: 0 auto;
    }
  }
  .zhifu {
    z-index: 10;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    .van-password-input {
      margin: 200px 0 0 0;
    }
  }
  .wancheng {
    z-index: 10;
    width: 100vw;
    height: 100%;
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    transition: all 1s;
    .wancheng-son {
      width: 100%;
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      .header {
        width: 150px;
        height: 100px;
        text-align: center;
        // line-height: 100px;
        // background-color: pink;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        div:nth-child(1) {
          color: green;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        div:nth-child(2) {
          font-size: 24px;
          font-weight: 700;
        }
      }
      .wan {
        width: 200px;
        height: 30px;
        background-color: #ddd;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        position: absolute;
        left: 50%;
        bottom: 50px;
        // margin: 0 auto;
        transform: translateX(-50%);
        color: green;
        font-weight: 600;
      }
    }
  }
}
</style>