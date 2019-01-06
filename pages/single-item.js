import { Component } from 'react'
import { getItem } from '../data/'

import Layout from '../components/MyLayout.js'
import SingleItem from '../containers/SingleItem'
import {configSite} from '../config'
import Head from 'next/head'
import NoMatch from '../containers/NoMatch'

export default class extends Component {

	static async getInitialProps({ req, query }) {
		let item;
		try {
			item = await getItem(query.slug);
			console.log(item)
		} catch(e) {
			console.log(e)
		}
		const site = configSite(req);
      	
		return {
			item,
			site
		}
	}

	render() {
		if (!this.props.item) return (
			<Layout site={this.props.site}>
				<NoMatch />
			</Layout>
		);
		return(
			<Layout site={this.props.site}>
				<Head>
					<title>{ this.props.item.name } - {this.props.site.name}</title>
				</Head>
				<SingleItem item={this.props.item} site={this.props.site} />
		  	</Layout>
		)
	}
}