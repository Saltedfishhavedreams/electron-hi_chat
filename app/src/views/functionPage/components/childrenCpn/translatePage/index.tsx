import React, { memo, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import { Select, Input, Button, Switch, Tag, message } from 'antd'
import { TranslatePageWrapper } from './style'

const { Option } = Select
const { TextArea } = Input

let localHistory: any[] = ($tools.electronStore.get('translateHistory') as Array<any>).slice(0, 50)

export default memo(function TranslatePage() {
  // state or props
  const [beforeTranslate, setBeforeTranslate] = useState('')
  const [afterTranslate, setAfterTranslate] = useState('')
  const [historyTranslate, setHistoryTranslate]: any[] = useState(
    ($tools.electronStore.get('translateHistory') as Array<any>).slice(0, 50)
  )
  const [afterTransAutoSend, setAfterTransAutoSend] = useState(false)
  const [translateBtnText, setTranslateBtnText] = useState('翻译')

  // other hook
  useEffect(() => {
    return () => {
      $tools.electronStore.set('translateHistory', localHistory)
    }
  }, [])

  // other handle
  // 处理历史翻译移除
  // const removeHistoryMsg = (index: number) => {
  //   localHistory.splice(index, 1)
  //   setHistoryTranslate(localHistory)
  // }

  // 语言切换
  const checkLanguageChange = (type: string, value: string): any => {
    const ourLanguage: any[] = $tools.electronStore.get('ourLanguage') as []
    if (type === 'left') {
      ourLanguage[0] = value
    } else if (type === 'right') {
      ourLanguage[1] = value
    }
    $tools.electronStore.set('ourLanguage', ourLanguage)
  }

  // 翻译按钮点击
  const startTranslateMessage = (message?: any) => {
    setTranslateBtnText('翻译中. . .')
    ipcRenderer.send('startTranslation', {
      chatLanguage: ($tools.electronStore.get('ourLanguage') as any[])[0],
      translateIntoLanguage: ($tools.electronStore.get('ourLanguage') as any[])[1],
      message: message || beforeTranslate,
    })
  }

  // 渲染select标签
  const renderSelect = (type: string): any => {
    return (
      <Select
        defaultValue={($tools.electronStore.get('ourLanguage') as Array<any>)[type === 'left' ? 0 : 1] || 'zh'}
        onChange={(e) => checkLanguageChange(type, e)}
      >
        {$tools.languageList.map((item: any): any => {
          return (
            <Option value={item.typeCode} key={item.typeCode}>
              {item.name}
            </Option>
          )
        })}
      </Select>
    )
  }

  // 接收翻译返回数据
  ipcRenderer.removeAllListeners('receiveInformation')
  ipcRenderer.on('receiveInformation', (e, data) => {
    setTranslateBtnText('翻译')
    localHistory.unshift(data.message)
    const setArr = new Set(localHistory)
    localHistory = Array.from(setArr).slice(0, 50)
    setHistoryTranslate(localHistory)
    setAfterTranslate(data.translate_message)
    if (afterTransAutoSend) sendMessage(data.translate_message)
  })

  // 发送翻译之后的信息
  const sendMessage = (value?: string) => {
    if (!beforeTranslate || (!afterTranslate && !value)) return message.error('发送信息不能为空')
    const targetWin: any = $tools.windowList.get($tools.electronStore.get('targetWin') as RouterKey)
    if (!targetWin) return message.error('请先打开目标窗口')
    targetWin.focus()
    targetWin.send(`replaceValue:${$tools.electronStore.get('targetWin')}`, {
      checklanguage: ($tools.electronStore.get('ourLanguage') as any[])[0],
      targetLanguage: ($tools.electronStore.get('ourLanguage') as any[])[1],
      message: beforeTranslate,
      translateMessage: value || afterTranslate,
    })
    setAfterTranslate('')
    setBeforeTranslate('')
  }

  // 渲染历史翻译tag标签
  const renderTag = () => {
    return historyTranslate.map((item: string, index: number) => {
      return (
        // <Tag key={Math.random()} closable onClose={() => removeHistoryMsg(index)}>
        <Tag
          key={Math.random()}
          onClick={() => {
            setBeforeTranslate(historyTranslate[index])
            startTranslateMessage(historyTranslate[index])
          }}
        >
          {item}
        </Tag>
      )
    })
  }

  return (
    <TranslatePageWrapper>
      <div className="container">
        <div className="content-wrap">
          <div className="top-select">
            {renderSelect('left')}
            <img src={require('@root/assets/img/arrow.png').default} alt="" />
            {renderSelect('right')}
          </div>

          <div className="translate-box-part">
            <TextArea
              onInput={(e: any) => setBeforeTranslate(e.target.value)}
              onChange={(e) => !e.target.value && setAfterTranslate('')}
              placeholder="输入需要被翻译的语言"
              value={beforeTranslate}
              autoSize={{ minRows: 5, maxRows: 5 }}
            ></TextArea>
            <img src={require('@root/assets/img/arrow.png').default} alt="" />
            <TextArea
              onInput={(e: any) => setAfterTranslate(e.target.value)}
              value={afterTranslate}
              autoSize={{ minRows: 5, maxRows: 5 }}
            ></TextArea>
          </div>

          <div className="translate-button">
            <Button onClick={() => startTranslateMessage()} className="translate-msg-button">
              {translateBtnText}
            </Button>
            <Button className="send-msg-button" onClick={() => sendMessage()} disabled={afterTransAutoSend}>
              发送
            </Button>
          </div>

          <div className="operation-part">
            <div className="left-part">历史翻译 ∨</div>
            <div className="right-part">
              <span>翻译之后自动发送: </span>
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                onChange={(value: boolean) => setAfterTransAutoSend(value)}
              ></Switch>
            </div>
          </div>

          <div className="bottom-history">{renderTag()}</div>
        </div>
      </div>
    </TranslatePageWrapper>
  )
})
