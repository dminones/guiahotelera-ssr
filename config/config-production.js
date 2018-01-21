import sites from './sites';

const site = process.env.REACT_APP_SITE || "bolivia";
const config = {
	apiUrl : "https://api-guiahotelera.now.sh",
	site: sites[site]
}

export { config }