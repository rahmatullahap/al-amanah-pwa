import { graphql } from 'gatsby';

// site metadata
export const siteMetadataFields = graphql`
  fragment SiteMetadataFields on SiteSiteMetadata {
    title
    description
    url
    siteUrl
    logo
  }
`;

// used form image retrieve from prismic
export const prismicImageField = graphql`
  fragment PrismicImageFields on PrismicImageInterface {
    alt
    copyright
    dimensions {
      width
      height
    }
    fixed {
      ...PrismicImageFixedFields
    }
    fluid {
      ...PrismicImageFluidFields
    }
  }
`;

export const prismicImageFixedField = graphql`
  fragment PrismicImageFixedFields on PrismicImageFixedType {
    base64
    src
    srcSet
    srcWebp
    srcSetWebp
    width
    height
  }
`;

export const prismicImageFluidField = graphql`
  fragment PrismicImageFluidFields on PrismicImageFluidType {
    base64
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
    aspectRatio
  }
`;

export const gatsbyImageSharpFluid = graphql`
  fragment FileImageSharpFluid on ImageSharpFluid {
    base64
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
    aspectRatio
  }
`;

export const gatsbyImageSharpFixed = graphql`
  fragment FileImageSharpFixed on ImageSharpFixed {
    base64
    src
    srcSet
    srcWebp
    srcSetWebp
    width
    height
  }
`;

