import React from 'react';

export default function NoMatch({match}) {
  return(
    <div className="container">
      <div className="row">
        <div>
          <div className="col-md-12">
            <section id="not-found" className="center">
              <h2>404 <i className="fa fa-question-circle"></i></h2>
              <p>La página que estás buscando no existe.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}