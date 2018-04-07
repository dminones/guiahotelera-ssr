import React, { Component } from 'react'

import slugify from '../utils/Slugify'
import {Header, SingleItemMap, Book } from '../components'

function PhoneDetail({phone}) {
  if(phone == null){ return null }

  return( <li key="phone"><i className="sl sl-icon-phone"></i>
            <a href={ 'tel:'+phone } target="_blank"> { phone }</a>
          </li>)
}

function WebDetail({web}) {
  if(web == null){ return null }
  let webUrl = web.replace(/(^\w+:|^)\/\//, '');
  return(
    <li key="web">
      <i className="sl sl-icon-globe"></i> 
      <a href={ 'http://'+webUrl } target="_blank">{ webUrl }</a>
    </li>
  )
}

function BookingDetail({booking}) {
  if(booking == null){ return null }

  return(
    <li key="booking">
      <a href={ booking }  className="facebook-profile" target="_blank">
        <i className="icon-booking"></i> Reservar en Booking.com
      </a>
    </li>
  )
}


function EmailDetail({email, onClick}) {
  if(email == null){ return null }

  return(
    <li key="email">
      <i className="fa fa-envelope-o"></i> 
      <a  style={{cursor:'pointer' }}  onClick={ onClick } >{ email }</a>
    </li>
  )
}


function AddressDetail({address}) {
  if(!address){ return null }

  return(
    <li key="address">
       <i className="sl sl-icon-location" ></i>
        { address} 
    </li>
  )
}


function AccommodationType({accommodationType}) {
  if(!accommodationType) {
    return null
  }

  return (
    <span className="listing-tag">{ accommodationType.name }</span>
  )
}

function FacebookDetail({facebook}) {
  if(facebook == null){ return null }

  return( <li>
            <a href={facebook} target="_blank" className="facebook-profile">
              <i className="fa fa-facebook-square"></i>
              Facebook
            </a>
          </li>)
}


function TwitterDetail({twitter}) {
  if(twitter == null){ return null }

  return( <li>
            <a href={twitter} target="_blank" className="twitter-profile"> 
              <i className="fa fa-twitter-square"></i>
              Twitter
            </a>
          </li>)
}


function InstagramDetail({instagram}) {
  if(instagram == null){ return null }

  return( <li>
            <a href={instagram} target="_blank" style={{color:'rgb(136, 136, 136)'}}> 
              <i className="fa fa-instagram"></i>
              Instagram
            </a>
          </li>)
}


class Content extends Component {

  componentDidMount() {
    this.scrollToComponent = require('react-scroll-to-component');
  }

  render() {
    const {item, content } = this.props;
    console.log("content", content)
    const linkStyle = {cursor:'pointer'}

    if(item == null ){
      return null
    }

    return(
      <div id="titlebar" className="listing-titlebar">
        <div className="listing-titlebar-title">
          <h2>{ item.name } <AccommodationType accommodationType={item._accommodationType} /></h2>
        </div>
        <div id="listing-nav" className="listing-nav-container margin-top-30">
          <ul className="listing-nav">
            { 
              item.overview &&
              (<li><a style={linkStyle} onClick={() => this.scrollToComponent(content.Description) } >Descripción</a></li>) 
            }
            { 
              item.location &&
              (<li><a style={linkStyle} onClick={() => this.scrollToComponent(content.Location) }>Ubicación</a></li>) 
            }
            <li><a style={linkStyle} onClick={() => this.scrollToComponent(content.Contact) }>Contacto</a></li>
          </ul>
        </div>
        { 
          item.overview && 
          (<div ref={(section) => { content.Description = section; }}>{item.overview}</div>)
        }
        { 
          item.location &&
          (<div ref={(section) => { content.Location = section; }} id="listing-location" className="listing-section">
            <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">Ubicación</h3>
            <div id="singleListingMap-container">
              <SingleItemMap item={ item } />
            </div>
          </div>)
        }

        <div ref={(section) => { content.Contact = section; }} className="listing-section">
          <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">Contacto</h3>
          <ul className="listing-details-sidebar col-md-8">
            <AddressDetail address={item.address} />
            <PhoneDetail phone={item.phone} />
            <WebDetail web={item.web} />
            <EmailDetail  email={item.email} 
                          onClick={() => this.scrollToComponent(content.Book) } />   
          </ul>
          <ul className="listing-details-sidebar social-profiles col-md-4">
            <FacebookDetail facebook={item.facebook} />
            <TwitterDetail twitter={item.twitter} />
            <InstagramDetail instagram={item.instagram} />
            <BookingDetail booking={item.booking} />
          </ul>
        </div>
      </div>
    )
  }
  
}

/*
class Booking extends Component {

  render(){

    return(
        <div>
          <ins  className="bookingaff" 
                data-aid="1341342" 
                data-target_aid="1340103" 
                data-prod="rw" 
                data-width="0" 
                data-height="0" 
                data-lang="en-US" 
                data-show_rw_logo="1" 
                data-show_rw_badge="1" 
                data-show_rw_text="1" 
                data-show_rw_border="1" 
                data-right_align_rw="1" 
                data-hid="26210">
            <a href="//www.booking.com?aid=1340103">Booking.com</a>
          </ins>
        </div>
    )
  }
}
*/

export default class SingleItem extends Component {

  Sidebar({item}) {
    return(
      <div>
        <Book item={item} />
      </div>
    )
  }

  render() {
    var content = {}

    return(
      <div>
        { (this.props.item !== null) && ( this.props.item.thumbnail ) ? (<Header src={ this.props.item.thumbnail } headerSize="Big" gallery={this.props.item.gallery} />) : null }
        {/*<TitleBar title={ 'Hotel '+this.props.item.name } subtitle={this.props.item.name} />*/}
        <div className="container">
          <div className="row sticky-wrapper">
            <div className="col-lg-8 col-md-8 padding-right-30">
                <Content item={this.props.item} content={content} />              
            </div>
            <div ref={(section) => { content.Book = section; }} className="col-lg-4 col-md-4 margin-top-75 sticky">
                { (this.props.item !== null) ? (<this.Sidebar  item={this.props.item} />) : null }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
