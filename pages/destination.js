import React, { Component } from 'react'
import config, {configSite} from '../config'
import queryString from 'query-string'
import Layout from '../components/MyLayout.js'

import NoMatch from '../containers/NoMatch'
import { getDestination, getDestinations, getItems, strings } from '../data';

import FinalDestination from '../containers/FinalDestination';
import ParentDestination from '../containers/ParentDestination';

export default class extends Component {

	static async getInitialProps({ req, query }) {
		const site = configSite(req);
		const destination = await getDestination(query.slug, {site:site.slug})
		const category = query.category ? query.category : 'Alojamiento';

		let results, children;

		if (destination) {
			children = await getDestinations({site:site.slug, _parent:destination._id});
			if(!(children && children.lenght > 0)) {
				results = await getItems({
					category,
					_destination:destination._id
				});
			}   
      	}

      	return {
			destination,
			category,
			results,
			children,
      		site
      	}
	}

	render() {
		if(!this.props.destination) {
			return (
				<Layout site={this.props.site}>
					<NoMatch  />
				</Layout>
			)
		}
		console.log("PROS :> ",this.props);
		if(this.props.children && this.props.children.length > 0){
			return (
				<Layout site={this.props.site}  page={this.props.destination} >
					<ParentDestination {...this.props} />
				</Layout>
			);
		}
		
		return (
			<Layout site={this.props.site}  page={this.props.destination} >
				<FinalDestination {...this.props} />
			</Layout>
		);
	}
}

