import { Component } from 'react'

import Layout from "../components/MyLayout.js";
import NoMatch from "../containers/NoMatch";
import {configSite} from '../config'

export default class extends Component {
  static async getInitialProps({ req }) {
    const site = configSite(req);
    return { site };
  }

  render() {
    return (
      <Layout site={this.props.site}>
        <NoMatch />
      </Layout>
    );
  }
}
