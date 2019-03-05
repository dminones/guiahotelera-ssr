// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { configSite } from '../config'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    const site = configSite(req)
    const { NODE_ENV } = ('undefined' !== typeof window) ? window.env : ( process.env || { NODE_ENV: 'development' } )

    return { html, head, errorHtml, chunks, styles, site, env: { REACT_APP_SITE:site.slug, NODE_ENV } }
  }

  render() {
    return (
      <html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: `
            window.env = ${JSON.stringify(
              this.props.env
            )}` }}/>

          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXmguEChrQUrvx-t4naKq--pPAqrmd6kw"></script>

          <link rel="stylesheet" type="text/css" href="/static/css/icons.css" />
          <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
          <link rel="stylesheet" type="text/css" href="/static/css/App.css" />
          <link rel="stylesheet" type="text/css" href="/static/css/Components.css" />
          <link rel="stylesheet" type="text/css" href={this.props.site.colorStyle} />

          <link rel="icon" href={this.props.site.favicon} type="image/x-icon" />
        
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="index,follow" />
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}