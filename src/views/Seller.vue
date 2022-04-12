<template>
  <div class="seller">
    <div class="header">
      <div class="fanhui" @click="$router.back()">
        <div></div>
      </div>
      <div class="dian" v-if="poi_info">
        <van-card
          :desc="poi_info.bulletin"
          :title="poi_info.name"
          :thumb="poi_info.pic_url"
        >
          <template #tags>
            <van-tag plain type="danger">{{ poi_info.min_price_tip }}</van-tag>
          </template>
        </van-card>
      </div>
    </div>

    <div class="cenetr" v-if="food_spu_tags && evaluate_list">
      <ul class="center-son">
        <li :class="{ active2: nav_flag }" @click="nav_flag = true">
          点餐
          <span :class="{ active1: nav_flag }"></span>
        </li>
        <li :class="{ active2: !nav_flag }" @click="nav_flag = !nav_flag">
          评价
          <span :class="{ active1: !nav_flag }"></span>
        </li>
      </ul>

      <div class="nav-neirong" v-if="nav_flag">
        <div class="left">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              v-for="(item, index) in food_spu_tags"
              :key="index"
              :title="item.name"
            />
          </van-sidebar>
        </div>

        <ul class="right" v-if="food_spu_tags[activeKey]">
          <ListItem
            v-for="(lists, index) in food_spu_tags[activeKey].spus"
            :key="index"
            :lists="lists"
            :index="index"
            @add="addStatus"
            @del="delStatus"
          />
        </ul>

        <div class="bottom">
          <div class="bottom-son">
            <div class="dindan" v-if="falg && totalPrice.length">
              <div class="delete">
                <div class="qinkong">
                  <div @click="clear">清空购物车</div>
                </div>
                <ul class="list">
                  <DindanList
                    v-for="(item, index) in totalPrice"
                    :key="index"
                    :index="index"
                    :item="item"
                    @delDindan="delDindanStatus"
                    @addDindan="addDindanStatus"
                  />
                </ul>
              </div>
            </div>

            <div class="price">
              <div class="heji" @click="getFalg">
                <span>合计：</span>
                <span>￥{{ price | formatPlayCountWan }}</span>
              </div>
              <div class="tijiao" @click="jiesuan">提交订单</div>
            </div>
          </div>
        </div>
      </div>

      <div class="zezaoTijiao" v-if="zezaoTijiao">
        <div>下单成功~</div>
      </div>

      <div class="evaluate" v-if="!nav_flag">
        <ul>
          <EvaluateList
            v-for="(item, index) in evaluate_list"
            :key="index"
            :item="item"
          />
        </ul>
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #ddd;
          "
        >
          没有更多评论了
        </div>
      </div>
    </div>
    <div class="zezao" v-if="flag_price">
      <div class="zezao-son" >
        <div>最低{{ poi_info.min_price }}元起送</div>
        <div @click="flag_price = false">确定</div>
      </div>
    </div>
  </div>
</template>


