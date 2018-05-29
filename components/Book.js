import React, { Component } from 'react'
import _ from 'lodash';
import config from '../config'

export default class Book extends Component {

  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      to: props.item.email,
      sending: false,
      errors : []
    }
    this.handleSubjectTextChange = this.handleSubjectTextChange.bind(this)
    this.handleNameTextChange = this.handleNameTextChange.bind(this)
    this.handleEmailTextChange = this.handleEmailTextChange.bind(this)
    this.handleMessageTextChange = this.handleMessageTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.send = this.send.bind(this)
  }

  handleSubjectTextChange(ev){
    this.setState({
      subject: ev.target.value
    })
  }

  handleNameTextChange(ev){
    this.setState({
      name: ev.target.value
    })
  }

  handleEmailTextChange(ev){
    this.setState({
      email: ev.target.value
    })
  }

  handleMessageTextChange(ev){
    this.setState({
      message: ev.target.value
    })
  }

  validate(data, callback) {
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    var errors = []
    if(!this.state.subject || this.state.subject === '')
    {
      errors.push('subject')
    }

    if(!this.state.name || this.state.name === '') {
      errors.push('name')
    }

    if(!this.state.message || this.state.message === '')
    {
      errors.push('message')
    }

    if( !this.state.email || 
        this.state.email === '' ||
        !validateEmail(this.state.email)) {
      errors.push('email')
    }

    this.setState({
      errors: errors
    },callback)
  }

  send(data) {
    let self = this

    this.setState({
      sending : true
    },function(){
      fetch(config.apiUrl+'/'+this.props.site+'/book', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      }).then(function(response) {
        response.json().then(function(json) {
          if(json.error) {
            self.setState({
              sending: false,
              error: json.error,
              success: null
            })
          } else {
            self.setState({
              name: '',
              email: '',
              message: '',
              subject: '',
              sending: false,
              success: json.response,
              error: null
            })
          }
        })
      })
    })
  }

  onSubmit(ev){
    this.validate(this.state, function() {
      if(_.isEmpty(this.state.errors)) {
        this.send(this.state)
      }
    })    
  }

  render() {
    let errorStyle = { border: 'red 1px solid'} 
    return(
      <div className="boxed-widget">
        <h3>Consultas y Reservas a {this.props.item.name}</h3>

        <div className="row with-forms">
          <div className="col-md-12">
            <input  type="text" 
                    placeholder="Nombre"  
                    value={this.state.name}
                    onChange={this.handleNameTextChange}
                    style={_.includes(this.state.errors,'name') ? errorStyle : null } />
          </div>
        </div>
        <div className="row with-forms">
          <div className="col-md-12">
            <input  type="text" 
                    placeholder="Email"  
                    value={this.state.email}
                    onChange={this.handleEmailTextChange}
                    style={_.includes(this.state.errors,'email') ? errorStyle : null } />
          </div>
        </div>
        <div className="row with-forms">
          <div className="col-md-12">
            <input  type="text" 
                    placeholder="Asunto"  
                    value={this.state.subject}
                    onChange={this.handleSubjectTextChange}
                    style={_.includes(this.state.errors,'subject') ? errorStyle : null } />
          </div>
        </div>
        <div className="row with-forms">
          <div className="col-md-12">
            <textarea placeholder="Mensaje"                     
                      onChange={this.handleMessageTextChange}
                      value={this.state.message}
                      style={_.includes(this.state.errors,'message') ? errorStyle : null } >
             
            </textarea>
          </div>
        </div>
        { this.state.success && (<div className="margin-top-15">{this.state.success}</div>)}
        { this.state.error && (<div style={{color: 'red'}} className="margin-top-15">{this.state.error}</div>)}
        <button onClick={ this.onSubmit } 
                className="button fullwidth margin-top-15"
                disabled={this.state.sending}
                 >{ this.state.sending ? 'Enviando...' : 'Enviar '}</button>

      </div>
    )
  }
}
