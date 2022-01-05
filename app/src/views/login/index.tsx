import * as React from 'react'
import { ipcRenderer } from 'electron'

import LoginFormTKY from './components'

interface LoginProps extends PageProps, StoreProps {}
declare interface LoginState {}

export default class Login extends React.Component<LoginProps, LoginState> {
  componentDidMount(): void {
    if (this.props.query.startCheckForUpdate) {
      ipcRenderer.on('new-version-found', this.handleFoundNewVersion)
      ipcRenderer.send('checkForUpdates')
    }
  }

  componentWillUnmount(): void {
    ipcRenderer.removeAllListeners('new-version-found')
  }

  handleFoundNewVersion(): void {
    $tools.createWindow('Update', {
      windowOptions: {
        modal: true,
        parent: $tools.windowList.get('Login'),
        frame: false,
        resizable: false,
      },
      // createConfig: {
      //   openDevTools: true,
      // },
    })
  }

  render(): JSX.Element {
    return <LoginFormTKY {...this.props}></LoginFormTKY>
  }
}
