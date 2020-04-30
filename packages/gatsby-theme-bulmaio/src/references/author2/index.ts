// noinspection JSUnusedGlobalSymbols
import { graphql } from 'gatsby';

export const listedAuthor2Fragment = graphql`
  fragment ListedAuthor2Fragment on Author2 {
    label
    slug
    title
    subtitle
    slug
    thumbnail {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

