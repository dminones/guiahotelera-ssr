import React from 'react';

/*
function BreadCrumbs () {
  return(
    <nav id="breadcrumbs">
      <ul>
        <li><a href="listings-list-with-sidebar.html#">Home</a></li>
        <li>Listings</li>
      </ul>
    </nav>
  )
}
*/

export default function TitleBar ({ title, subtitle}) {
  return (
    <div id="titlebar" className="gradient">
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <h2>{ title }</h2><span>{subtitle}</span>
            {/*<BreadCrumbs />*/}
          </div>
        </div>
      </div>
    </div>
  )
}