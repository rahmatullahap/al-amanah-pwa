import { graphql, PageProps } from 'gatsby';
import React from 'react';
// import tw from 'twin.macro';
// import { css } from '@emotion/react';
import AdminLayout from '../../layouts/admin';
import { GetDashboardDataQuery } from '../../graphql-types';
import { Helmet } from 'react-helmet';
// import { Drawer } from '@material-ui/core';

const Dashboard: React.FC<PageProps<GetDashboardDataQuery>> = ({ data }) => {
  const logo = data?.logo?.childrenImageSharp[0]?.fluid;

  return (
    <AdminLayout logo={logo}>
      <Helmet>
        <title>Yayasan Al Amanah - Dashboard</title>
      </Helmet>
    </AdminLayout>
  );
};

export default Dashboard;

export const query = graphql`
  query getDashboardData {
    logo: file(relativePath: { eq: "images/logo.png" }) {
      childrenImageSharp {
        fluid(maxWidth: 130) {
          ...FileImageSharpFluid
        }
      }
    }
  }
`;
