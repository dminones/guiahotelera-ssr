import sites from './sites';

const { NODE_ENV } = ('undefined' !== typeof window) ? window.env : process.env

const environment = NODE_ENV || 'development';

const config = require('./config-'+environment+'.js');

export default { 
	...config.config
}

function getSiteForHost(host, sites) {
	var returnSite = null;
	Object.keys(sites).forEach((site) => {
		if(host.indexOf(site) !== -1){
			returnSite = site;
		}
	})

	return returnSite;
}

export function configSite(req) {	
	const site  =  	('undefined' !== typeof window) ? 
                    (('undefined' !== typeof window.env) ? window.env.REACT_APP_SITE : null) :
                  	(('undefined' !== typeof req) ? getSiteForHost(req.headers.host, sites) : null)

    return sites[site || 'bolivia'];
}

export function getClientConfigSite() {	
    const site  =  	('undefined' !== typeof window) ? 
                    (('undefined' !== typeof window.env) ? window.env.REACT_APP_SITE : null) :
                  	null

    return sites[site || 'bolivia'];
}