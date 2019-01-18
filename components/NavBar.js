import React, { Component } from 'react';
import Link from 'next/link'
import styled from 'styled-components'

import { getMainMenu } from '../data/'

// This is the custom wrapper component you would build and use just like `next/link`:

class MyLink extends React.Component {
  render () {
    const { onCustomClick, ...props } = this.props
    return <a {...props} onClick={this.handleClick} />
  }

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event)
    }
  }
}

function Menu({ menu }) {
  if (menu instanceof Array) {
    return (
      <ul id="responsive">
        { menu.map((item) => (
          <MenuItem key={item.href} menuItem={item} />
        )) }
      </ul>
    )
  } else {
    return null
  }
}

function MenuItem({ menuItem, onClick }) {
  return (
    <li><Link prefetch href={menuItem.href} ><MyLink onCustomClick={onClick}>{menuItem.html}</MyLink></Link>
      {(() => {
        if (menuItem.children instanceof Array) {
          return (
            <ul>
              { menuItem.children.map((item) => (
                <MenuItem key={item.href} menuItem={item} />
              )) }
            </ul>
          )
        }
      })()}
    </li>
  )
}

const FullScreenOverlay = styled.div`
  /* Height & width depends on how you want to reveal the overlay (see JS below) */    
  width: 100%;
  height: 100%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  margin-bottom: 70px;
  background-color: white; /* Black fallback color */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
  display:table;
`;

const MobileMenuList = styled.ul`
  text-align:center;
  display: table-cell;
  vertical-align: middle;
  font-size: 22px;
  line-height: 60px;
  list-style:none;
`

function MobileMenu({ menu, toggleMenu }) {
  return (
    <FullScreenOverlay >
      <i onClick={toggleMenu}
        className="fa fa-times"
        style={{
          background: 'transparent',
          width: 'auto',
          margin: '0px',
          padding: '12px 15px',
          position: 'absolute',
          right: '15px',
          top: '15px'
        }} />
      <MobileMenuList >
        { menu.map((item) => (
          <MenuItem key={item.href} menuItem={item} onClick={toggleMenu}/>
        )) }
      </MobileMenuList>
    </FullScreenOverlay>
  )
}

const Icon = styled.i`
  background:transparent!important;
  width:auto!important;
  margin: 0px!important;
  padding: 12px 15px!important;
`

const Header = styled.header`
  position:relative!important;
  z-index:9999!important;
`
export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    console.log("open", !this.state.menuOpen)
    const menuOpen = !this.state.menuOpen;
    this.setState({ menuOpen });
    document.body.style.overflowY = menuOpen ? 'hidden' : 'auto';
  }

  render() {
    const menu = getMainMenu()
    return (
      <Header id="header-container" >
        <div id="header" >
          <div className="container">
            <div id="logo">
              <Link href="/"><a><img src={this.props.site.logo} alt="" /></a></Link>
            </div>

            {
              <div className="menu-responsive" style={{
                position: 'absolute',
                right: '15px',

                width: 'auto'
              }} >
                <i onClick={this.toggleMenu}
                  className="fa fa-reorder"
                  style={{
                    background: 'transparent',
                    width: 'auto',
                    margin: '0px',
                    padding: '12px 15px'
                  }} />
                { this.state.menuOpen && <MobileMenu toggleMenu={this.toggleMenu} menu={menu.left} />}
              </div>
            }

            <nav id="navigation" className="style-1">
              <Menu menu={menu.left} />
            </nav>
            <div className="clearfix"></div>
          </div>
        </div>
      </Header>
    )
  }
}