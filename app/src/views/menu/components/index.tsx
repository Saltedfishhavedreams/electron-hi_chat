import React, { memo, useState, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { remote, ipcRenderer } from 'electron'
import path from 'path'

import { Button, message, List, Avatar } from 'antd'
import { HomeWrapper } from './style'

export default memo(function MenuFormTKY(props: any) {
  // state or props
  const [loadingArr, setLoadingArr]: any = useState([])

  // redux hook
  const { appList, appVersion } = useSelector(
    (state: any) => ({
      appList: state.appList,
      appVersion: state.appVersion,
    }),
    shallowEqual
  )

  // other hook
  useEffect(() => {
    if (props.query.form === 'home') {
      // 查询app列表
      $api.searchAppList({}, { method: 'POST' })
    }
  }, [])

  // other handle
  const itemClick = (item: any) => {
    const buttonType: any = $store.getState().appVersion[item.appName].buttonType
    if (buttonType === '下载' || buttonType === '更新') {
      const appItemInfo: any = $store.getState().newAppVersion[item.appName]
      if (!appItemInfo) return message.warning('该模块暂未开放')
      setLoadingArr([...loadingArr, item.appName])
      remote.getCurrentWindow().webContents.downloadURL(appItemInfo.downloadUrl)
    } else {
      $tools.createWindow(item.appName, {
        windowOptions: {
          width: 1000,
          height: 800,
          title: item.appName,
          frame: true,
          // autoHideMenuBar: true,
          webPreferences: {
            preload: path.join($tools.APP_PATH, `node_modules/preload/${item.appName}.js`),
          },
        },
        createConfig: {
          // openDevTools: true,
        },
      })
    }
  }

  // 插件下载监听
  ipcRenderer.removeAllListeners('pluginDownloadOver')
  ipcRenderer.on('pluginDownloadOver', (e: any, appName: any) => {
    setLoadingArr(loadingArr.filter((item: any) => item !== appName))
    message.success('下载成功')
  })

  return (
    <HomeWrapper>
      <div className="container">
        <List
          dataSource={appList}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta avatar={<Avatar src={item.imgUrl} />} description={item.appName} />
              <Button
                className="open-btn"
                shape="round"
                type="primary"
                size="small"
                ghost
                loading={loadingArr.includes(item.appName)}
                onClick={() => itemClick(item)}
              >
                {appVersion[item.appName] &&
                  !loadingArr.includes(item.appName) &&
                  appVersion[item.appName].buttonType}
              </Button>
            </List.Item>
          )}
        ></List>
      </div>
    </HomeWrapper>
  )
})
