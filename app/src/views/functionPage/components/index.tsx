import React, { memo } from 'react'

import { Tabs, Select } from 'antd'
import { FunctionContentWrapper } from './style'
import TranslatePage from './childrenCpn/translatePage'
import TranslateSettings from './childrenCpn/translateSettings'
import QuickReply from './childrenCpn/quickReply'

const { TabPane } = Tabs
const { Option } = Select

export default memo(function FunctionContent() {
  const renderSelect = () => (
    <div className="target-selector-wrap">
      <div>发送给: </div>
      <Select
        defaultValue={$tools.electronStore.get('targetWin') as string}
        onChange={(value: string) => $tools.electronStore.set('targetWin', value)}
      >
        {Object.keys($store.getState().appVersion).map((item) => {
          const flag: boolean = $store.getState().appVersion[item].version ? false : true
          return (
            <Option key={item} value={item} disabled={flag}>
              {item}
            </Option>
          )
        })}
      </Select>
    </div>
  )

  return (
    <FunctionContentWrapper>
      {renderSelect()}
      <Tabs>
        <TabPane tab="翻译框" key="1">
          <TranslatePage></TranslatePage>
        </TabPane>
        <TabPane tab="快捷回复" key="2">
          <QuickReply></QuickReply>
        </TabPane>
        <TabPane tab="翻译设置" key="3">
          <TranslateSettings></TranslateSettings>
        </TabPane>
      </Tabs>
    </FunctionContentWrapper>
  )
})
