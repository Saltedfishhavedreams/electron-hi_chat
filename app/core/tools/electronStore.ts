import Store from 'electron-store'

const schema: any = {
  appVersion: {
    type: 'object',
    default: {},
  },
  ourLanguage: {
    // 我方语言     索引0 我方选择语言 索引1 需要翻译成的语言
    type: 'array',
    default: ['zh', 'en'],
  },
  otherPartLanguage: {
    // 对方语言   索引0 我方选择语言 索引1 需要翻译成的语言
    type: 'array',
    default: ['auto'],
  },
  translateBoxFlag: {
    // 控制预翻译框是否可以翻译
    type: 'boolean',
    default: false,
  },
  isAutoTranslate: {
    // 聊天是否自动翻译
    type: 'boolean',
    default: false,
  },
  currentThesaurusInfo: {
    // 在词库需要被发送的信息
    type: 'object',
    default: {},
  },
  telegramUserPhone: {
    // telegram用户的手机号
    type: 'string',
    default: '',
  },
  targetWin: {
    // 需要被发送的窗口
    type: 'string',
    default: 'Telegram',
  },
  translateHistory: {
    // 翻译框历史翻译
    type: 'array',
    default: [],
  },
}

export const electronStore = new Store({ schema })
