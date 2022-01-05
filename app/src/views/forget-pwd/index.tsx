import * as React from 'react'
import ForgetPWDFormTKY from './components'

interface ForgetProps extends PageProps, StoreProps {}
declare interface ForgetState {}

export default class ForgetPWD extends React.Component<ForgetProps, ForgetState> {
  render(): JSX.Element {
    return <ForgetPWDFormTKY></ForgetPWDFormTKY>
  }
}
