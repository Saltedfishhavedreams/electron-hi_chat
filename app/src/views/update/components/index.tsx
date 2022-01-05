import React, { memo, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import { Image, Carousel, Button, List, Progress } from 'antd'
import { UpdateContentWrap } from './style'

const testData = [
  {
    title: '新增',
    message: '新增"翻译反馈", 以便用户获得更好的体验',
  },
  // {
  //   title: '协作',
  //   message: '新增"快速入门", 帮助新用户快速掌握hiChat, 帮助新用户快速掌握hiChat',
  // },
  // {
  //   title: '协作',
  //   message: '新增"快速入门", 帮助新用户快速掌握hiChat',
  // },
  // {
  //   title: '协作',
  //   message: '新增"快速入门", 帮助新用户快速掌握hiChat',
  // },
]

export default memo(function UpdateContent() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect((): any => {
    ipcRenderer.on('download-progress', (e, progressObj: any) => {
      setProgress(progressObj.percent.toFixed(2))
    })

    return () => ipcRenderer.removeAllListeners('download-progress')
  })

  const renderBottomOperation = () => {
    if (isUpdating) {
      return <Progress percent={progress}></Progress>
    } else {
      return (
        <div>
          <Button
            type="default"
            onClick={() => {
              $tools.windowList.get('Update')?.close()
              $tools.windowList.get('Home')?.focus()
            }}
          >
            暂不更新
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setIsUpdating(true)
              ipcRenderer.send('confirm-downloadUpdate')
            }}
          >
            立即更新
          </Button>
        </div>
      )
    }
  }

  return (
    <UpdateContentWrap>
      <div className="top-title">更新内容</div>
      <Carousel>
        <Image src={require('@root/assets/img/updateImg.jpg').default} alt="" />
        <Image src={require('@root/assets/img/updateImg.jpg').default} alt="" />
        <Image src={require('@root/assets/img/updateImg.jpg').default} alt="" />
      </Carousel>

      <List
        bordered
        size="small"
        dataSource={testData}
        renderItem={(item) => (
          <List.Item>
            [{item.title}] {item.message}
          </List.Item>
        )}
      ></List>

      <div className="bottom-operation">{renderBottomOperation()}</div>
    </UpdateContentWrap>
  )
})
