import { app, BrowserWindowConstructorOptions } from 'electron'
import { asAssetsPath } from './paths'

/** 应用名称 */
export const APP_NAME = app.name

/** 应用版本 */
export const APP_VERSION = app.getVersion()

/** 应用标题 */
export const APP_TITLE = 'Hi Chat'

/** 应用主图标 (桌面) */
export const APP_ICON = asAssetsPath('icons/256x256.png')

/** 亮色风格托盘图标 标准尺寸 16*16, 系统会自动载入 @2x 和 @3x */
export const TRAY_ICON_LIGHT = asAssetsPath('icons/icon.ico')

/** 暗色风格托盘图标 (仅 macOS) */
export const TRAY_ICON_DARK = asAssetsPath('icons/icon.ico')

/** 创建新窗口时默认加载的选项 */
export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  icon: APP_ICON,
  minWidth: 200,
  minHeight: 200,
  width: 800,
  height: 600,
  show: false,
  hasShadow: true,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    scrollBounce: true,
    enableRemoteModule: true,
  },
  titleBarStyle: 'hidden', // 隐藏标题栏, 但显示窗口控制按钮
  // frame: process.platform === 'darwin' ? true : false, // 无边框窗口
  frame: false, // 无边框窗口
  // skipTaskbar: false, // 是否在任务栏中隐藏窗口
  // backgroundColor: '#fff',
  // transparent: true, // 窗口是否透明
  // titleBarStyle: 'hidden',
  // vibrancy: 'fullscreen-ui', // 毛玻璃效果
}

export const DEFAULT_CREATE_CONFIG: CreateConfig = {
  showSidebar: false,
  showTitlebar: true,
  autoShow: true,
  delayToShow: 10,
  single: true,
}

// 语言列表
export const languageList = [
  {
    name: '中文',
    typeCode: 'zh',
  },
  {
    name: '繁体中文',
    typeCode: 'cht',
  },
  {
    name: '文言文',
    typeCode: 'wyw',
  },
  {
    name: '英文',
    typeCode: 'en',
  },
  {
    name: '日文',
    typeCode: 'jp',
  },
  {
    name: '韩文',
    typeCode: 'kor',
  },
  {
    name: '粤语',
    typeCode: 'yue',
  },
  {
    name: '泰语',
    typeCode: 'th',
  },
  {
    name: '葡萄牙语',
    typeCode: 'pt',
  },
  {
    name: '希腊语',
    typeCode: 'el',
  },
  {
    name: '保加利亚语',
    typeCode: 'bul',
  },
  {
    name: '芬兰语',
    typeCode: 'fin',
  },
  {
    name: '斯洛文尼亚语',
    typeCode: 'slo',
  },
  {
    name: '法语',
    typeCode: 'fra',
  },
  {
    name: '阿拉伯语',
    typeCode: 'ara',
  },
  {
    name: '德语',
    typeCode: 'de',
  },
  {
    name: '荷兰语',
    typeCode: 'nl',
  },
  {
    name: '爱沙尼亚语',
    typeCode: 'est',
  },
  {
    name: '捷克语',
    typeCode: 'cs',
  },
  {
    name: '瑞典语',
    typeCode: 'swe',
  },
  {
    name: '越南语',
    typeCode: 'vie',
  },
  {
    name: '西班牙语',
    typeCode: 'spa',
  },
  {
    name: '俄语',
    typeCode: 'ru',
  },
  {
    name: '意大利语',
    typeCode: 'it',
  },
  {
    name: '波兰语',
    typeCode: 'pl',
  },
  {
    name: '丹麦语',
    typeCode: 'dan',
  },
  {
    name: '罗马尼亚语',
    typeCode: 'rom',
  },
  {
    name: '匈牙利语',
    typeCode: 'hu',
  },
]
