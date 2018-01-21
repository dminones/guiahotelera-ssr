import React, {Component} from 'react'
import config from '../config/'
import styled from 'styled-components'
import Link from 'next/link'

const Title = styled.h3`
	font-size: 30px;
    line-height: 37px;
    text-align: center;
`;

const Section = styled.div`
	padding: 75px 15px;
	margin-right: auto;
	margin-left: auto;

	
	@media (min-width: 768px) {
		width: 750px;
	}
	
	@media (min-width: 992px) {
		width: 970px;
	}

	@media (min-width: 1240px) {
		width: 1090px;
	}

	@media (min-width: 1367px) {
		width: 1210px;
	}

	@media (min-width: 1367px) {
		width: 1210px;
	}
`;

const ColumnsCards = styled.div`
	display:flex;
	flex-flow: row; 
  	flex-wrap: wrap;
  	margin-top: 50px;
`;

const Card = styled.div`
	flex: 0 0 30%;
    display:block;
  	margin-bottom: 1em;
  	margin-left: 1.66%;
  	margin-right: 1.66%;	

	@media (max-width: 992px) {
		flex: 0 0 45%;
		margin-left: 2.5%;
  		margin-right: 2.5%;
	}

	@media (max-width: 768px) {
		flex: 0 0 100%;
		margin-left:0;
		margin-right:0;
	}
`;

export default class Banners extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	      results : [],
	      page: props.page
	    }
	}

	updateBanners() {
		let self = this
		fetch(config.apiUrl+'/banner?_destination=null&site='+this.props.site)
		  .then(function(response) {
		    response.json().then(function(json) {
		    	if(json.error) {
		    		console.log(json.error)
		    	} else {
		    		self.setState({
			        	results : json
			      	})
		    	}
		    })
		})
	}

	componentDidMount() {
		this.updateBanners()
		this.getMore = this.getMore.bind(this)
	}

	getMore() {
		this.setState({
			page: this.state.page + this.props.page
		})
	}


	getMoreButton() {
		if(this.state.results.length <= this.state.results.slice(0, this.state.page).length) {
			return null
		}

		return (
			<div className="col-md-12">
            	<a className="button border" onClick={this.getMore} >Más</a>
            </div>
		)
	}

	render () {
		if(this.state.results.length <= 0) {
			return null
		}
		
		return (
			<Section>
				<Title>Recomendados</Title>
				{/* <Subtitle>Banners</Subtitle> */}
				<ColumnsCards>
				{

					this.state.results.map((item) =>
						(
							<Card key={item._id}>
								<Link href={ item.link } >
									<a  target={ item.target }>
					                  <img alt="" key={item.id} src={ item.src } style={ { marginBottom:'10px', width:'100%'} } /> 
					                </a>
				                </Link>
							</Card>
						)
					)
				}
				</ColumnsCards>
			</Section>
		)
	}
}