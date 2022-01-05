import * as React from 'react'

import UpdateContent from './components'

interface MenuProps extends PageProps, StoreProps {}
declare interface MenuState {}

export default class Update extends React.Component<MenuProps, MenuState> {
  render(): JSX.Element {
    return <UpdateContent></UpdateContent>
  }
}
