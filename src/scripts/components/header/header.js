import React                from 'react';
import createReactClass     from 'create-react-class';
import Navigation       from 'components/navigation/navigation.js';

var Header = createReactClass({  
  render() {
    return (
      <header className="site-header">
		    <div className="site-header-branding">
			    <h1 className="site-header-branding__title">Title</h1>
				  <p className="site-header-branding__description">Just another WordPress site</p>
        </div>

        <Navigation></Navigation>
	    </header>
    )
  }
});

export default Header;