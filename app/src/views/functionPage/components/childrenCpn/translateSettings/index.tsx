import React, { memo, useState } from 'react'
import { ipcRenderer } from 'electron'

import { Radio, Select } from 'antd'
import { TranslateSettingsWrap } from './style'

const { Option } = Select
const allLanguages = $tools.languageList
allLanguages.unshift({
  name: '自动翻译',
  typeCode: 'auto',
})

export default memo(function TranslateSettings() {
  // state or props
  const [autoTranslationStatus, setAutoTranslationStatus] = useState(
    $tools.electronStore.get('isAutoTranslate')
  )

  // other handle
  const autoTranslationStatusChange = (e: any): any => {
    setAutoTranslationStatus(e.target.value)
    $tools.electronStore.set('isAutoTranslate', e.target.value)
    if (e.target.value) ipcRenderer.send('openAutoTranslate')
  }

  const otherPartyLanguageChange = (value: any): any => {
    $tools.electronStore.set('otherPartLanguage', [value])
  }

  return (
    <TranslateSettingsWrap>
      <div className="container">
        <div className="content-wrap">
          <div className="top-title">聊天设置</div>
          <div className="auto-translate-switch">
            <div className="wrap">
              <div className="text">聊天自动:</div>
              <Radio.Group onChange={autoTranslationStatusChange} value={autoTranslationStatus}>
                <Radio value={true}>开启</Radio>
                <Radio value={false}>关闭</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="otherParty-language-check">
            <div className="wrap">
              <div className="text">对方语言:</div>
              <Select
                onChange={otherPartyLanguageChange}
                defaultValue={($tools.electronStore.get('otherPartLanguage') as Array<any>)[0]}
              >
                {allLanguages.map((item: any): any => {
                  return (
                    <Option key={item.typeCode} value={item.typeCode}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </TranslateSettingsWrap>
  )
})
