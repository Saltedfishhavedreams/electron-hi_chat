import * as React from 'react'
import FunctionContent from './components'

interface ForgetProps extends PageProps, StoreProps {}
declare interface ForgetState {}

export default class FunctionPage extends React.Component<ForgetProps, ForgetState> {
  render(): JSX.Element {
    return <FunctionContent></FunctionContent>
  }
}
