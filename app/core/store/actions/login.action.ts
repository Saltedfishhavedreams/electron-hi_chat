export const initialState = {
  userInfo: { token: '' },
}

export function CHANGE_USERINFO(
  data: StoreDatas['CHANGE_USERINFO']
  // state: StoreStates,
  // action: StoreAction<'CHANGE_USERINFO'>
): { userInfo: StoreStates['userInfo'] } {
  // console.log({ data, state, action })
  return { userInfo: data }
}

declare global {
  interface StoreStates {
    userInfo: any
  }

  interface StoreDatas {
    CHANGE_USERINFO: StoreStates['userInfo']
  }
}
