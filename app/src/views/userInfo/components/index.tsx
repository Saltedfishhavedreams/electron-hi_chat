import React, { memo, useState, useEffect } from 'react'

import { Modal, message } from 'antd'
import { UserInfoContentWrap } from './style'

export default memo(function UserInfoContent() {
  // props or state
  const [isModalVisible, setModalVisible] = useState(false)
  const [remainingCharacters, setRemainingCharacters] = useState()

  // other hook
  useEffect(() => {
    $api.operationQuickReplyData('searchUserSetting').then((res: any) => {
      if (res.code === 200) {
        return setRemainingCharacters(res.data.remainingCharacters)
      }
      message.error('网络异常, 请稍后再试')
    })
  }, [])

  // other handle
  const userInfo = $store.getState().userInfo
  const registrationTime = new Date(userInfo.createTime)
  const lastLoginTime = new Date(userInfo.lastLoginTime)

  const handleTime = (timestamp: any): any => {
    const a = new Date(timestamp).getTime()
    const date = new Date(a)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  '
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const dateString = Y + M + D + h + m
    return dateString
  }

  const logout = () => {
    setModalVisible(false)
    $tools.logout()
  }

  return (
    <UserInfoContentWrap>
      <Modal
        visible={isModalVisible}
        title="退出登录"
        getContainer={false}
        onOk={logout}
        onCancel={() => setModalVisible(false)}
      >
        <div>再次确认即可退出登录</div>
      </Modal>

      <div className="header-portrait init-style">
        {/* <img src={require('@root/assets/img/headerPortrait.jpg').default} alt="" /> */}
        <img src={$tools.APP_ICON} alt="" />
        <span></span>
      </div>

      <div className="account-information init-style">
        <div className="account-number">
          <span>账号</span>
          <span>{userInfo.username}</span>
        </div>

        <div className="email">
          <span>邮箱</span>
          <span>{userInfo.email}</span>
        </div>
      </div>

      <div className="time-info init-style">
        <div className="registration-time">
          <span>注册时间</span>
          <span>{handleTime(registrationTime)}</span>
        </div>
        <div className="last-login-time">
          <span>上次登录时间</span>
          <span>{handleTime(lastLoginTime)}</span>
        </div>
      </div>

      <div className="surplus init-style">
        <span>剩余字符</span>
        <span>{remainingCharacters}</span>
      </div>

      <button className="logout-btn" onClick={() => setModalVisible(true)}>
        退出登录
      </button>
    </UserInfoContentWrap>
  )
})
