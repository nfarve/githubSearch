import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Repo = props => (
  <TableRow>
  <TableCell><a href={props.repo.homepage || props.repo.html_url} rel="noreferrer" target="_blank">{props.repo.name}</a></TableCell>
  <TableCell>{props.repo.description}</TableCell>
  <TableCell>{props.repo.forks_count}</TableCell>
  <TableCell><Button onClick={ () => props.showCommit(props.repo.name)}>View Commits</Button></TableCell>
  </TableRow>
)

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  showCommit: PropTypes.func.isRequired
};

class RepoList extends React.Component {

  render() {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          {this.props.orgName ? <caption>Search Results for {this.props.orgName}</caption> : null}
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Fork Count</TableCell>
              <TableCell>Commit Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.repos.map(repo => (
                <Repo showCommit={this.showCommit} repo={repo} key={repo.name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

    showCommit = commit => {
      this.props.hideRepos();
      this.props.updateSelectedRepo(commit);
      console.log(commit);
    };
}

RepoList.propTypes = {
  showCommit: PropTypes.func.isRequired,
  hideRepos: PropTypes.func.isRequired,
  updateSelectedRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  orgName: PropTypes.string.isRequired
}
export default RepoList;
