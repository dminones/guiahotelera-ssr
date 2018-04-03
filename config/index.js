import sites from './sites';

const { NODE_ENV, REACT_APP_SITE } = ('undefined' !== typeof window) ? window.env : process.env

const environment = NODE_ENV || 'development';

const config = require('./config-'+environment+'.js');

export default { 
	...config.config
}

export function configSite() {
    const site  =  	REACT_APP_SITE ? REACT_APP_SITE : 'bolivia';
    console.log("SITE ---->", site);
    return sites[site];
}

export function getClientConfigSite() {
    //Getting config from process.env
    return configSite();

    /*
    const site  =  	('undefined' !== typeof window) ? 
                    (('undefined' !== typeof window.env) ? window.env.REACT_APP_SITE : null) :
                  	null

    return sites[site || 'bolivia'];
    */
}