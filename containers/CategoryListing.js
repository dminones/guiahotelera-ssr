import React, { Component } from 'react'
import {Header, Listing } from '../components'

export default class CategoryListing extends Component {

	render() {
		return(
			<div>
			  <Header src={ this.props.img } title={ this.props.name }  />
			  <Listing 	results={this.props.results} 
			  			category={this.props.category} 
			  			showBanners={false} 
			  			site={this.props.site} />
			</div>
		)
	}
}