import { graphql } from 'gatsby';

export const query = graphql`
  fragment ListedTechnologyFragment on Technology {
    label
    slug
    title
    subtitle
    slug
    logo {
      publicURL
    }
  }
`;
