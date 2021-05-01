import React from "react";

const Repo = props => (
  <tr>
  <td><a href={props.repo.homepage || props.repo.html_url} rel="noreferrer" target="_blank">{props.repo.name}</a></td>
  <td>{props.repo.description}</td>
  <td>{props.repo.forks_count}</td>
  <td><button onClick={ () => props.showCommit(props.repo.name)}>View Commits</button></td>
  </tr>
)


class RepoList extends React.Component {

  render() {
    return (
      <table>
        {this.props.orgName ? <caption>Search Results for {this.props.orgName}</caption> : null}
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Fork Count</th>
            <th>Commit Link</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map(repo => (
              <Repo showCommit={this.showCommit} repo={repo} key={repo.name} />
          ))}
        </tbody>
      </table>
    )
  }

  showCommit = commit => {
    this.props.hideRepos();
    this.props.updateSelectedRepo(commit);
    console.log(commit);
  };
}

export default RepoList;
