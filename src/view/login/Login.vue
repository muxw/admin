<template>
  <div class="login">
    <div ref="root" class="content">
      <img alt="苏州市立医院" src="@/assets/image/login-logo.png" />
      <div class="box-login">
        <div class="title" @click="test">登录云诊室</div>
        <div class="line"></div>
        <el-form ref="form" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入您的工号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :show-password="true"
              placeholder="请输入您的密码"
              type="password"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input v-model="loginForm.captcha" placeholder="请输入验证码" @keyup.enter="login"></el-input>
          </el-form-item>
          <img class="vcode" :src="vcodeSrc" alt="form.captcha" @click="refreshVcode" />
          <el-button class="btn" @click="login">立即登录</el-button>
        </el-form>
      </div>
    </div>
    <footer class="flex flex-col justify-end pb-3 text-base text-white align-bottom">
      <p class="text-center">版权所有 苏州实力医院苏ICP备05071313号</p>
      <p class="text-center">Copyright 2015 smh.cc All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { Dform } from './type';
  import { buildUUID } from '@/utils/uuid';
  import { ElForm, ElMessage } from 'element-plus';
  import axios, { AxiosRequestConfig } from 'axios';
  import qs from 'qs';
  import md5 from 'md5';
  import { useRoute } from 'vue-router';
  import router from '@/router/index';
  import { store } from '@/store';
  export default defineComponent({
    name: 'Login',
    setup() {
      const route = useRoute();
      const form = ref<InstanceType<typeof ElForm>>();
      onMounted(async () => {
        refreshVcode();
      });
      let loginForm = reactive<Dform>({
        username: '',
        password: '',
        captcha: '',
        utype: 2,
        uuid: '',
      });
      let vcodeSrc = ref('');
      const rules = {
        username: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      };
      const login = async () => {
        const config: AxiosRequestConfig = {
          url: '/api/authex/cloudClinic/webLogin',
          method: 'POST',
          responseType: 'json',
          data: qs.stringify({ ...loginForm, password: md5(md5(loginForm.password) + 'null') }),
        };
        try {
          await form.value?.validate();
          const res = await axios(config);
          if (res.data.code === 1 || res.data.code === 200) {
            store.commit('setPersonInfo', res.data.data);

            let adminList = ['System'];
            if (adminList.find((item) => res.data.data.username === item)) {
              store.commit('setRole', 'admin');
            } else {
              store.commit('setRole', 'user');
            }
            ElMessage.success('登录成功');
            if (route.query.redirectUrl) {
              router.push({
                path: route.query.redirectUrl,
              });
            } else {
              router.push('/home');
            }
          } else {
            refreshVcode();
            ElMessage.error(res.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      };
      const refreshVcode = () => {
        loginForm.uuid = buildUUID();
        vcodeSrc.value = `/api/authex/cloudClinic/captcha.jpg?uuid=${loginForm.uuid}`;
      };
      return {
        loginForm,
        login,
        rules,
        vcodeSrc,
        refreshVcode,
        form,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100vh;
    min-width: 980px;
    min-height: 640px;
    overflow: hidden;
    padding-top: 20px;
    .content {
      width: 980px;
      height: 72%;
      background: url('@/assets/image/login-bg.png') no-repeat;
      margin: 0 auto;
      position: relative;
      background-size: 100% 100%;
    }
    footer {
      background: #35c5df;
      height: 28%;
      width: 100%;
      background-image: url('@/assets/image/login-footer.png');
      background-size: 80% 80%;
      background-repeat: no-repeat;
      background-position: center bottom;
    }
    .box-login {
      width: 320px;
      padding: 20px 20px;
      border: solid 1px #ececec;
      box-shadow: 0px 1px 1px 0px #cbcbcb;
      border-radius: 10px;
      background: #fff;
      position: absolute;
      right: 0;
      top: 30px;
      text-align: center;
      .title {
        color: #37c7e1;
        font-size: 18px;
      }
      .line {
        display: block;
        margin-top: 10px;
        margin-bottom: 34px;
        width: 100%;
        background: #37c7e1;
        height: 2px;
      }
      .btn {
        background-color: #37c7e1;
        width: 100%;
        margin-top: 22px;
        color: #fff;
      }
    }
  }
</style>
