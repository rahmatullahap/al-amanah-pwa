import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import 'twin.macro';
import { GetHomeDataQuery } from '../graphql-types';
import BaseLayout from '../layouts/base';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import { RichText } from 'prismic-reactjs';
import Jumbotron from '../components/jumbotron';
import { BtnLinkPrimary } from '../components/scaffolds';

class Home extends React.Component<PageProps<GetHomeDataQuery>> {
  render() {
    const data = this.props.data;
    const location = this.props.location;
    const logo = data?.logo?.childrenImageSharp[0]?.fluid;
    const allArticles = data?.allPrismicArticle.nodes;
    const jumbotron = allArticles.filter(a => a.data.jumbotron)[0];
    const articles = allArticles.filter(a => !a.data.jumbotron);

    const menus = [
      {
        title: 'Madrasah',
      },
      {
        title: 'DKM Al-Amanah',
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

    // SEO data
    const siteMeta = data.site?.siteMetadata;

    const canonical = `${siteMeta.url}/${location.pathname}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://al-amanah.kawaluyaan-rw05.com/#website',
          url: 'https://al-amanah.kawaluyaan-rw05.com/',
          name: 'Kawaluyaan RW05',
          description: 'kawaluyaan-rw05.com',
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: 'https://al-amanah.kawaluyaan-rw05.com/?s={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          ],
          inLanguage: 'en-US',
        },
        {
          '@type': 'WebPage',
          '@id': 'https://al-amanah.kawaluyaan-rw05.com/admin/#webpage',
          url: 'https://al-amanah.kawaluyaan-rw05.com/admin/',
          name: 'Yayasan Al Amanah - Admin',
          isPartOf: { '@id': 'https://al-amanah.kawaluyaan-rw05.com/#website' },
          datePublished: '2020-09-08T06:43:33+00:00',
          dateModified: '2021-03-19T00:07:14+00:00',
          inLanguage: 'en-US',
          potentialAction: [
            {
              '@type': 'ReadAction',
              target: ['https://al-amanah.kawaluyaan-rw05.com/admin/'],
            },
          ],
        },
      ],
    };

    return (
      <BaseLayout logo={logo} menu={false}>
        <Helmet>
          <title>Yayasan Al Amanah</title>
          <meta
            name="robots"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <link rel="canonical" href={canonical} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Yayasan Al Amanah - Admin" />
          <meta property="og:url" content="https://al-amanah.kawaluyaan-rw05.com/admin/" />
          <meta property="og:site_name" content="Kawaluyaan" />
          <meta property="article:modified_time" content="2021-03-19T00:07:14+00:00" />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
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
    site {
      siteMetadata {
        ...SiteMetadataFields
      }
    }
  }
`;
