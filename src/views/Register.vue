<template>
  <div class="register">
    <div class="sign-in-son">
      <div class="login">
        <div><img src="../assets/signin/signin.png" alt="" /></div>
        <div>美团外卖</div>
      </div>

      <ul class="register-son">
        <li>
          <label for="tel">账号:</label>
          <input
            v-model="username"
            type="text"
            placeholder="请输入11位数字"
            class="inp"
            id="tel"
          />
          <!-- <div>{{yongMing}}</div> -->
          <!-- <span class="success"><i class="success_icon"></i> 恭喜您输入正确</span> -->
        </li>
        <li>
          <label for="">登陆密码:</label>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            id="pwd"
          />
          <!-- <div></div> -->
        </li>

        <!-- <li>
          <label for="">确认密码:</label>
          <input type="password" placeholder="确认密码" id="surepwd" />
          <div></div>
        </li> -->
      </ul>

      <div class="zhuce">
        <button @click="tijiao">立即注册</button>
      </div>
    </div>

    <div class="zezao" v-if="yongMing">
      <div>{{ yongMing }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      //   newpassword: "",
      yongMing: "",
    };
  },
  methods: {
    // yonghu: function () {
    //     // console.log(111)
    //   var reg = /^\d{11}$/;
    //   // 判断是否符合正则表达式
    //   console.log(reg.test(this.username))
    //   if (reg.test(this.username)) {
    //       console.log(1)
    //     this.yongMing = ''
    //   } else {
    //       console.log(-1)
    //     this.yongMing = "用户名输入格式不正确";
    //   }
    // },
    tijiao: function () {
      this.axios({
        url: "api/register",
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
        if (res.data == 1) {
          this.yongMing = "注册成功";
          setTimeout(() => {
              this.yongMing = "";
              this.$router.push("/");
          },1000)
        } else if (res.data === -1) {
          // console.log("密码错误")
          this.yongMing = "该用户已存在";
          setTimeout(() => {
              this.yongMing = ""
          },1000);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.register {
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
  }
  .register-son {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    li {
      width: 100%;
      //   height: 40px;
      text-align: right;
      //   line-height: 40px;
      margin-bottom: 10px;
      input {
        //   overflow: none;
        // line-height: none;
        outline: none;
        height: 30px;
      }
    }
  }
  .zhuce {
    width: 100%;
    text-align: center;
    button {
      background: none;
      outline: none;
      border: none;
      width: 100px;
      height: 40px;
      background-color: rgb(226, 17, 17);
      border-radius: 20px;
      color: white;
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