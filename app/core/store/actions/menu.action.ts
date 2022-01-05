import { electronStore } from '@/core/tools/electronStore'

export const initialState = {
  appVersion: electronStore.get('appVersion') || {},
  newAppVersion: {},
  appList: [],
}

export function CHANGE_APP_VERSION(
  data: StoreDatas['CHANGE_APP_VERSION']
): { appVersion: StoreStates['appVersion'] } {
  electronStore.set('appVersion', data)
  return { appVersion: data }
}

export function CHANGE_NEW_APP_VERSION(
  data: StoreDatas['CHANGE_NEW_APP_VERSION']
): { newAppVersion: StoreStates['newAppVersion'] } {
  return { newAppVersion: data }
}

export function CHANGE_APP_LSIT(data: StoreDatas['CHANGE_APP_LSIT']): { appList: StoreStates['appList'] } {
  return { appList: data }
}

declare global {
  interface StoreStates {
    appVersion: any
    newAppVersion: any
    appList: any[]
  }

  interface StoreDatas {
    CHANGE_APP_VERSION: StoreStates['appVersion']
    CHANGE_NEW_APP_VERSION: StoreStates['newAppVersion']
    CHANGE_APP_LSIT: StoreStates['appList']
  }
}