<script>
import ListItem from "@/components/ListItem.vue";
import DindanList from "@/components/DindanList.vue";
import EvaluateList from "@/components/EvaluateList.vue";
export default {
  components: {
    ListItem,
    DindanList,
    EvaluateList,
  },
  data() {
    return {
      zezaoTijiao: false,
      poi_info: {},
      food_spu_tags: [],
      evaluate_list: [],
      activeKey: 0,
      price: 0,
      totalPrice: [],
      falg: false,
      nav_flag: true,
      flag_price: false,
      localStorageData: []
    };
  },
  created() {
    this.axios
      .get("api/sellerList/" + this.$route.params.id)
      .then((response) => {
        console.log(response);
        // this.konglongList = response.data.kingkongList;
        this.poi_info = response.data.poi_info[0];
        this.food_spu_tags = response.data.food_spu_tags[0].food_spu_tags;
        this.evaluate_list = response.data.list[0].list;
        console.log(this.poi_info);
        console.log(this.food_spu_tags);
        console.log(this.evaluate_list);
      });
  },
  methods: {
    getFalg: function () {
      if (this.totalPrice.length && !this.falg) {
        this.falg = true;
      } else {
        this.falg = false;
      }
    },
    // getZongPrice: function(){
    //   for(var i=0 ; i<this.)
    // },
    getTotalPrice: function () {
      this.totalPrice = [];
      for (var i = 0; i < this.food_spu_tags.length; i++) {
        for (var j = 0; j < this.food_spu_tags[i].spus.length; j++) {
          if (this.food_spu_tags[i].spus[j].mport_sell_status != 0) {
            this.totalPrice.push(this.food_spu_tags[i].spus[j]);
          }
        }
      }

      for (var h = 0; h < this.totalPrice.length; h++) {
        for (var k = h + 1; k < this.totalPrice.length; k++) {
          if (this.totalPrice[h].id == this.totalPrice[k].id) {
            this.totalPrice.splice(k, 1);
          }
        }
      }
      console.log(this.totalPrice);
    },
    addStatus: function (e) {
      console.log(this.totalPrice)
      this.food_spu_tags[this.activeKey].spus[e].mport_sell_status += 1;
      this.getTotalPrice();
    },
    delStatus: function (e) {
      // console.log(e)
      this.getTotalPrice();
      if (
        this.food_spu_tags[this.activeKey].spus[e].mport_sell_status - 1 <=
        0
      ) {
        this.food_spu_tags[this.activeKey].spus[e].mport_sell_status = 0;
        return;
      }
      this.food_spu_tags[this.activeKey].spus[e].mport_sell_status -= 1;
    },
    delDindanStatus: function (e) {
      let id = this.totalPrice[e].id;
      for (var i = 0; i < this.food_spu_tags.length; i++) {
        for (var j = 0; j < this.food_spu_tags[i].spus.length; j++) {
          if (this.food_spu_tags[i].spus[j].id == id) {
            // this.totalPrice.push(this.food_spu_tags[i].spus[j]);
            if (this.food_spu_tags[i].spus[j].mport_sell_status - 1 >= 0) {
              this.food_spu_tags[i].spus[j].mport_sell_status -= 1;
            }
          }
        }
      }
      this.getTotalPrice();
    },
    addDindanStatus: function (e) {
      // this.totalPrice = []
      let _id = this.totalPrice[e].id;
      console.log(_id);
      for (var i = 0; i < this.food_spu_tags.length; i++) {
        for (var j = 0; j < this.food_spu_tags[i].spus.length; j++) {
          if (this.food_spu_tags[i].spus[j].id == _id) {
            // this.totalPrice.push(this.food_spu_tags[i].spus[j]);
            this.food_spu_tags[i].spus[j].mport_sell_status += 1;
          }
        }
      }
      // // this.totalPrice = []
      this.getTotalPrice();
    },
    getXiangtong: function () {
      for (var i = 0; i < this.totalPrice.length; i++) {
        for (var j = 0; j < this.food_spu_tags.length; j++) {
          for (var h = 0; h < this.food_spu_tags[j].spus.length; h++) {
            if (this.totalPrice[i].id == this.food_spu_tags[j].spus[h].id) {
              this.food_spu_tags[j].spus[h].mport_sell_status = this.totalPrice[
                i
              ].mport_sell_status;
            }
          }
        }
      }
    },
    clear: function () {
      for (var j = 0; j < this.food_spu_tags.length; j++) {
        for (var h = 0; h < this.food_spu_tags[j].spus.length; h++) {
          this.food_spu_tags[j].spus[h].mport_sell_status = 0;
        }
      }
      this.getTotalPrice();
    },
    jiesuan: function () {
      if(this.price < this.poi_info.min_price){
        this.flag_price = true;
        return;
      }
      let data = {
        poi_info: this.poi_info,
        totalPrice: this.totalPrice,
        price: this.price
      }

      this.$router.push({path: '/payment',query: data})

      // if(JSON.parse(window.localStorage.getItem("key"))){
      //   this.localStorageData = JSON.parse(window.localStorage.getItem("key"));
      // }
      // this.localStorageData.push(data)
      // window.localStorage.setItem("key",JSON.stringify(this.localStorageData));

      // for (var i = 0; i < this.food_spu_tags.length; i++) {
      //   for (var j = 0; j < this.food_spu_tags[i].spus.length; j++) {
      //     if (this.food_spu_tags[i].spus[j].mport_sell_status != 0) {
      //       this.food_spu_tags[i].spus[j].mport_sell_status = 0;
      //     }
      //   }
      // }
      // this.getTotalPrice();
      // this.chengGong();
    },
    // chengGong: function(){
    //   this.zezaoTijiao = true;
    //   setTimeout(() => {
    //     this.zezaoTijiao = false;
    //     this.$router.push('/order');
    //   },1000)
    // }
    // huoqu: function(){
    //   console.log(JSON.parse(window.localStorage.getItem("key")));
    // }
  },
  watch: {
    totalPrice: function () {
      this.getXiangtong();
      this.price = 0;
      for (var i = 0; i < this.totalPrice.length; i++) {
        this.price +=
          this.totalPrice[i].mport_sell_status * this.totalPrice[i].min_price;
      }
      if (this.price != 0) {
        this.price += this.poi_info.shipping_fee;
      }
    },
  },
  filters: {
    formatPlayCountWan: function (value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style scoped lang="less">
.seller {
  width: 100%;
  .header {
    width: 100%;
    background-color: rgb(46, 47, 59);
    .fanhui {
      width: 100%;
      height: 50px;
      // padding-left: 50px;
      box-sizing: border-box;
      position: relative;
      div {
        width: 18px;
        height: 18px;
        border: 2px solid transparent;
        border-top-color: white;
        border-left-color: white;
        transform: rotateZ(-45deg);
        // margin-top: 20px;
        position: absolute;
        left: 30px;
        top: 13px;
      }
    }
    .van-card {
      background-color: rgb(46, 47, 59);
      color: white;
      .van-card__title {
        font-size: 16px;
        font-weight: 600;
      }
      .van-card__desc {
        // height: 30px;
        // line-height: 30px;
        margin: 10px 0 10px 0;
        color: white;
      }
    }
  }
  .cenetr {
    width: 100%;
    height: 50px;
    line-height: 50px;
    // background-color: pink;
    border-bottom: 1px solid #ddd;
    .center-son {
      width: 100%;
      display: flex;
      text-align: center;

      li {
        flex: 1;
        position: relative;
      }
      .active1 {
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: 50%;
        width: 50px;
        margin-left: -25px;
        border-bottom: solid 2px #ffd300;
      }
      .active2 {
        color: #ffd300;
      }
    }
    .nav-neirong {
      display: flex;
      padding-right: 5px;
      padding-bottom: 50px;
      .left {
        .van-sidebar {
          height: calc(100vh - 204px);
          overflow-y: scroll;
        }
      }
      .right {
        flex: 1;
        height: calc(100vh - 204px);
        overflow-y: scroll;
      }
      .bottom {
        width: 100%;
        // height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        color: white;
        // display: flex;
        .bottom-son {
          width: 100%;
          .dindan {
            width: 100%;
            // height: 50px;
            color: #000;
            background-color: white;
            .delete {
              width: 100%;
              // height: 50px;
              border-bottom: 1px solid #ddd;
              position: relative;

              .qinkong {
                width: 100%;
                height: 48px;
                background-color: #ddd;
                // background-color: #666;
                // border: 1px solid #666;
                // border-radius: 10px;
                // margin-left: 20px;
                div {
                  width: 80px;
                  height: 48px;
                  text-align: center;
                  line-height: 50px;
                  margin-left: 20px;
                }
              }
              .list {
                width: 100%;
                // display: flex;
                padding: 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #ddd;
              }
            }
          }
          .price {
            width: 100%;
            height: 50px;
            position: relative;
            background-color: #3b3b3c;
            .heji {
              width: 70%;
              text-align: center;
              line-height: 50px;
              position: absolute;
              left: 0;
              top: 0;
            }
            .tijiao {
              width: 30%;
              height: 50px;
              position: absolute;
              right: 0;
              top: 0;
              background-color: red;
              text-align: center;
              line-height: 50px;
            }
          }
        }
      }
    }
  }
  .zezao{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
    .zezao-son{
      width: 90%;
      height: 100px;
      margin: 200px auto;
      background-color: white;
      div:nth-child(1){
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
      div:nth-child(2){
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: rgb(214, 214, 18);
      }
    }
  }
  .zezaoTijiao{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    div{
      width: 200px;
      height: 100px;
      background-color: white;
      margin: 200px auto;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>