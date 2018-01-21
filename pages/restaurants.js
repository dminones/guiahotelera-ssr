import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Restaurants from '../containers/Restaurants'
import { Component } from 'react'
import { getItems } from '../data/'
import { configSite } from '../config'

export default class extends Component {

	static async getInitialProps({ req, query }) {
		const site = configSite(req);
		const results = await getItems({
			category: 'Restaurant',
			site: site.slug
		});

		return {
			site,
			category: 'Restaurant',
			results
		}
	}

	render() {
		return(
			<Layout site={this.props.site}>
				<Restaurants {...this.props} />
			</Layout>
		)
	}
}