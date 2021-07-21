import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';
import router from '../router';
import { store } from '../store';
import { getSign } from './sign';

// const baseURL = 'https://api.github.com';
interface axiosOptions {
  isLoading?: boolean;
}
export function commonAjax(
  url: string,
  params,
  options: axiosOptions = {
    isLoading: true,
  },
) {
  let loading: ILoadingInstance;
  if (options.isLoading) {
    loading = ElLoading.service({
      target: '#main',
      lock: true,
    });
  }
  let info = store.getters.getPersonInfo;
  let data = {
    device: 'pc',
    deviceType: 'PC',
    sn: info.sn,
    timestamp: new Date().getTime(),
    token: info.token,
    uType: 2,
    ...params,
  };
  data.sign = getSign(data);
  let instance = axios.create({
    params: data,
  });
  return instance.post(url).then((res) => {
    if (options.isLoading) {
      loading.close();
    }
    if (res.status === 200) {
      if (res.data.code == -500) {
        ElMessage.error('已在其他地点登录，请重新登录');
        router.push('/login');
        return;
      } else if (res.data.code === -100) {
        ElMessage.error(res.data.message);
        return res.data;
      } else if (res.data.code === 1 || res.data.code === 200) {
        return res.data.data;
      }
    } else {
      ElMessage.error('网络错误');
    }
  });
}
export default axios;
