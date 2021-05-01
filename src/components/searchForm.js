import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = { nameInput: "" };
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input type="text" placeholder="Github Org Name"  value={this.state.nameInput}
  onChange={event => this.handleChange(event)} />
        <input type="submit" value="Submit" />
      </form>
    );
  }

  handleChange = event => {
    this.setState({ nameInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setError('');
    // this.props.addRepo(this.state.nameInput);
    // axios.get("http://restcountries.eu/rest/v2/all")
    fetch(`https://api.github.com/orgs/${this.state.nameInput}/repos`)
      .then(async(response) => await response.json()).then(jsonData => {
        if(Array.isArray(jsonData)) {
          this.props.updateRepos(jsonData.sort((a,b) => b.forks_count - a.forks_count));
          this.props.updateSelectedOrgName(this.state.nameInput); 
          this.setState({
            nameInput: ''
          });
          console.log(jsonData);
        }
        else{
          this.props.setError('No result, lets try something else');
          this.props.updateRepos([]);
        }

      })
      .catch(function (error) {
        console.log(error);
    });
  };
}

export default SearchForm;
