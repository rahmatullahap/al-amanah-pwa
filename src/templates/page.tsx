import React from 'react';
import 'twin.macro';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import { RichText } from 'prismic-reactjs';
import BaseLayout from '../layouts/base';
import { GetPageQuery } from '../graphql-types';
import Img, { FluidObject } from 'gatsby-image';

const Page: React.FC<PageProps<GetPageQuery>> = ({ data, location }) => {
  const pageInfo = data.allPrismicArticle.edges[0].node;
  const pageData = pageInfo.data;

  const logo = data?.logo?.childrenImageSharp[0]?.fluid;

  // SEO data
  const siteMeta = data.site?.siteMetadata;
  const canonical = `${siteMeta.url}/${location.pathname}`;
  const title = pageData.title?.text || siteMeta.title;
  const shareImage = pageData.image?.url;
  const publisherLogo = `${siteMeta.url}/${siteMeta.logo}`;
  const datePublished = pageInfo.first_publication_date;
  const dateModified = pageInfo.last_publication_date;

  const jsonLd = {
    '@context': `https://schema.org/`,
    '@type': `Article`,
    author: {
      '@type': `Person`,
      name: siteMeta.title,
      image: publisherLogo,
    },

    headline: title,
    url: canonical,
    datePublished,
    dateModified,
    image: shareImage,
    publisher: {
      '@type': `Organization`,
      name: siteMeta.title,
      logo: {
        '@type': `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': siteMeta.url,
    },
  };

  return (
    <BaseLayout logo={logo}>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={datePublished} />
        <meta property="article:modified_time" content={dateModified} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={siteMeta.title} />
        <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={shareImage} />
        <meta property="og:image" content={shareImage} />
      </Helmet>
      <main>
        <section
          css={css`
            position: relative;
            overflow: hidden;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
            `}
          >
            {pageData?.image?.fluid ? (
              <Img
                fluid={pageData?.image?.fluid as FluidObject}
                alt={pageData?.image?.alt as string}
                css={css`
                  min-height: 100%;
                  width: 100%;
                `}
              />
            ) : (
              <div tw="bg-gray-200"></div>
            )}
          </div>
          <div
            tw="flex items-center"
            css={css`
              background: rgba(0, 0, 0, 0.5);
              background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.9) 0%,
                rgba(0, 0, 0, 0.8) 10%,
                rgba(0, 0, 0, 0.4) 25%,
                rgba(0, 0, 0, 0.4) 75%,
                rgba(0, 0, 0, 0.8) 90%,
                rgba(0, 0, 0, 0.9) 100%
              );
              bottom: 0;
              width: 100%;
              min-height: 700px;
              @media (max-width: 1024px) {
                min-height: auto;
              }
            `}
          >
            <div tw="container grid grid-cols-1 md:grid-cols-5 my-12">
              <div tw="md:col-span-3 md:col-start-2 px-8 md:px-0">
                <div tw="text-blue-marine">
                  <RichText render={pageData?.title?.raw} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section tw="my-16 px-8">
          <div tw="container grid grid-cols-1 md:grid-cols-5">
            <div tw="md:col-span-3 md:col-start-2">
              <RichText render={pageData?.content?.raw} />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
};

export default Page;

export const pageQuery = graphql`
  query getPage($uid: String!) {
    allPrismicArticle(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          first_publication_date
          last_publication_date
          data {
            title {
              raw
              text
            }
            content {
              raw
              text
            }
            image {
              alt
              url
              fluid(maxWidth: 1000, maxHeight: 700) {
                ...PrismicImageFluidFields
              }
            }
            published
          }
        }
      }
    }
    site {
      siteMetadata {
        ...SiteMetadataFields
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
