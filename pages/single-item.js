import { Component } from 'react'
import { getItem } from '../data/'

import Layout from '../components/MyLayout.js'
import SingleItem from '../containers/SingleItem'
import {configSite} from '../config'

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
				<SingleItem item={this.props.item} />
		  	</Layout>
		)
	}
}