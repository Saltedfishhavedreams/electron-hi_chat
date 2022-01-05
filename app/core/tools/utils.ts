import fs from 'fs'
import os from 'os'
import path from 'path'

/**
 * 格式化日期
 * @param d
 * @param format 'YYYY-MM-DD H:I:S.MS'
 */
export function formatDate(date: Date = new Date(), format = 'YYYY-MM-DD H:I:S.MS'): string {
  const obj = {
    YYYY: date.getFullYear().toString().padStart(4, '0'),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    H: date.getHours().toString().padStart(2, '0'),
    I: date.getMinutes().toString().padStart(2, '0'),
    S: date.getSeconds().toString().padStart(2, '0'),
    MS: date.getMilliseconds().toString().padStart(3, '0'),
  }

  return format.replace(/(YYYY|MM|DD|H|I|S|MS)/g, (_, $1) => {
    return obj[$1]
  })
}

/**
 * 获取 url 参数
 * @param search
 */
export function getQuery(search = window.location.search): AnyObj {
  const query: AnyObj = {}
  search
    .substr(1)
    .split('&')
    .forEach((str) => {
      const strArr = str.split('=')
      const key = strArr[0]

      if (!key) return

      let val = decodeURIComponent(strArr[1])
      try {
        val = JSON.parse(val)
      } catch (err) {}

      if (typeof val === 'number') {
        if (!Number.isSafeInteger(val)) val = decodeURIComponent(strArr[1])
      }

      query[key] = val
    })
  return query
}

/**
 * 转换成 url search
 * @param obj
 */
export function toSearch(obj: AnyObj): string {
  const arr = Object.keys(obj).map((key) => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
        console.error(err)
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return '?' + arr.join('&')
}

/**
 * 判断本地是否有翻译插件
 */
export function hasPlugInFile(item: string): any {
  // 查询本地是否有目标目录
  return fs.existsSync(
    path.join(`${os.homedir()}`, `AppData/Local/google/Chrome/User Data/Default/Extensions/${item}/${item}.js`)
  )
}

/**
 * 退出
 */
export function logout(warningInfo?: string): any {
  $store.dispatch({
    type: 'CHANGE_USERINFO',
    data: {},
  })
  $tools.windowList.forEach((item) => item.close())
  $tools.createWindow('Login', { query: { warningInfo: warningInfo || '' } })
}
