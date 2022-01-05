import * as React from 'react'
import RegisterFormTKY from './components'

interface ForgetProps extends PageProps, StoreProps {}
declare interface ForgetState {}

export default class Register extends React.Component<ForgetProps, ForgetState> {
  render(): JSX.Element {
    return <RegisterFormTKY></RegisterFormTKY>
  }
}
