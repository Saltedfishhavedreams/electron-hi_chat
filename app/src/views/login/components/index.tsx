import React, { memo, useEffect } from 'react'
// import { shallowEqual, useSelector } from 'react-redux'
import { remote } from 'electron'

import { LoginForm, ProFormText } from '@ant-design/pro-form'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'

import './index.less'

export default memo(function LoginFormTKY(props: any) {
  // state or props

  // redux hook

  // other hook
  useEffect(() => {
    if (props.query.warningInfo) message.warning(props.query.warningInfo)
  })

  // other handle
  const handleFinsh = (value: any): any => {
    $api
      .login({ ...value, type: 1 }, { method: 'POST' })
      .then(() => {
        $tools.createWindow('Home')
        remote.getCurrentWindow().close()
      })
      .catch((err) => {
        message.error(err.msg)
      })
  }

  return (
    <div className="form-wrap">
      <LoginForm onFinish={handleFinsh}>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名长度: 2~16'}
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
          placeholder={'密码长度: 6~8'}
          rules={[
            { required: true, message: '请输入密码！' },
            { pattern: /^.{6,18}$/, message: '密码长度在6~18之间' },
          ]}
          validateTrigger="onBlur"
        />

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <a href="#/register">注册账号</a>
          <a href="#/forget_pwd">忘记密码</a>
        </div>
        <Button className="ant-btn-primary ant-btn-lg" style={{ width: '100%' }}>
          登录
        </Button>
      </LoginForm>
    </div>
  )
})
