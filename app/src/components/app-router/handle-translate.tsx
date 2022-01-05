import React, { memo, useEffect, useState } from 'react'
import { remote } from 'electron'

import db from '@/core/tools/catch-db/translate-catch'

import { message } from 'antd'

const { translate_catch_bd } = db

let translateTimer: any

export default memo(function HandleTranslate() {
  const [infoArray, setInfoArray]: any = useState([])

  useEffect(() => {
    remote.ipcMain.removeAllListeners('startTranslation')
    remote.ipcMain.on('startTranslation', handleIpcEvent)

    remote.ipcMain.removeAllListeners('clearTranslateList')
    remote.ipcMain.on('clearTranslateList', () => {
      setInfoArray([])
    })

    // 处理 preload 未知的错误
    remote.ipcMain.removeAllListeners('preload:error')
    remote.ipcMain.on('preload:error', (e, msg) => {
      $tools.windowList.get('Home')?.show()
      message.warn(msg)
    })

    return () => {
      remote.ipcMain.removeAllListeners('clearTranslateList')
      remote.ipcMain.removeAllListeners('startTranslation')
      remote.ipcMain.removeAllListeners('preload:error')
    }
  }, [])

  useEffect(() => {
    if (!infoArray[0]) return
    if (translateTimer) clearTimeout(translateTimer)
    translateTimer = setTimeout(() => {
      $api
        .translate('bdTranslate', infoArray[0][1], { method: 'POST' })
        .then((res: any) => {
          if (res.code === 200) {
            translate_catch_bd.put({ ...infoArray[0][1], translate_message: res.data.message })
            translate_catch_bd.put({
              ...infoArray[0][1],
              translate_message: res.data.message,
              chatLanguage: 'auto',
            })
            translate_catch_bd.put({
              chatLanguage: 'auto',
              translate_message: infoArray[0][1].message,
              message: res.data.message,
              translateIntoLanguage: res.data.chatLanguage,
            })
            infoArray[0][0].sender.send(
              'receiveInformation',
              { ...infoArray[0][1], translate_message: res.data.message },
              infoArray[0][2]
            )
          }
          setInfoArray(infoArray.slice(1))
        })
        .catch((err) => {
          if (err.code === 500 && err.msg) {
            $tools.windowList.get('Home')?.show()
            message.error(err.msg)
          }
        })
    }, 900)
  }, [infoArray])

  const handleIpcEvent = async (
    e: any,
    translateInfo: any,
    msgItemId?: string,
    noDeduction?: boolean
  ): Promise<any> => {
    const data = await translate_catch_bd.where(translateInfo).toArray()
    if (data[0]) {
      if (!noDeduction) {
        try {
          await $api.translate('translateCost', { message: translateInfo.message }, { method: 'POST' })
        } catch (err: any) {
          if (err.code === 500 && err.msg) {
            $tools.windowList.get('Home')?.show()
            return message.error(err.msg)
          }
        }
      }
      return e.sender.send('receiveInformation', data[data.length - 1], msgItemId)
    }

    if (!infoArray.find((item: any) => item[2] === msgItemId))
      setInfoArray((data: any) => {
        const arr = [...data]
        arr.unshift([e, translateInfo, msgItemId])
        return arr
      })
  }
  return <div></div>
})
