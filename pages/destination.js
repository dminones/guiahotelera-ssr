import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import React, { Component } from 'react'
import config, {configSite} from '../config'
import {Header, Listing } from '../components'
import queryString from 'query-string'
import styled, { keyframes } from 'styled-components';
import NoMatch from '../containers/NoMatch'
import { getDestination, getItems } from '../data';


export default class extends Component {

	static async getInitialProps({ req, query }) {
		const site = configSite(req);
		const destination = await getDestination(query.slug, {site:site.slug})
		const category = query.category ? query.category : 'Alojamiento';
		var results;

		if (destination) {
		    results = await getItems({
		    	category,
		    	_destination:destination._id
		    });
      	}

      	return {
      		destination,
      		category,
      		results,
      		site
      	}
	}

	render() {
		console.log("site ", this.props.site)
		const destination = this.props.destination
		if(!destination) {
			return (
				<Layout site={this.props.site}>
					<NoMatch  />
				</Layout>
			)
		}
		return(
			<Layout site={this.props.site}>
			  <Header src={ destination.image } title={ destination.name } headerFixed={true} />
			  <Listing 	destination={destination} 
			  			category={this.props.category} 
			  			results={this.props.results} />
			</Layout>
		)
	}
}

const fadeIn = keyframes`
	0% {
		background: #c4cfcf;
		opacity: 0.3;
	}
    50%  {
    	background: #a0bfc0;
    	opacity: 0.5;
  	}
    100% {
		background: #c4cfcf;
		opacity: 0.3;
	}
`;

const LoadingHeader = styled.div`
  animation: ${fadeIn} 2s ease-in-out infinite;
  height:300px;
  width:100%;
`

const LoadingBody = styled.div`
  min-height:500px;
`

