import React, { memo, useState, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { ipcRenderer } from 'electron'

import { Select, Pagination, Result, Button, Modal, Input, message, Popconfirm } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { QuickReplyWrap } from './style'

const { Option } = Select

const pageSize = 5
const operationLanguage: any[] = $tools.electronStore.get('ourLanguage') as any[]
const searchDataLanguage: any[] = $tools.electronStore.get('ourLanguage') as any[]

export default memo(function QuickReply() {
  // props or state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalNum, setTotalNum] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalLoadingState, setModalLoadingState] = useState(false)
  const [editState, setEditState] = useState(false)
  const [thesaurusInfo, setThesaurusInfo]: any[] = useState({})
  const [activeThesaurusId, setActiveThesaurusId] = useState('')
  const [beforeTranslate, setBeforeTranslate] = useState('')
  const [afterTranslate, setAfterTranslate] = useState('')

  // redux hook
  const { allQuickReplyData } = useSelector((state: any) => state, shallowEqual)

  // other hook
  useEffect(() => {
    $tools.electronStore.set('currentThesaurusInfo', {})
    requestQuickReplyData()
  }, [])

  // other handle
  // 请求快捷回复数据
  const requestQuickReplyData = (page?: number) => {
    $api
      .getQuickReplyData(
        {
          chatLanguage: searchDataLanguage[0],
          translateIntoLanguage: searchDataLanguage[1],
          pageNum: page || currentPage,
          pageSize,
        },
        { method: 'POST' }
      )
      .then((data) => {
        setCurrentPage(data.pageNum)
        setTotalNum(data.total)
      })
      .catch((errMsg) => {
        message.error(errMsg)
      })
  }

  // 更新快捷回复数据
  const updateQuickReplyData = (type: string, value: string): any => {
    type === 'left' ? (searchDataLanguage[0] = value) : (searchDataLanguage[1] = value)
    setCurrentPage(1)
    requestQuickReplyData()
  }

  // 更新添加快捷回复选择语言
  const updateOperationLanguage = (type: string, value: string): any => {
    if (type === 'left') {
      operationLanguage[0] = value
    } else {
      operationLanguage[1] = value
    }
  }

  /**
   * @param type 用于判断修改指定数据
   * @param flag 控制在通过点击修改进入modal 禁止select状态
   * @returns 渲染select标签
   */
  const renderSelect = (type: string, flag?: boolean, defaultValue?: string): any => {
    return (
      <Select
        // defaultValue={($tools.electronStore.get('ourLanguage') as Array<any>)[type === 'left' ? 0 : 1] || 'zh'}
        defaultValue={
          defaultValue || ($tools.electronStore.get('ourLanguage') as Array<any>)[type === 'left' ? 0 : 1]
        }
        onChange={(e) => (flag ? updateOperationLanguage(type, e) : updateQuickReplyData(type, e))}
        disabled={editState && flag}
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

  // 渲染快捷回复
  const renderInfoItem = () => {
    return allQuickReplyData.slice(0).map((item: any): any => {
      return (
        <div
          key={Math.random()}
          className={'info-item-wrap ' + (item.thesaurusId === activeThesaurusId ? 'active' : '')}
          onClick={() => {
            $tools.electronStore.set('currentThesaurusInfo', item)
            setActiveThesaurusId(item.thesaurusId)
          }}
        >
          <div className="info-item">
            <div>{item.message}</div>
            <div style={{ color: '#5a5d5a' }}>{item.translateMessage}</div>
          </div>

          <div className="operation">
            <Button
              type="default"
              size="middle"
              onClick={() => {
                setEditState(true)
                setShowModal(true)
                setThesaurusInfo(item)
                setBeforeTranslate(item.message)
                setAfterTranslate(item.translateMessage)
              }}
            >
              修改
            </Button>
            <Popconfirm
              placement="left"
              title="请再次确认!"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                $api
                  .operationQuickReplyData(
                    'delThesaurus',
                    { id: item.thesaurusId },
                    {
                      method: 'POST',
                    }
                  )
                  .then((res) => {
                    if (allQuickReplyData.length <= 1) {
                      requestQuickReplyData(currentPage - 1)
                    } else requestQuickReplyData(currentPage)

                    if (res.code) {
                      message.success('删除成功')
                    } else message.warning('网络异常, 请稍后再试')
                  })
              }}
            >
              <Button type="default" size="middle">
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
      )
    })
  }

  // 处理modal内受控组件
  const handleTextareaValue = (e: any, type?: string) => {
    if (type === 'left') {
      setBeforeTranslate(e.target.value)
    } else {
      setAfterTranslate(e.target.value)
    }
  }

  // 处理modal内翻译按钮点击
  const addQuickReplyTranslate = () => {
    if (!beforeTranslate) return message.error('翻译信息不能为空')
    ipcRenderer.send('startTranslation', {
      chatLanguage: operationLanguage[0],
      translateIntoLanguage: operationLanguage[1],
      message: beforeTranslate,
    })
  }

  // 处理modal确定按钮
  const handleModalOk = () => {
    if (!beforeTranslate || !afterTranslate) return message.error('数据不能为空')
    setModalLoadingState(true)

    const sendData: any = {
      chatLanguage: operationLanguage[0],
      message: beforeTranslate,
      translateIntoLanguage: operationLanguage[1],
      translateMessage: afterTranslate,
    }
    if (editState) sendData.thesaurusId = thesaurusInfo.thesaurusId
    $api
      .operationQuickReplyData(editState ? 'updateThesaurus' : 'addThesaurus', sendData, { method: 'POST' })
      .then((res: any) => {
        setModalLoadingState(false)
        if (res.code === 200) {
          message.success('操作成功')
        } else {
          message.warning('网络有点小波动, 请稍后再试')
        }
        setShowModal(false)
        if (editState) {
          setEditState(false)
        }
        setBeforeTranslate('')
        setAfterTranslate('')

        requestQuickReplyData()
      })
  }

  // 翻页处理
  const currentPageChange = (page: number) => {
    setCurrentPage(page)
    requestQuickReplyData(page)
  }

  // 发送选中数据
  const sendQuickReplyData = () => {
    const currentThesaurusInfo: any = $tools.electronStore.get('currentThesaurusInfo')
    if (!currentThesaurusInfo.thesaurusId) {
      return message.warn('请选择需要被发送的数据')
    }

    const targetWin: any = $tools.windowList.get($tools.electronStore.get('targetWin') as RouterKey)
    if (!targetWin) return message.error('请先打开目标窗口')
    if ($tools.electronStore.get('targetWin') === 'Facebook') return message.warning('Facebook暂不支持快捷回复')
    targetWin.focus()
    targetWin.send(`replaceValue:${$tools.electronStore.get('targetWin')}`, currentThesaurusInfo)
  }

  ipcRenderer.removeAllListeners('receiveInformation')
  ipcRenderer.on('receiveInformation', (e, data) => {
    setAfterTranslate(data.translate_message)
  })

  return (
    <QuickReplyWrap>
      <Modal
        title={editState ? '修改快捷回复' : '添加快捷回复'}
        bodyStyle={{ backgroundColor: '#e2e2e2' }}
        closable={false}
        getContainer={false}
        visible={showModal}
        confirmLoading={modalLoadingState}
        onOk={handleModalOk}
        onCancel={() => setShowModal(false)}
      >
        <div className="modal-left-part">
          {renderSelect('left', true, operationLanguage[0])}
          <div className="center-line"></div>
          {renderSelect('right', true, operationLanguage[1])}
        </div>

        <div className="modal-text-input">
          <Input.TextArea
            onInput={(e) => handleTextareaValue(e, 'left')}
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={beforeTranslate}
          ></Input.TextArea>
          <Input.TextArea
            onInput={handleTextareaValue}
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={afterTranslate}
          ></Input.TextArea>
        </div>

        <div className="modal-operation-button">
          <Button type="primary" className="translate-button" onClick={addQuickReplyTranslate}>
            翻译
          </Button>
        </div>
      </Modal>
      <div className="container-quickReply">
        <div className="top-part">
          <div className="left-part">
            {renderSelect('left', false, searchDataLanguage[0])}
            <div className="center-line"></div>
            {renderSelect('right', false, searchDataLanguage[1])}
          </div>
          <div className="right-part" onClick={() => setShowModal(true)}>
            <FileAddOutlined />
            <span> 新增快捷回复</span>
          </div>
        </div>
        <div className="content-wrap">
          {renderInfoItem().length ? (
            renderInfoItem()
          ) : (
            <Result
              status="info"
              title="There is no data here"
              extra={
                <Button type="primary" onClick={() => setShowModal(true)}>
                  Now add?
                </Button>
              }
            ></Result>
          )}
          {totalNum ? (
            <Pagination
              size="small"
              total={totalNum}
              pageSize={pageSize}
              current={currentPage}
              onChange={currentPageChange}
            ></Pagination>
          ) : (
            false
          )}
        </div>
        <Button type="primary" className="send-msg-button" onClick={sendQuickReplyData}>
          发送
        </Button>
      </div>
    </QuickReplyWrap>
  )
})
