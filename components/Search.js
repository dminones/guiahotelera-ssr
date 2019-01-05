import React from 'react';
import Autosuggest from 'react-autosuggest';
import Link from 'next/link';
import config,{ getClientConfigSite } from '../config'

const normalize = (value) => value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

// Teach Autosuggest how to calculate suggestions for any given input value. 
const getSuggestions = function(value, callback) {
	const inputValue = normalize(value)
	const inputLength = inputValue.length;
	const site = getClientConfigSite();

	fetch(config.apiUrl+'/destination?site='+site.slug)  
	  .then(function(response) {
	    response.json().then(function(json) {
	      	let filtered = json.filter(item =>
				normalize(item.name).slice(0, inputLength) === inputValue
		 	)
		 	callback(filtered)
	    })
	})
};
 
// When suggestion is clicked, Autosuggest needs to populate the input 
// based on the clicked suggestion. Teach Autosuggest how to calculate the 
// input value for every given suggestion. 
const getSuggestionValue = suggestion => suggestion.name;
 
// Use your imagination to render suggestions. 
const renderSuggestion = suggestion => (
  <div >
    {suggestion.name}
  </div>
);

const SearchLink = (props) => {
  var slug = null
  if(props.selected) {
    slug = props.selected.slug
  }

  if(props.suggestions && props.suggestions.length) {
     slug = props.suggestions[0].slug
  } 

  const asLink = slug ? '/d/' + slug : '';
  const href = slug ? '/destination?slug=' + slug : ''; 
  
  console.log("slug",slug)
  console.log("props",props)
  return(
    <Link as={asLink} href={href} prefetch>
      {props.children}
    </Link>
  )
}
 
export default class Search extends React.Component {
  constructor() {
    super();
 
    // Autosuggest is a controlled component. 
    // This means that you need to provide an input value 
    // and an onChange handler that updates this value (see below). 
    // Suggestions also need to be provided to the Autosuggest, 
    // and they are initially empty because the Autosuggest is closed. 
    this.state = {
      value: '',
      suggestions: [],
      selected: null
    };
  }
  
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  
  // Autosuggest will call this function every time you need to clear suggestions. 
  onSuggestionSelected = (event, {suggestion}) => {
  	this.setState({
      selected: suggestion
    });
  };

  // Autosuggest will call this function every time you need to update suggestions. 
  // You already implemented this logic above, so just use it. 
  onSuggestionsFetchRequested = ({ value }) => {
  	let self = this
  	getSuggestions(value, function(suggestions){
  		self.setState({
	      suggestions: suggestions
	    });
  	})
  };
 	
  // Autosuggest will call this function every time you need to clear suggestions. 
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
 
    // Autosuggest will pass through all these props to the input. 
    const inputProps = {
      placeholder: 'Donde querés viajar',
      value,
      onChange: this.onChange
    };

    // Finally, render it! 
    return (
    	<div className="main-search-input">
			<div className="main-search-input-item">
				<Autosuggest
			        suggestions={suggestions}
			        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			        onSuggestionSelected={this.onSuggestionSelected}
			        getSuggestionValue={getSuggestionValue}
			        renderSuggestion={renderSuggestion}
			        inputProps={inputProps}
			      />
			</div>
			<SearchLink selected={ this.state.selected } 
                  suggestions={ this.state.suggestions } >
				<a className="button" style={ {paddingLeft: '50px', paddingRight: '50px', } }>Search</a>
			</SearchLink>
		</div>
    );
  }
}
