import axios from 'axios';
import config from 'config';
import { getCookie, delCookie, saveCookie} from 'helpers/funcs';

export const getAccessToken = () => {
  return getCookie(config.user_token_key) || null
}

export const getAuth = () => {
  return JSON.parse(getCookie(config.user_profile_key)) || null
}

export const saveAuth = (auth, exdays = 1) => {
  saveCookie(config.user_profile_key, JSON.stringify(auth), exdays)
}
  
export const saveToken = (accessToken, exdays = 1) => {
  saveCookie(config.user_token_key, accessToken, exdays)
}
export const destroyLogged = () => {
  delCookie(config.user_token_key);
  delCookie(config.user_profile_key);
  localStorage.clear();
};

/**
 * Check Auth login App
 **/
export const isLogin = () => {
  const token = getCookie(config.user_token_key)
  const authInfo = getCookie(config.user_token_key)
  return token && authInfo
}

export const verifyToken = async (callback) => {
  const tokenAdmin = getCookie(config.user_token_key)

  const res = await axios.post('http://localhost:3000/api/admin/verifyToken', {
    tokenAdmin
  })

  
  if (res.data.success) {
    return callback(true)
  } else {
    return callback(false)
  }

}

export default { 
  getAccessToken, 
  getAuth, 
  saveAuth, 
  saveToken, 
  destroyLogged, 
  isLogin,
  verifyToken
};