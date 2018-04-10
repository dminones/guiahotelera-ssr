import React, { Component } from 'react'
import {Header, Listing } from '../components'

export default class CategoryListing extends Component {

	render() {
		console.log("CATEGORT LISTING")
		return(
			<div>
			  <Header src={ this.props.img } title={ this.props.name }  />
			  <Listing 	results={this.props.results} 
			  			category={this.props.category} 
			  			site={this.props.site} />
			</div>
		)
	}
}