import React, { Component } from 'react';
import { Filtering, ResultListItem } from './index'
import { strings } from '../data'
import { SideBanners, Categories } from './'
import config from '../config'

function Sorting() {
  return(
    null
  )
}


function ResultListWithData({ results, emptyMsg }) {
  console.log("RESULTS",results)
  if(results.length <= 0 ){
    return <div style={{padding:'30px 15px', textAlign:'center', margin:'50px'}}><p >{emptyMsg}</p></div>
  }
  return (
    <div>
      {
        results.map((item) => (
          <ResultListItem key={item._id} item={item} />
        ))
      }
    </div>
  )
}

function ResultList({ results, destination, category, site }) {
  const catText = category ? 
                  ((strings[category] && strings[category].plural) ? strings[category].plural :  category) : 
                  'Atracciones'
  return(
    
    <div className="row">
   
      <div className="col-lg-12 col-md-12">
        <h3 className="margin-top-0 margin-bottom-30">{ catText } en { destination ? destination.name : site.country } </h3>
      </div>
      <ResultListWithData results={results} emptyMsg="No hay resultados para esta búsqueda" />
      
    </div>
  )
}

export default class Listing extends Component {

  constructor(props) {
    super(props)
    var filter = {}
    if (props.destination) {
      filter._destination = props.destination._id
    }

    if (props.category) {
      filter.category = props.category
    }

    this.state = {
      results : this.props.results,
      banners: [],
      filter: filter,
      showBanners: (props.showBanners === false) ? false : true
    }

    this.onChangeFilter = this.onChangeFilter.bind(this)
    this.updateHotels = this.updateHotels.bind(this)
    this.getBanners = this.getBanners.bind(this)
  }

  onChangeFilter(filter) {
    this.setState({
      filter : filter
    })
    
    this.updateHotels(filter)
  }
  
  getBanners() {
    let self = this

    var url = new URL(config.apiUrl+'/banner')
    if(this.props.destination) {
      url.searchParams.append('_destination', this.props.destination._id)
    }
    if(this.props.site) {
      url.searchParams.append('site', this.props.site.slug)
    }

    fetch(url)  
      .then(function(response) {
        response.json().then(function(json) {
            self.setState({
              banners: json
            })
        })
    })
  }

  updateHotels(newFilter) {
    let self = this
    const filter = newFilter ? newFilter : this.state.filter
    var url = new URL(config.apiUrl+'/item')
    if(filter) {
      Object.keys(filter).forEach(key => url.searchParams.append(key, filter[key]))
    }

    if(this.props.site) {
      url.searchParams.append('site', this.props.site.slug)
    }

    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function(json) { 
      if(json.error) { throw new TypeError(json.error.message); }
      self.setState({
        results : json
      })
    })
    .catch(function(error) { console.log(error); });
  }

  componentDidMount() {
    this.getBanners()
  }

  render() {
    return(
      <div className="container margin-top-30" >
        <div className="row">
         
          <div className="col-lg-9 col-md-8 padding-right-30">
            <Sorting />
            <ResultList results={this.state.results} 
                        destination={this.props.destination}
                        category={this.props.category }
                        site={this.props.site} />
          </div>
         
          <div className="col-lg-3 col-md-4">
            <Filtering filter={this.state.filter} onChange={ this.onChangeFilter }/>
            <Categories current={this.props.category} destination={this.props.destination} />
            <SideBanners banners={this.state.banners} showBanners={this.state.showBanners} />
          </div>
        
        </div>
      </div>
    )
  }
}
