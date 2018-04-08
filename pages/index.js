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

    const [popularDestinations, parentDestinations, items] = await Promise.all(
      [
        getDestinations({ site: site.slug, onlyOrdered:1}),
        site.showRegions ? getDestinations({ site: site.slug, _parent:0}) : null,
        getItems( { publicationType:"Premium", site:site.slug})
      ]
    );

    return {
      popularDestinations,
      parentDestinations,
      items,
      site
    }
  }

  render() {
    console.log("SITE   ",this.props.site);
    return (
      <Layout site={this.props.site}>
        <Head>
          <title>{this.props.site.name} -  {this.props.site.summary}</title>
        </Head>
        <Header src={ getRandomImage(this.props.site) } headerSize="Big" headerFixed={false} >
          <SearchContainer  site={this.props.site}/>
        </Header>
        <Destinations page={6} 
                      destinations={this.props.parentDestinations}
                      title={'Regiones en '+this.props.site.country}
                      summary={''}
                      moreText="Más Regiones"  />
                      
        <Destinations page={6} 
                      destinations={this.props.popularDestinations} 
                      style={{backgroundColor:"#f8f8f8"}} />
        <Items site={this.props.site.slug} results={this.props.items} style={{backgroundColor:"#ffffff"}}/>
        <Banners page={6} site={this.props.site.slug} />
      </Layout>
    )
  }
}