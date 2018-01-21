import React, { Component } from 'react';
import Link from 'next/link'

import { getMainMenu } from '../data/'

function Menu ({ menu }) {
  if(menu instanceof Array) {
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

function MenuItem ({ menuItem }) {
  return (
    <li><Link href={ menuItem.href } ><a >{menuItem.html}</a></Link>
    {(() => {
      if(menuItem.children instanceof Array) {
        return (
          <ul>
          { menuItem.children.map((item) => (
            <MenuItem key={item.href}  menuItem={item} />
          )) }
          </ul>
        )
      }
    })()}
    </li>
  )
}

export default class NavBar extends Component {

  	render () {
  		const menu = getMainMenu()
	    return (
		    <header id="header-container" >
		      <div id="header" >
		        <div className="container">     
		            <div id="logo">
		              <Link href="/"><a><img src={ this.props.site.logo } alt="" /></a></Link>
		            </div>

              {/* 
                <div className="menu-responsive">
                  <i className="fa fa-reorder menu-trigger"></i>
                </div>
              */}

		            <nav id="navigation" className="style-1">
		              <Menu menu={ menu.left } />
		            </nav>
		            <div className="clearfix"></div>
		        </div>
          </div>
		    </header>
	    )
  	}
}