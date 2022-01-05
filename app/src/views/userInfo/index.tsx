import * as React from 'react'
import UserInfoContent from './components'

interface ForgetProps extends PageProps, StoreProps {}
declare interface ForgetState {}

export default class UserInfo extends React.Component<ForgetProps, ForgetState> {
  render(): JSX.Element {
    return <UserInfoContent></UserInfoContent>
  }
}
