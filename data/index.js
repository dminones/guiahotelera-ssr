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
	return await fetch(url).then(res => res.json());
}


export async function getItem(slug) {
	const url = `${config.apiUrl}/item/${slug}`
	const item =  await fetch(url).then(res => {
		if(res.status > 400) throw new Error(res.json())
		return res.json()
	}).catch(e => {throw e});
	return item;
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

export async function getHomeDestinations(site) {
	const res = await fetch(`${config.apiUrl}/${site}/destination/home`);
	return await res.json();
}

export async function getDestination(slug, filter = {}) {
	const destinations = await getDestinations({ ...filter, slug})
    return (destinations.length > 0) ? destinations[0] : null;
}

const strings  = require('./strings.json')
export { strings }