import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import React, { Component } from 'react'
import config, {configSite} from '../config'
import {Header, Listing } from '../components'
import queryString from 'query-string'
import styled, { keyframes } from 'styled-components';
import NoMatch from '../containers/NoMatch'
import { getDestination, getItems, strings } from '../data';
import Head from 'next/head'

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
		const destination = this.props.destination;
		const catText = this.props.category ? 
                  ((strings[this.props.category] && strings[this.props.category].plural) ? strings[this.props.category].plural :  this.props.category) : 
                  'Atracciones';
		if(!destination) {
			return (
				<Layout site={this.props.site}>
					<NoMatch  />
				</Layout>
			)
		}
		return(
			<Layout site={this.props.site}>
				<Head>
					<title>{catText} en {destination.name} - {this.props.site.name}</title>
				</Head>
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

