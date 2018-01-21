import sites from './sites';

const site = process.env.REACT_APP_SITE || "argentina";
const config = {
	apiUrl : "http://localhost:9000",
	site: sites[site]
}

export { config }