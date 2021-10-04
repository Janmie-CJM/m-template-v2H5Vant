<template>
  <div class="login-container">
    <div class="warpper">
      <van-row>
        <van-col span="8">
          <h1>登录</h1>
        </van-col>
      </van-row>
      <van-form @submit="onSubmit" ref="loginForm">
        <div class="input-wrapper">
          <van-field v-model="loginForm.mobile" label="+86" name="手机号" placeholder="手机号" :rules="testMobile" />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <template #button>
              <van-button size="small" round type="info">发送验证码</van-button>
            </template>
          </van-field>
        </div>
        <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checkbox" name="checkbox" shape="square" icon-size="14px">
              我已经阅读并同意
              <a href="https://www.baidu.com">用户协议</a>
              和
              <a href="https://www.baidu.com">隐私政策</a>
            </van-checkbox>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button
            block
            type="info"
            size="small"
            native-type="submit"
            :loading="loading"
            @click.native="handleLogin"
            loading-text="提交"
            >提交</van-button
          >
        </div>
        <van-row>
          <van-col :span="17"></van-col>
          <van-col :span="5">
            <router-link to="/home">忘记密码</router-link>
          </van-col>
          <van-col :span="2">
            <router-link to="/home">注册</router-link>
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    var mobileTest = value => {
      return /^1\d{10}$/.test(value)
    }

    return {
      loginForm: {
        mobile: '12345678901',
        password: '111'
      },

      testMobile: [
        {
          required: true,
          message: '手机号码不能为空',
          trigger: 'onBlur'
        },
        {
          validator: mobileTest, // 自定义校验规则
          message: '请输入正确格式的手机号码',
          trigger: 'onBlur'
        }
      ],
      loading: false,
      checkbox: false,
      radio: '1'
    }
  },
  methods: {
    // 登录
    handleLogin() {
      this.loading = true
      this.$nextTick()
      this.$refs.loginForm
        .validate()
        .then(() => {
          this.loading = true
          this.$set(this.loginForm, 'userName', 'admin')

          // 调用登录接口
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // 跳转页面
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
        })
        .catch(() => {
          console.log('提交失败！！！')
          return false
        })
    },
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="scss" scoped>
$cellHeight: 44px;
$inputBg: #f5f5f5;
.inputPadding {
  padding: 0px 10px;
}

.login-container {
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 90px 38px 12px 33px;
    .van-form {
      margin-top: 30px;
      .van-cell {
        padding-left: 0px;
        padding-right: 0px;
      }
      .van-cell::after {
        border: none;
      }
    }
  }
}
.input-wrapper {
  ::v-deep .van-field__label {
    height: $cellHeight;
    width: 50px;
    margin-right: 0px;
    padding: 0px 10px;
    background: $inputBg;
    span {
      line-height: $cellHeight;
    }
  }
  ::v-deep input {
    height: $cellHeight;
    background: $inputBg;
    @extend .inputPadding;
  }
  ::v-deep .van-field__error-message {
    @extend .inputPadding;
  }
}
</style>
