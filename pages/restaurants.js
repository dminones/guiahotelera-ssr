import AbstractPage from '../containers/AbstractPage.js';

export default class extends AbstractPage {

	static pageConfig = () => (
		{
			category: 'Restaurant',
			img: '/static/images/restaurants.jpg',
			name: 'Restaurantes'
		}
	);

}