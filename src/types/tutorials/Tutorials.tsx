import * as React from 'react';

import { graphql } from 'gatsby';

import DefaultLayout from '../../layouts/default';
import ResourceCard from '../../components/ResourceCard';

import { ITutorialEdges } from './models';
import { IAuthor, IAuthorEdges } from '../authors/models';
import { ITechnologyEdges } from '../technologies/models';

export interface ITutorialProps {
  data: {
    tutorials: {
      edges: ITutorialEdges;
    };
    authors: {
      edges: IAuthorEdges;
    };
    technologies: {
      edges: ITechnologyEdges;
    };
  };
}

const Tutorials: React.SFC<ITutorialProps> = ({ data }) => {
  const items = data.tutorials.edges.map(edge => edge.node);
  const authors = data.authors.edges.map(edge => edge.node);
  return (
    <DefaultLayout title="Tutorials" subtitle="Resources organized by programming technologies">
      <div className="columns">
        <div className="column is-three-quarters-desktop bio-resourcecards">
          {items &&
            items.map(item => {
              const frontmatter = item.frontmatter;
              const href = item.fields.slug;

              // Use the first technology's icon as the logo
              const thumbnail = frontmatter.thumbnail;

              const authorRef = authors.find(a => a.frontmatter.label === frontmatter.author) as IAuthor;
              const author = {
                title: authorRef.frontmatter.title,
                headshot: authorRef.frontmatter.headshot,
                href: `/authors/${authorRef.frontmatter.label}`
              };
              return (
                <ResourceCard
                  key={href}
                  title={frontmatter.title}
                  subtitle={frontmatter.subtitle}
                  technologies={frontmatter.technologies}
                  topics={frontmatter.topics}
                  href={href}
                  thumbnail={thumbnail}
                  author={author}
                  date={frontmatter.date}
                />
              );
            })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Tutorials;

export const query = graphql`
  query {
    authors: allMarkdownRemark(filter: { frontmatter: { type: { eq: "author" } } }, limit: 1000) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            type
            label
            title
            subtitle
            date
            headshot {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    tutorials: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "tutorial" } } }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          fields {
            slug
          }
          frontmatter {
            type
            date(formatString: "MMMM Do, YYYY")
            title
            subtitle
            technologies
            topics
            author
            thumbnail {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    technologies: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "technology" } } }
      limit: 1000
    ) {
      edges {
        node {
          id
          frontmatter {
            type
            label
            title
            subtitle
            date
            logo
          }
        }
      }
    }
  }
`;