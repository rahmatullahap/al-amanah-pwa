import React from 'react';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import Header from '../components/header';
import Footer from '../components/footer';
import tw from 'twin.macro';

interface BaseProps {
  logo?: FluidObject;
  menu?: boolean;
}

export const Atag = tw.a``;

const BaseLayout: React.FC<BaseProps> = ({ logo, menu = true, children }) => {
  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
          rel="stylesheet"
          type="text/css"
        />
        {/* <link href="/styles/fonts.css" rel="stylesheet" /> */}
        <link href="https://fonts.cdnfonts.com/css/candela" rel="stylesheet" />
      </Helmet>
      {menu ? (
        <Header logo={logo} />
      ) : (
        <div
          tw="w-full absolute"
          css={css`
            top: 1rem;
            z-index: 9999;
          `}
        >
          <div tw="container mx-4 lg:mx-auto">
            <Link tw="lg:ml-32" to="/" aria-label="beranda">
              <Img
                fluid={logo as FluidObject}
                css={css`
                  margin-right: 40px;
                  position: relative;
                  width: 30px;
                  bottom: 0px;
                  @media (min-width: 1024px) {
                    bottom: 0px;
                    width: 48px;
                  }
                `}
              />
            </Link>
          </div>
        </div>
      )}
      {menu ? (
        <div
          css={css`
            @media (max-width: 1024px) {
              margin-top: 60px;
            }
          `}
        >
          {children}
        </div>
      ) : (
        <div
          css={css`
            @media (max-width: 1024px) {
              margin-top: 0px;
            }
          `}
        >
          {children}
        </div>
      )}
      <Footer logo={logo} />
    </div>
  );
};

export default BaseLayout;
