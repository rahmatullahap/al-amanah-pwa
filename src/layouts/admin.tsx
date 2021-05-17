import React from 'react';
// import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
// import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import Footer from '../components/footer';
import tw from 'twin.macro';

interface AdminProps {
  logo?: FluidObject;
}

export const Atag = tw.a``;

const AdminLayout: React.FC<AdminProps> = ({ logo, children }) => {
  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
          rel="stylesheet"
          type="text/css"
        />
        <link href="https://fonts.cdnfonts.com/css/candela" rel="stylesheet" />
      </Helmet>
      Dashboard Admin
      {children}
      <Footer logo={logo} />
    </div>
  );
};

export default AdminLayout;
