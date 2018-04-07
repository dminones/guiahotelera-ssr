import { Component } from 'react'
import { getItem } from '../data/'

import Layout from '../components/MyLayout.js'
import SingleItem from '../containers/SingleItem'
import {configSite} from '../config'
import Head from 'next/head'

export default class extends Component {

	static async getInitialProps({ req, query }) {
		const item = await getItem(query.slug);
		const site = configSite(req);
      	
		return {
			item,
			site
		}
	}

	render() {
		return(
			<Layout site={this.props.site}>
				<Head>
					<title>{ this.props.item.name } - {this.props.site.name}</title>
				</Head>
				<SingleItem item={this.props.item} />
		  	</Layout>
		)
	}
}