import axios from 'axios';
import { login_test, userInfo } from "./api";

// 模拟登陆
export const fetchLogintest = params => {
    return axios.post(login_test, params).then(res => res.data);
};

// 拉取用户信息
export const fetchUserInfo = params => {
    return axios.post(userInfo, params).then(res => res.data);
};




