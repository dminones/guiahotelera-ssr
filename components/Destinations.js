import React, {Component} from 'react';
import config from '../config/'
import Link from 'next/link'

const DestinationLink = (props) => (
    <Link as={`/d/${props.slug}`} href={`/destination?slug=${props.slug}`}>
      {props.children}
    </Link>
)


function ImageBox({destination}) {
	return (
		<DestinationLink slug={destination.slug} title={destination.name} >
			<a className="img-box">
				<div className="img-box-content visible">
					<h4>{destination.name}</h4>
				</div>
				<div className="img-box-background" style={
					{
						backgroundImage: 'url('+destination.image+')'
					}} ></div>
			</a>
		</DestinationLink>
	)
}

export default class Destinations extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	      results : this.props.destinations || [],
	      page: props.page
	    }

	    this.getMore = this.getMore.bind(this)
	 }

	componentDidMount() {
		this.getMore = this.getMore.bind(this)
	}

	getMore() {
		this.setState({
			page: this.state.page + this.props.page
		})
	}

	getMoreButton(text= "Más Destinos") {
		if(this.state.results.length <= this.state.results.slice(0, this.state.page).length) {
			return null
		}

		return (
			<div className="col-md-12">
            	<a className="button border" onClick={this.getMore} >{text}</a>
            </div>
		)
	}

	render() {
		if(this.state.results.length <= 0)
			return null;

		const style = this.props.style || {};
		return(
			<div style={{...style,paddingBottom:'70px'}} >
				<div className="container" >
					<div className="row" style={{textAlign:'center'}} >
						<div className="col-md-12">
							<h3 className="headline centered margin-top-70">
								{ this.props.title === undefined ? 'Destinos Populares' : this.props.title }
								<span>{ this.props.summary === undefined ? 'Explora hoteles en destinos populares' : this.props.summary}</span>
							</h3>
						</div>
						
						{this.state.results.slice(0, this.state.page).map((item, index) => (
							<div key={item._id} className="col-md-4" >
								<ImageBox destination={item}/>
							</div>
						)) }

						{ this.getMoreButton(this.props.moreText) }
					</div>
				</div>
			</div>
		)
	}
}