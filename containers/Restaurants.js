import React, { Component } from 'react'
import {Header, Listing } from '../components'

export default class Restaurants extends Component {

	render() {
		console.log("props restaurant",this.props)
		return(
			<div>
			  <Header src={ '/static/images/restaurants.jpg' } title={ 'Restaurantes' }  />
			  <Listing 	results={this.props.results} 
			  			category={this.props.category} 
			  			showBanners={false} 
			  			site={this.props.site} />
			</div>
		)
	}
}