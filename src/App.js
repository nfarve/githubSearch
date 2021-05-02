import React from "react";
import RepoList from './components/repoList';
import SearchForm from './components/searchForm';
import CommitList from './components/commitList';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      showRepos: true,
      selectedRepo: '',
      selectedOrgName: '',
      errorMessage: '',
    };
  }

  updateRepos = repos =>{
    this.setState({
      repos
    })
  };

  addRepo = repos => {
    this.setState(prevState => ({
      repos: [...prevState.repos, ...repos],
    }));
  };

  hideRepos = () => {
    this.setState({
      showRepos: false
    });
  };

  showRepoList = () => {
    this.setState({
      showRepos: true
    });
  };

  updateSelectedRepo = repo => {
    this.setState({
      selectedRepo: repo
    });
  };

  updateSelectedOrgName = orgName => {
    this.setState({
      selectedOrgName: orgName
    });
  };

  setError = error => {
    this.setState({
      errorMessage: error
    });
  };

  render() {
    const {selectedOrgName, showRepos, repos, errorMessage, selectedRepo} = this.state
    return (
      <Container maxWidth="lg">
        <h1>Github Search</h1>
        <h2>{errorMessage}</h2>
      {showRepos ? (
        <SearchForm updateRepos = {this.updateRepos} setError = {this.setError} updateSelectedOrgName = {this.updateSelectedOrgName} addRepo={this.addRepo}/>
      ) : (<Button variant="contained" color="primary" onClick={this.showRepoList}>Back to Search</Button>
      )}
      {showRepos ? (
        <RepoList orgName = {selectedOrgName} updateSelectedRepo = {this.updateSelectedRepo} hideRepos = {this.hideRepos} repos = {repos} />
      ) :
        ( <CommitList orgName ={selectedOrgName} repoName = {selectedRepo} /> )}
      </Container>
    );
  }
}

export default App;
