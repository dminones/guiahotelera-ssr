import React from "react";
import { Header } from "../components";

const Title = ({ children }) => (
  <div id="titlebar" className="listing-titlebar">
    <div className="listing-titlebar-title">
      <h2 className="margin-top-0">{children}</h2>
    </div>
  </div>
);

const Content = ({children}) => (
  <div className="content margin-bottom-30 margin-top-30" dangerouslySetInnerHTML={{__html: children}} />
)

export default ({ site, post }) => (
  <React.Fragment>
    {post.image && <Header src={post.image} title={post.title} />}
    <div className="container">
      {!post.image && <Title>{post.title}</Title>}
      <Content>{post.content}</Content>
    </div>
  </React.Fragment>
);
