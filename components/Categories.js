import React, {Component} from 'react'
import config from '../config/'
import Link from 'next/link'
import styled from 'styled-components'
import { strings } from '../data'

const SidebarTitle = styled.h3`
	color: #222;
	font-size: 24px;
    font-weight: normal;
    line-height: 1.1;
    text-align: left;
    margin-bottom:30px;
`

const SidebarSection = styled.div`
	margin-bottom: 30px;
`

const LinkList = styled.ul`
	font-size: 18px;
	list-style-type: none;
	padding: 0;

	li {
		&: hover a{
			color:#00a948;
		}
	}
`

export default class Categories extends Component {

	constructor(props) {
		super(props)
		this.state = {
			categories: [],
		}
		this.updateCategories = this.updateCategories.bind(this)
	}

	componentDidMount() {
		this.updateCategories()
	}

	updateCategories() {
	    let self = this
	    var url = new URL(config.apiUrl+'/category')
	    if(this.props.destination) {
	      url.searchParams.append('_destination', this.props.destination._id)
	    }
	    console.log("Destination: ",url)
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
	        categories : json.filter(e => e !== self.props.current)
	      })
	    })
	    .catch(console.log);
	}

	render () {
		if(this.state.categories.length <= 0 || !this.props.destination) {
			return null
		}

		return (
			<SidebarSection>
				<SidebarTitle>Otros Servicios</SidebarTitle>
				<LinkList>
				{
					this.state.categories.map((cat)=> (
						<li>
							<Link key={cat} to={ `/d/${this.props.destination.slug}?category=${cat}` } >
								{strings[cat] && strings[cat].plural ? strings[cat].plural : cat}
							</Link>
						</li>
					))
				}
				</LinkList>
			</SidebarSection>
		)
	}
}