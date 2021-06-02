import axios from 'axios';

const kakao = axios.create();

// 글로벌 설정 예시:

// kakao.defaults.baseURL = 'https://localhost:3000';
kakao.defaults.baseURL = 'https://kapi.kakao.com';
kakao.defaults.withCredentials = false;

export default kakao;
