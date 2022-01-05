import React, { memo } from 'react'
import { useHistory } from 'react-router'

import { LoginForm, ProFormText, ProFormCaptcha } from '@ant-design/pro-form'
import { UserOutlined, LockOutlined, MailOutlined, UnlockOutlined } from '@ant-design/icons'
import { message, Button } from 'antd'

export default memo(function RegisterFormTKY() {
  // router hook
  const history = useHistory()

  // other handle
  const handleFormFinish = (value: any): any => {
    $api
      .register(value, {
        method: 'POST',
      })
      .then((res) => {
        if (res.code === 200) {
          message.success('注册成功')
          history.push('/login')
        }
      })
      .catch((err) => {
        message.error(err.msg)
      })
  }

  return (
    <div className="form-wrap" style={{ backgroundColor: 'white', height: '100%' }}>
      <LoginForm onFinish={handleFormFinish}>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            { required: true, message: '请输入用户名!' },
            { pattern: /^.{2,18}$/, message: '账号长度在2~18之间' },
          ]}
          validateTrigger="onBlur"
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            { required: true, message: '请输入密码！' },
            { pattern: /^.{6,18}$/, message: '密码长度在6~18之间' },
          ]}
          validateTrigger="onBlur"
        />
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined />,
          }}
          placeholder={'请输入邮箱地址'}
          rules={[
            { required: true, message: '请输入邮箱地址!' },
            {
              pattern: /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/,
              message: '邮箱格式错误',
            },
          ]}
          validateTrigger="onBlur"
        />
        <ProFormCaptcha
          name="code"
          fieldProps={{
            size: 'large',
            prefix: <UnlockOutlined />,
          }}
          captchaProps={{
            size: 'large',
          }}
          phoneName="email"
          placeholder="请输入验证码"
          onGetCaptcha={async (email) => {
            $api
              .sendCodeRequest({ email }, { method: 'POST' })
              .then((res) => {
                if (res.code === 200) {
                  message.success(`${email} 验证码发送成功!`)
                }
              })
              .catch((err) => {
                message.error(err.msg)
              })
          }}
        />

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <a href="#/forget_pwd">忘记密码</a>
          <a href="#/login">已有账号? 去登陆</a>
        </div>
        <Button className="ant-btn-primary ant-btn-lg" style={{ width: '100%' }}>
          注册
        </Button>
      </LoginForm>
    </div>
  )
})
