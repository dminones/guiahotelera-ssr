import AbstractPage from '../containers/AbstractPage.js';

export default class extends AbstractPage {

	static pageConfig = () => (
		{
			category: 'Alquiler de Autos',
			img: '/static/images/alquiler-autos.jpg',
			name: 'Alquiler de Autos'
		}
	);
}