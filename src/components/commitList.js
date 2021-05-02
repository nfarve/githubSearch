import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function CommitList(props) {
  const [data, setData] = useState([])

  useEffect(() => {
      const url = `https://api.github.com/repos/${props.orgName}/${props.repoName}/commits`;

      fetch(url)
      .then((result) => result.json())
        .then((result) => {
          result = result.map(x => {
              return {sha: x.sha.slice(0,6), commit_url: x.html_url, author: x.commit.author.name, message: x.commit.message}
            });
          console.log(result);
          setData(result);
        })
      .catch(function (error) {
        console.log(error);
      });
    }, []);

      const result = data.map((entry) => {
        return <TableRow key={entry.sha}><TableCell><a href={entry.commit_url} rel="noreferrer" target="_blank">{entry.sha}</a></TableCell><TableCell>{entry.author}</TableCell><TableCell>{entry.message}</TableCell></TableRow>
      })

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sha</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

CommitList.propTypes = {
  orgName : PropTypes.string.isRequired,
  repoName : PropTypes.string.isRequired
}

export default CommitList;
