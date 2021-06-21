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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const Atag = tw.a``;

const Login: React.FC<PageProps<GetLoginDataQuery>> = ({ data }) => {
  const logo = data?.logo?.childrenImageSharp[0]?.fluid;

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => console.log(data);

  return (
    <div>
      <Helmet>
        <title>Yayasan Al Amanah - Login</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
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
                <Input {...register('firstName')} id="username" aria-describedby="username" />
              </FormControl>
              <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  {...register('password')}
                  type="password"
                  id="password"
                  aria-describedby="password"
                />
              </FormControl>
            </CardContent>
            <CardActions tw="flex justify-end">
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="large"
                color="primary"
              >
                Login
              </Button>
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
