<template>
  <div class="sign-in">
    <!-- <img src="../assets/signin/signin.png" alt="" /> -->

    <div class="sign-in-son">
      <div class="login">
        <div><img src="../assets/signin/signin.png" alt="" /></div>
        <div>美团外卖</div>
      </div>

      <van-form>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            @click="SignIn"
            round
            block
            type="info"
            native-type="submit"
            >登录</van-button
          >
          <van-button @click="$router.push('/register')" round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>

    <div class="zezao" v-if="zezao">
      <div>{{zezao}}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import qs from "qs";
// import { mapState } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      zezao: ""
    };
  },
  components: {},
  computed: {
    // ...mapState(['username'])
  },
  methods: {
    SignIn: function () {
      if(this.username == "" || this.password == ""){
        console.log(111)
        return
      }
      // console.log()
      this.axios({
        url: "api/signin",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
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
        // this.$store.commit("updateUsername", this.username);
        console.log(res);
        if (res.data === "登录成功") {
          this.$router.push("/home");
        } else if (res.data === "密码错误") {
          // console.log("密码错误")
          this.zezao = "密码错误";
          setTimeout(() => {
            this.zezao = "";
          },1000);
        } else {
          // console.log(res.data);
          this.zezao = "用户名错误";
          setTimeout(() => {
            this.zezao = "";
          },1000)
        }
      });
    },
  },
};
</script>


<style scoped lang="less">
.sign-in {
  text-align: center;
  .sign-in-son {
    width: 100%;
    margin-top: 50px;
    .login {
      width: 100%;
      div:nth-child(1) {
        margin: 0 auto;
        img {
          width: 130px;
          height: 130px;
        }
      }
    }
    .van-form {
      margin-top: 30px;
      .van-button {
        margin-bottom: 10px;
      }
    }
  }
  .zezao {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    div {
      width: 80%;
      height: 150px;
      background-color: white;
      text-align: center;
      line-height: 150px;
      margin: 150px auto;
    }
  }
}
</style>