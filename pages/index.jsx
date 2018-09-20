import React, {Fragment} from 'react';
import './styles.scss';

import chunk from 'lodash/chunk';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Card from '../components/card';

const demoOwner = "daemonsy";
const demoRepo = 'hubot-heroku';

const Component  = ({ data: { repository }, loading}) => {
  return (
    loading ? <div>Loading...</div> :
    <Fragment>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {repository.name}
            </h1>
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={repository.owner.avatarUrl} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{repository.owner.name}</strong> <small>@{repository.owner.login}</small>
                    <br/>
                    {repository.description}
                  </p>
                </div>
              </div>
              <div className="media-right">
                <span style={{marginRight: '2rem'}}>⭐️ {repository.stargazers.totalCount}</span>
                <span style={{marginRight: '2rem'}}>✍️ {repository.pullRequests.totalCount}</span>
                <span>🍽 {repository.forkCount}</span>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="columns">
            <div className="column">
              <h3 className="title is-size-3">Recent Stargazers</h3>
            </div>
          </div>
          { chunk(repository.stargazers.nodes, 4).map((row, index) => {
            return (
              <div className="columns" key={index}>
                { row.map(stargazer => {
                  return (
                    <div className="column is-one-quarter" key={stargazer.login}>
                      <Card user={stargazer}/>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    </Fragment>
  );
}

export const query = gql`
  query($repo: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      name
      forkCount
      description
      owner {
        login
        avatarUrl
        ... on User {
          name
          bio
        }
      }
      pullRequests(last: 50) {
        totalCount
      }

      stargazers(last: 50) {
        totalCount
        nodes {
          login
          avatarUrl
          name
          bio
          company
          organizations(last: 50) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(query, {
  options: {
    variables: {
      repo: demoRepo,
      owner: demoOwner
    }
  },
  props: ({ data }) => {
    return ({
      data
    })
  }
})(Component)
