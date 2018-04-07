import Layout from '../components/MyLayout.js'
import Head from 'next/head'

export default () => (
    <Layout site={this.props.site}>
        <Head>
          <title>About</title>
        </Head>
       <p>This is the about page</p>
    </Layout>
)
