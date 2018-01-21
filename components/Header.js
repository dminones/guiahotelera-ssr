import React, {Component} from 'react';
import Gallery from 'react-images';

function Overlay (props) {

  const contentStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '6',
    textAlign: 'center'
  }

  const overlayStyle = {
    width: '100%',
    height: '100%',
    backgroundColor:'#000',
    opacity: '0.3',
    position: 'absolute'
  } 

  return (
      <div>
        <div style={ overlayStyle }></div>
        <div style={ contentStyle }>
          {props.children}
        </div>
      </div>
  )
}

function MoreButton({ onClick }) {
  if (onClick == null) {
    return null
  }
  
  var buttonStyle = {
    bottom: '20px',
    top: 'unset',
    right: '0px',
    position: 'absolute',
  }

  var buttonContainerStyle= {
    textAlign: 'right',
    bottom: '0px',
    height: '100%',
    position: 'relative',
  }

  return(
    <div style={buttonContainerStyle} className="container">
      <a style={ buttonStyle} onClick={ onClick } className="button"> Ver Fotos</a>
    </div>
  )    
}

export default class Header extends Component {

  constructor() {
    super()
    let self = this
    this.state= {
      lightboxIsOpen: false,
      currentImage: 0,
      shouldShowGallery: function(){return (self.props.gallery != null)}
    }

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  openLightbox () {
    if(!this.state.shouldShowGallery())
      return

    this.setState({
      lightboxIsOpen: true
    })
  }

  closeLightbox () {
    this.setState({
      lightboxIsOpen: false
    })
  }

  nextImage () {
    this.setState({
      currentImage: this.state.currentImage+1
    })
  }
  
  prevImage () {
    this.setState({
      currentImage: this.state.currentImage-1
    })
  }

  render() {
    const defaults = {
      headerSize : this.props.headerSize!=null ? this.props.headerSize : 'Small',
      headerFixed : this.props.headerFixed===null ? true : this.props.headerFixed,
    }

    const sizes = {
      'Small' : '300px',
      'Big' : '500px',
      'Full' : '100%'
    }

    var headerStyle = {   margin:'0px auto',
                            backgroundColor:'transparent',
                            padding:'0px', 
                            position: 'relative',
                            backgroundImage: 'url('+this.props.src+')',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover', 
                            maxHeight: '100%'
    }

    headerStyle.backgroundAttachment = (defaults.headerFixed) ? 'fixed' : 'scroll'
    headerStyle.height = sizes[defaults.headerSize]
    headerStyle.cursor = this.state.shouldShowGallery() ? 'pointer' : 'inherit'

      const h1Style = {
        color: 'rgb(255, 255, 255)',
        letterSpacing: '0px',
        fontWeight: '600',
        transition: 'none',
        lineHeight: '70px',
        borderWidth: '0px',
        margin: '125px auto 0 0',
        padding: '0px',
        fontSize: '42px',
        display: 'inline-block'
      }

    return(
      <div>
        <div onClick={this.openLightbox} style={ headerStyle } >
          <Overlay >
            <h1 style={ h1Style } >{ this.props.title }</h1>
            {this.props.children}
          </Overlay>
          { this.state.shouldShowGallery() ? (<MoreButton onClick={this.openLightbox} />) : null }
        </div>
          {
            this.state.shouldShowGallery() ?
            (<Gallery
              currentImage={this.state.currentImage}
              images={this.props.gallery}
              isOpen={this.state.lightboxIsOpen}
              onClose={this.closeLightbox}
              onClickNext={this.nextImage}
              onClickPrev={this.prevImage}
            />) :
            null
          }
      </div>
    )
  }
  
}