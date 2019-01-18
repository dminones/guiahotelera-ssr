import React, { Component } from 'react'
import Layout from '../components/MyLayout.js'
import { Post } from '../containers'
import { getPost } from '../data/'
import {configSite} from '../config'
export default class extends Component {

	static async getInitialProps({ req, query }) {
		let post;
		try {
			post = await getPost(query.slug);
			console.log(item)
		} catch(e) {
			console.log(e)
		}
		const site = configSite(req);
		return {
			post,
			site
		}
    }
    
    render() {
        const { post, site } = this.props;
        return (
            <Layout site={site}>
               <Post site={site} post={post} />
            </Layout>
        )
    }
}