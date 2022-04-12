<template>
  <div class="comment">
    <van-nav-bar
      :title="name"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="$router.back()"
      @click-right="ddd"
    />

    <div class="tianxie">
      <div class="title">评论</div>
      <textarea
        v-model="value"
        class=""
        rows="10"
        cols="35"
        placeholder="说说商家的亮点和不足吧！"
      ></textarea>
    </div>

    <div class="niming">
      <div>匿名发布</div>
      <van-switch
        v-model="checked"
        active-color="#ee0a24"
        inactive-color="#dcdee0"
      />
    </div>
    <div class="xin">选择匿名后，将以匿名的信息发布评论信息！</div>

    <div class="zezao" v-if="flag">
      <div class="zezao-son">
        <div>{{title}}</div>
        <div v-if="flag_p" @click="flag = false">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      id: "",
      checked: true,
      value: "",
      username: "匿名发布",
      flag: false,
      flag_p: true,
      title: ""
    };
  },
  created() {
    // this.getTime();
    // console.log(this.$route.query.id)
  },
  methods: {
    ddd: function () {
      if(!this.value){
        this.title = "请输入评论内容";
        this.flag = true;
        this.flag_p = true;
        return
      }
      this.axios({
        url: "api/comment",
        method: "post",
        data: {
          id: this.$route.query.id,
          userName: this.username,
          content: this.value,
          userPicUrl: "",
          userID: "",
          deliveryTime: "20分钟送达",
          commentTime: this.getTime(),
        },
        transformRequest: [
          function (data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        console.log(res)
        if (res.data) {
          this.flag_p = false;
          this.value = "";
          this.flag = true;
          this.title = "评论成功~"
          setTimeout(() => {
            this.flag = false;
            this.$router.back();
          },500)
        }
      });
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      // console.log(vm , to)
      vm.id = to.query.id;
      vm.name = to.query.name;
    });
  },
};
</script>

<style scoped lang="less">
.comment {
  .van-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        // margin-right: 10px;
        padding-left: 0 16px 0 0;
        // left: -8px;
      }
      .van-nav-bar__title {
        padding: 0 10px !important;
        box-sizing: border-box;
      }
    }
  }
  .tianxie {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .title {
      height: 30px;
      line-height: 30px;
    }
    textarea {
      // width: 100%;
      border: none;
      background-color: rgb(247, 244, 244);
      outline: none;
    }
  }
  .niming {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
    left: 0;
    top: 0;
    .van-switch {
      position: absolute;
      right: 10px;
      top: 8px;
    }
  }
  .xin {
    padding: 10px;
    color: rgb(105, 102, 102);
  }
  .zezao{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
}
</style>