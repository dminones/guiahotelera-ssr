import NavBar from './NavBar'
import Footer from './Footer'
import {ThemeProvider} from 'styled-components';

const Layout = ({site, children}) => (
	<ThemeProvider theme={ {color:site.color} } >
		<div className="App"> 
			<NavBar site={site} />
			{children}
			<Footer site={site }/>
		</div>
	</ThemeProvider>
)

export default Layout
