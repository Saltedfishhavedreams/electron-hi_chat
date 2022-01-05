import * as React from 'react'

import MenuFormTKY from './components'

interface MenuProps extends PageProps, StoreProps {}
declare interface MenuState {}

export default class Menu extends React.Component<MenuProps, MenuState> {
  render(): JSX.Element {
    return <MenuFormTKY {...this.props}></MenuFormTKY>
  }
}
