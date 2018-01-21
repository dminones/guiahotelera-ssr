import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({site, children}) => (
 	<div className="App"> 
        <NavBar site={site} />
    	{children}
    	<Footer site={site }/>
  	</div>
)

export default Layout
