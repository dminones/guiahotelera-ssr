import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

const Layout = ({ site, children, page }) => {
  console.log({ site });
  const { headTitle, headDescription, headKeywords } = page || site;
  return (
    <ThemeProvider theme={{ color: site.color }}>
      <React.Fragment>
        <Head>
          {headTitle && <title>{headTitle}</title> }
          {headDescription && (
            <meta name="description" content={headDescription} />
          )}
          {headKeywords && <meta name="keywords" content={headKeywords} />}
        </Head>
        <div className="App">
          <NavBar site={site} />
          {children}
          <Footer site={site} />
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Layout;
