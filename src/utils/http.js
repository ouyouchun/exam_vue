import axios from 'axios'
import { Indicator, MessageBox } from 'mint-ui';
import router from '../router/index.js'
let loading
localStorage.eToken = '20fd359c8d12747a14039f845c50f223';

function startLoading() {
    Indicator.open('加载中...');
}

function endLoading() {
    Indicator.close();
}

// 请求拦截
axios.interceptors.request.use(
    (config) => {
        startLoading();
    //     if (config.method === 'post') {
		// 	//config.data = qs.stringify(config.data)
		// }
        //设置请求头
        if (localStorage.eToken) {
            config.headers.token = localStorage.eToken
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//响应拦截
axios.interceptors.response.use(
    (response) => {
        endLoading()
        return response
    },
    (error) => {
        MessageBox.alert(error, '异常');
        endLoading()
        // 获取状态码
        const { status } = error.response;
        if (status === 401) {
            MessageBox.alert('请重新登录', '异常');
                //清楚token
            localStorage.removeItem('eToken')
                //跳转到登录页面
            router.push('/login')
        }
        return Promise.reject(error)
    }
)
export default axios
