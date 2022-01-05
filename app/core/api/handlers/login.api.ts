export function login(params?: queryTestInfoUsingGET.Params, options?: RequestOptions): Promise<any> {
  return $api
    .request('/login/login', params, options)
    .then((res) => {
      if (res.code === 200) {
        $store.dispatch({
          type: 'CHANGE_USERINFO',
          data: res.data,
        })

        return Promise.resolve()
      }
      return Promise.reject(res)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export function register(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/login/register', params, options)
}

export function forgetPWD(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/login/forgetPassword', params, options)
}

export function sendCodeRequest(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/login/sendSmsCodeByEmail', params, options)
}

export function getQuickReplyData(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<any> {
  return $api
    .request('/user/searchThesaurus', params, options)
    .then((res) => {
      if (res.code === 200) {
        $store.dispatch({
          type: 'CHANGE_QUICK_REPLY_DATA',
          data: res.data.list,
        })
        return Promise.resolve(res.data)
      }
    })
    .catch(() => Promise.reject('网络异常, 请稍后重试'))
}

export function operationQuickReplyData(
  url: string,
  params?: queryTestInfoUsingGET.Params | any,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request(`/user/${url}`, params, options)
}
