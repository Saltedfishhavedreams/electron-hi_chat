function searchAppVersion(dataArr: any[]): void {
  dataArr.forEach((item: any) => {
    $api
      .request(
        '/login/searchApplicationInfo',
        { appName: item.appName + '_preload.zip' },
        {
          method: 'POST',
        }
      )
      .then((res) => {
        if (res.code === 200) {
          const appVersion = $store.getState().appVersion
          if (!$tools.hasPlugInFile(item.appName + '_preload') || !appVersion[item.appName]) {
            $store.dispatch({
              type: 'CHANGE_APP_VERSION',
              data: { ...$store.getState().appVersion, [item.appName]: { buttonType: '下载' } },
            })
          } else if (appVersion[item.appName].version !== res.data.newestVersion) {
            $store.dispatch({
              type: 'CHANGE_APP_VERSION',
              data: {
                ...$store.getState().appVersion,
                [item.appName]: { buttonType: '更新', version: appVersion[item.appName].version },
              },
            })
          }

          $store.dispatch({
            type: 'CHANGE_NEW_APP_VERSION',
            data: { ...$store.getState().newAppVersion, [item.appName]: res.data },
          })
        }
      })
  })
}

export function searchAppList(params?: queryTestInfoUsingGET.Params, options?: RequestOptions): void {
  $api.request('/login/searchAppList', params, options).then((res) => {
    if (res.code === 200) {
      $store.dispatch({ type: 'CHANGE_APP_LSIT', data: res.data })
      searchAppVersion(res.data)
    }
  })
}
