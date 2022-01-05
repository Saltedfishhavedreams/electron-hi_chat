import { app, Tray, session, BrowserWindow } from 'electron'
import { zip } from 'compressing'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { creatAppTray } from './tray'
import { findAppVersion } from './checkUpdate'

let tray: Tray

app.allowRendererProcessReuse = true

const appLock = app.requestSingleInstanceLock()

app.setAppUserModelId('hiChat.com')

if (!appLock) {
  // 作为第二个实例运行时, 主动结束进程
  app.quit()
}

app.on('second-instance', () => {
  // 当运行第二个实例时, 打开或激活首页
  if ($store.getState().userInfo.token) {
    $tools.createWindow('Home')
  } else {
    $tools.createWindow('Login', { windowOptions: { resizable: false } })
  }
})

app.on('ready', () => {
  tray = creatAppTray()
  findAppVersion()
  $tools.createWindow('Login', {
    windowOptions: { resizable: false },
    query: { startCheckForUpdate: true },
  })
  session.defaultSession.on('will-download', (event: any, item: any) => {
    // 设置下载路径
    item.setSavePath(
      path.join(
        `${os.homedir}`,
        `AppData/Local/google/Chrome/User Data/Default/Extensions/${item.getFilename()}`
      )
    )

    // 下载进度监听
    // item.on('updated', () => {})

    // 下载完成监听
    item.on('done', async (e: any, state: any) => {
      // 下载完成
      if (state === 'completed') {
        // 解压压缩包
        await zip.uncompress(
          path.join(
            `${os.homedir}`,
            `AppData/Local/google/Chrome/User Data/Default/Extensions/${item.getFilename()}`
          ),
          path.join(`${os.homedir}`, 'AppData/Local/google/Chrome/User Data/Default/Extensions/')
        )
        // 压缩包删除
        fs.unlinkSync(
          path.join(
            `${os.homedir}`,
            `AppData/Local/google/Chrome/User Data/Default/Extensions/${item.getFilename()}`
          )
        )
        const appName: any = item.getFilename().split('_preload')[0]
        $store.dispatch({
          type: 'CHANGE_APP_VERSION',
          data: {
            ...$store.getState().appVersion,
            [appName]: {
              buttonType: '打开',
              version: $store.getState().newAppVersion[appName].newestVersion,
            },
          },
        })

        BrowserWindow.getFocusedWindow()?.webContents.send(
          'pluginDownloadOver',
          item.getFilename().split('_preload')[0]
        )
      }
    })
  })
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createWindow('Login')
  }
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)

  if (process.platform === 'win32') {
    tray.destroy()
  }
})
