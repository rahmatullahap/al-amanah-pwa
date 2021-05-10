import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import 'twin.macro';
import BaseLayout from '../layouts/base';
import { GetHomeDataQuery } from '../graphql-types';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import { RichText } from 'prismic-reactjs';
import Jumbotron from '../components/jumbotron';
import { BtnLinkPrimary } from '../components/scaffolds';

class Home extends React.Component<PageProps<GetHomeDataQuery>> {
  render() {
    const data = this.props.data;
    const logo = data?.logo?.childrenImageSharp[0]?.fluid;
    const allArticles = data?.allPrismicArticle.nodes;
    const jumbotron = allArticles.filter(a => a.data.jumbotron)[0];
    const articles = allArticles.filter(a => !a.data.jumbotron);

    const menus = [
      {
        title: 'Madrasah',
      },
      {
        title: 'DKM Al Amanah',
      },
      {
        title: 'Majelis Taklim',
      },
      {
        title: 'Kelas Tahsin',
      },
      {
        title: 'Kelas Tahfiz',
      },
      {
        title: 'Kelas Bahasa Arab',
      },
    ];

    return (
      <BaseLayout logo={logo} menu={false}>
        <Helmet>
          <title>Yayasan Al Amanah</title>
        </Helmet>
        <Jumbotron
          title={jumbotron.data?.title?.text}
          detail={<RichText render={jumbotron.data?.description?.raw} />}
          action={
            <BtnLinkPrimary to={'/' + jumbotron?.uid} tw="w-1/2">
              Selengkapnya
            </BtnLinkPrimary>
          }
          img={jumbotron?.data?.image?.fluid}
          curved={false}
        ></Jumbotron>

        <section
          tw="bg-white"
          css={css`
            min-height: 780px;
          `}
        >
          <div tw="container">
            <div tw="mx-8 lg:mx-32 py-4 mt-8">
              <h2 tw="font-extrabold text-center">Yayasan Al Amanah</h2>
              <div tw="grid grid-cols-3 gap-2 mb-8">
                {menus.map((item, _) => (
                  <div tw="bg-black-700 text-left rounded-2xl relative w-full py-6 lg:py-12 px-8 lg:px-24">
                    {item.title}
                  </div>
                ))}
              </div>
              <h2 tw="font-extrabold text-center">Jadwal Ceramah</h2>
              <div tw="bg-blue-lapis text-left rounded-2xl relative w-full py-6 lg:py-12 px-8 lg:px-24 mb-8"></div>
              <h2 tw="font-extrabold text-center">Artikel terbaru</h2>
              {articles?.map((item, _) => (
                <Link to={'/' + item.uid} key={'article' + item.uid}>
                  <p>{item.data.title.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default Home;

export const query = graphql`
  query getHomeData {
    allPrismicArticle {
      nodes {
        uid
        data {
          jumbotron
          title {
            raw
            text
          }
          description {
            raw
          }
          image {
            alt
            url
            fluid(maxWidth: 1000, maxHeight: 300) {
              ...PrismicImageFluidFields
            }
          }
        }
      }
    }
    logo: file(relativePath: { eq: "images/logo.png" }) {
      childrenImageSharp {
        fluid(maxWidth: 130) {
          ...FileImageSharpFluid
        }
      }
    }
  }
`;
