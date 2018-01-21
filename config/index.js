import sites from './sites';

const { NODE_ENV } = ('undefined' !== typeof window) ? window.env : process.env

const environment = NODE_ENV || 'development';

const config = require('./config-'+environment+'.js');

export default { 
	...config.config
}

export function configSite(req) {	
    const site  =  	('undefined' !== typeof window) ? 
                    (('undefined' !== typeof window.env) ? window.env.REACT_APP_SITE : null) :
                  	(('undefined' !== typeof req) ? req.headers.react_app_site : null)

    return sites[site || 'argentina'];
}

export function getClientConfigSite() {	
    const site  =  	('undefined' !== typeof window) ? 
                    (('undefined' !== typeof window.env) ? window.env.REACT_APP_SITE : null) :
                  	null

    return sites[site || 'argentina'];
}