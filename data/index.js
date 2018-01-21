import config from '../config/'
import fetch from 'isomorphic-fetch'
import slugify from '../utils/Slugify'

export function getMainMenu() {
	return require('./main-menu.json')
}

export function getRandomImage(site) {
	return config.apiUrl+'/random-destination-image?site='+site.slug
}

export async function getItems(filter = {}) {
	const esc = encodeURIComponent;
	const query = Object.keys(filter)
    					.map(k => esc(k) + '=' + esc(filter[k]))
    					.join('&');
	
	const url = config.apiUrl+'/item?'+query

    const res = await fetch(url);
    const items = await res.json();
    return items;
}


export async function getItem(slug) {
	const items = await getItems()

    var found = items.filter(function(item) { 
			    	return slugify(item.name) === slug;
			  	});
    return (found.length > 0) ? found[0] : null;
}

export async function getDestinations(filter = {}) {
	const esc = encodeURIComponent;
	const query = Object.keys(filter)
    					.map(k => esc(k) + '=' + esc(filter[k]))
    					.join('&');
	
	const url = config.apiUrl+'/destination?'+query;
	const res = await fetch(url);
    const destinations = await res.json();
    return destinations;
}

export async function getDestination(slug, filter = {}) {
	console.log("getDestinations slug",slug)
	console.log("getDestinations filter",filter)
	const destinations = await getDestinations(filter)
    var found = destinations.filter(function(item) { 
			    	return item.slug === slug;
			  	});
    return (found.length > 0) ? found[0] : null;
}

const strings  = require('./strings.json')
export { strings }