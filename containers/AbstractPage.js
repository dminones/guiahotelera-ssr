import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import CategoryListing from '../containers/CategoryListing'
import { Component } from 'react'
import { getItems } from '../data/'
import { configSite } from '../config'
import Head from 'next/head'

export default class extends Component {

	static async getInitialProps({ req, query }) {
		const site = configSite(req);
		const results = await getItems({
			category: this.pageConfig().category,
			site: site.slug
		});

		return 	{
					...this.pageConfig(),
					...{
						site,
						results
					}
				}
	}

	render() {
		return(
			<Layout site={this.props.site}>
                <Head>
					<title>{ this.props.name } - {this.props.site.name}</title>
				</Head>
				<CategoryListing {...this.props} />
			</Layout>
		)
	}
}