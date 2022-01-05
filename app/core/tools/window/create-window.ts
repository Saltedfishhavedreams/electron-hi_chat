import path from 'path'
import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron'
import { log } from '../log'
import routes from '@/src/auto-routes'

const { NODE_ENV, port, host } = process.env

/** 创建新窗口相关选项 */
export interface CreateWindowOptions {
  /** 路由启动参数 */
  params?: any
  /** URL 启动参数 */
  query?: any
  /** BrowserWindow 选项 */
  windowOptions?: BrowserWindowConstructorOptions
  /** 窗口启动参数 */
  createConfig?: CreateConfig
}

/** 已创建的窗口列表 */
export const windowList: Map<RouterKey, BrowserWindow> = new Map()

/**
 * 通过 routes 中的 key(name) 得到 url
 * @param key
 */
export function getWindowUrl(key: RouterKey, options: CreateWindowOptions = {}): string {
  const appInfo = $store.getState().appList.find((item: any) => item.appName === key)
  if (appInfo) {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: '刷新页面',
          accelerator: 'Ctrl+R',
          click() {
            BrowserWindow.getFocusedWindow()?.reload()
          },
        },
      ])
    )
    return appInfo.url
  }
  let routePath = routes.get(key)?.path

  if (typeof routePath === 'string' && options.params) {
    routePath = routePath.replace(/\:([^\/]+)/g, (_, $1) => {
      return options.params[$1]
    })
  }

  const query = options.query ? $tools.toSearch(options.query) : ''

  if (NODE_ENV === 'development') {
    return `http://${host}:${port}#${routePath}${query}`
  } else {
    return `file://${path.join(__dirname, '../renderer/index.html')}#${routePath}${query}`
  }
}

/**
 * 创建一个新窗口
 * @param key
 * @param options
 */
export function createWindow(key: RouterKey, options: CreateWindowOptions = {}): Promise<BrowserWindow> {
  return new Promise((resolve) => {
    const routeConfig: RouteConfig | AnyObj = routes.get(key) || {}

    const windowOptions: BrowserWindowConstructorOptions = {
      ...$tools.DEFAULT_WINDOW_OPTIONS, // 默认新窗口选项
      ...routeConfig.windowOptions, // routes 中的配置的window选项
      ...options.windowOptions, // 调用方法时传入的选项
    }

    const createConfig: CreateConfig = {
      ...$tools.DEFAULT_CREATE_CONFIG,
      ...routeConfig.createConfig,
      ...options.createConfig,
    }

    let activeWin: BrowserWindow | boolean
    if (createConfig.single) {
      activeWin = activeWindow(key)
      if (activeWin) {
        resolve(activeWin)
        return activeWin
      }
    }

    const win = new BrowserWindow(windowOptions)

    if (key === ('Whatsapp' as RouterKey)) {
      win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['sec-ch-ua'] = '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
        // details.requestHeaders['sec-ch-ua-platform'] = 'Windows'
        // details.requestHeaders['Upgrade-Insecure-Requests'] = '1'
        // details.requestHeaders['Referer'] = 'https://www.whatsapp.com/'
        details.requestHeaders['User-Agent'] =
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        callback({ requestHeaders: details.requestHeaders })
      })
    }

    const url = getWindowUrl(key, options)
    windowList.set(key, win)
    win.loadURL(url)

    if (createConfig.saveWindowBounds) {
      const lastBounds = $tools.settings.windowBounds.get(key)
      if (lastBounds) win.setBounds(lastBounds)
    }

    if (createConfig.hideMenus) win.setMenuBarVisibility(false)
    if (createConfig.created) createConfig.created(win)

    win.webContents.on('dom-ready', () => {
      win.webContents.send('dom-ready', createConfig)
    })

    win.webContents.on('did-finish-load', () => {
      if (createConfig.autoShow) {
        if (createConfig.delayToShow) {
          setTimeout(() => {
            win.show()
          }, createConfig.delayToShow)
        } else {
          win.show()
        }
      }
      resolve(win)
    })

    win.once('ready-to-show', () => {
      if (createConfig.openDevTools) win.webContents.openDevTools()
    })

    win.once('show', () => {
      log.info(`Window <${key}:${win.id}> url: ${url} opened.`)
    })

    win.on('close', () => {
      if (createConfig.saveWindowBounds && win) {
        $tools.settings.windowBounds.set(key, win.getBounds())
      }
      windowList.delete(key)
      log.info(`Window <${key}:${win.id}> closed.`)
    })
  })
}

/**
 * 激活一个已存在的窗口, 成功返回 BrowserWindow 失败返回 false
 * @param key
 */
export function activeWindow(key: RouterKey): BrowserWindow | false {
  const win: BrowserWindow | undefined = windowList.get(key)

  if (win) {
    win.show()
    return win
  } else {
    return false
  }
}
