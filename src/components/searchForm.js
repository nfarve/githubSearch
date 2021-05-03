import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SearchForm(props) {
  const [nameInput, setNameInput] = useState('');

  const handleChange = event => {
    setNameInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.setError('');
    props.updateRepos([]);
    props.updateSelectedOrgName(nameInput);
  };

  useEffect(() => {
    fetchRepos(props.orgName)
  }, [props.repoPage, props.orgName]);

  const fetchRepos = (repoName) => {
    fetch(`https://api.github.com/orgs/${repoName}/repos?page=${props.repoPage}`)
      .then(async(response) => await response.json()).then(jsonData => {
        console.log(jsonData);
        if(Array.isArray(jsonData)) {
          props.addRepo(jsonData);
          setNameInput('');
        }
        else{
          props.setError('No result, lets try something else');
          props.updateRepos([]);
        }
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <TextField variant="outlined" placeholder="Github Org Name"  value={nameInput}
onChange={event => handleChange(event)} />
      <Button color="primary" variant="contained" type="submit" value="Submit"> Submit </Button>
    </form>
  );

}

SearchForm.propTypes = {
  setError: PropTypes.func.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSelectedOrgName: PropTypes.func.isRequired,
  repoPage: PropTypes.number,
  orgName: PropTypes.string,
  nameInput: PropTypes.string,
  addRepo: PropTypes.func
}

export default SearchForm;
