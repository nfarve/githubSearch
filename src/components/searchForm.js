import React from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SearchForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = { nameInput: "" };
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <TextField variant="outlined" placeholder="Github Org Name"  value={this.state.nameInput}
  onChange={event => this.handleChange(event)} />
        <Button color="primary" variant="contained" type="submit" value="Submit"> Submit </Button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({ nameInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setError('');
    fetch(`https://api.github.com/orgs/${this.state.nameInput}/repos`)
      .then(async(response) => await response.json()).then(jsonData => {
        if(Array.isArray(jsonData)) {
          this.props.updateRepos(jsonData.sort((a,b) => b.forks_count - a.forks_count));
          this.props.updateSelectedOrgName(this.state.nameInput);
          this.setState({
            nameInput: ''
          });
        }
        else{
          this.props.updateSelectedOrgName(this.state.nameInput);
          this.props.setError('No result, lets try something else');
          this.props.updateRepos([]);
        }

      })
      .catch(function (error) {
        console.log(error);
    });
  };
}

SearchForm.propTypes = {
  setError: PropTypes.func.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSelectedOrgName: PropTypes.func.isRequired
}

export default SearchForm;
