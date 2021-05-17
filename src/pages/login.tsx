import { graphql, PageProps } from 'gatsby';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { GetLoginDataQuery } from '../graphql-types';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import Img, { FluidObject } from 'gatsby-image';

export const Atag = tw.a``;

const Login: React.FC<PageProps<GetLoginDataQuery>> = ({ data }) => {
  const logo = data?.logo?.childrenImageSharp[0]?.fluid;

  return (
    <div>
      <Helmet>
        <title>Yayasan Al Amanah - Login</title>
      </Helmet>
      <section>
        <div tw="container my-20">
          <Card
            tw="max-w-xl p-4"
            css={css`
              margin: 0 auto;
              width: 100%;
            `}
          >
            <div tw="w-full">
              <Link to="/" aria-label="home">
                <Img
                  fluid={logo as FluidObject}
                  css={css`
                    margin-right: 40px;
                    position: relative;
                    width: 30px;
                    bottom: 0px;
                    margin: 0 auto;
                    @media (min-width: 1024px) {
                      bottom: 0px;
                      width: 48px;
                    }
                  `}
                />
              </Link>
            </div>
            <CardContent>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" aria-describedby="my-helper-text" />
              </FormControl>
              <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type="password" id="password" aria-describedby="my-helper-text" />
              </FormControl>
            </CardContent>
            <CardActions tw="flex justify-end">
              <Link to="/admin/dashboard" aria-label="login">
                <Button variant="contained" size="large" color="primary">
                  Login
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;

export const query = graphql`
  query getLoginData {
    logo: file(relativePath: { eq: "images/logo.png" }) {
      childrenImageSharp {
        fluid(maxWidth: 130) {
          ...FileImageSharpFluid
        }
      }
    }
  }
`;
