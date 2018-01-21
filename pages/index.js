import { Component } from 'react'
import Link from 'next/link'

import Layout from '../components/MyLayout.js'
import { Header, Destinations, Search, Items, Banners } from '../components'
import config, {configSite} from '../config'
import { getRandomImage, getDestinations, getItems } from '../data';
import Head from 'next/head'

function SearchContainer({site}) {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-push-2">
            <h1 style={{  color:'white' }} >Encontra Hoteles en { site.country } </h1>
            <h4 style={{  color:'white' }} >Expolora los mejores destinos, hoteles y más</h4>
            <Search />
          </div>
        </div>
      </div>
  )
}

export default class extends Component {

  static async getInitialProps({ req, query }) {
    const site = configSite(req);
    const destinations = await getDestinations({
                            site: site.slug
                          });
    const items = await getItems( { 
                          publicationType:"Premium", 
                          site:site.slug
                        });
    return {
      destinations,
      items,
      site: site
    }
  }

  render() {
   
    return (
      <Layout site={this.props.site}>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header src={ getRandomImage(this.props.site) } headerSize="Big" headerFixed={false} >
          <SearchContainer  site={this.props.site}/>
        </Header>
        <Destinations page={6} 
                      site={this.props.site.slug} 
                      destinations={this.props.destinations} />
        <Items site={this.props.site.slug} results={this.props.items}/>
        <Banners page={6} site={this.props.site.slug} />
      </Layout>
    )
  }
}