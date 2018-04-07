import AbstractPage from '../containers/AbstractPage.js';

export default class extends AbstractPage {

	static pageConfig = () => (
		{
			category: 'Promocion',
			img: '/static/images/promociones.jpg',
			name: 'Promociones'
		}
	);
}