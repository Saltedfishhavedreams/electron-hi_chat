import { app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'
import fs from 'fs'

// 递归删除文件
function rmdir(filePath: any) {
  fs.stat(filePath, function (err: any, stat: any) {
    if (err) return console.log(err)
    if (stat.isFile()) {
      fs.unlink(filePath, () => null)
    } else {
      fs.readdir(filePath, function (err: any, data: any) {
        if (err) return console.log(err)
        const dirs: any = data.map((dir: any) => path.join(filePath, dir))
        dirs.forEach((item: any) => {
          fs.unlinkSync(item)
        })
      })
    }
  })
}

// 版本检查
export function findAppVersion(): any {
  function sendUpdateInfo(info: any, type?: string) {
    $tools.windowList.get('Login')?.webContents.send(type || 'searchAppVersion', info)
  }

  const message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，是否需要下载',
  }

  autoUpdater.setFeedURL('http://139.224.194.21:9999/public/')

  // 取消自动下载
  autoUpdater.autoDownload = false

  autoUpdater.on('checking-for-update', (e) => {
    $tools.log.log(e)
    // 开始检测新安装包
    // sendUpdateInfo({
    //   type: 'checking-for-update',
    //   message: message.checking,
    // })
  })

  autoUpdater.on('error', (e) => {
    $tools.log.error(e)
    // 升级失败
    // sendUpdateInfo({
    //   type: 'error',
    //   message: message.error,
    // })
  })

  autoUpdater.on('update-available', (e) => {
    $tools.log.log(e)
    // 检测有新安装包
    const cacheExePath = path.join(process.env.LOCALAPPDATA as string, `${app.getName()}-updater\\pending`)
    if (fs.existsSync(cacheExePath)) {
      rmdir(cacheExePath)
    }

    sendUpdateInfo(
      {
        type: 'update-available',
        message: message.updateAva,
        version: e.version,
      },
      'new-version-found'
    )
  })

  autoUpdater.on('update-not-available', (e) => {
    $tools.log.log(e)
    // 检测无可用安装包
    // sendUpdateInfo({
    //   type: 'update-not-available',
    // })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    $tools.log.log(progressObj)
    // 更新下载进度
    $tools.windowList.get('Update')?.webContents.send('download-progress', progressObj)
  })

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
  })

  ipcMain.on('checkForUpdates', () => {
    // 开始检测新版本
    autoUpdater.checkForUpdates()
  })

  ipcMain.on('confirm-downloadUpdate', () => {
    // 手动下载更新文件
    autoUpdater.downloadUpdate()
  })
}
