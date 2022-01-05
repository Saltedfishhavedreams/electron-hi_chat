export const initialState = {
  allQuickReplyData: [],
}

export function CHANGE_QUICK_REPLY_DATA(
  data: StoreDatas['CHANGE_QUICK_REPLY_DATA']
  // state: StoreStates,
  // action: StoreAction<'CHANGE_USERINFO'>
): { allQuickReplyData: StoreStates['allQuickReplyData'] } {
  // console.log({ data, state, action })
  return { allQuickReplyData: data }
}

declare global {
  interface StoreStates {
    allQuickReplyData: any[]
  }

  interface StoreDatas {
    CHANGE_QUICK_REPLY_DATA: StoreStates['allQuickReplyData']
  }
}
