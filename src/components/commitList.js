import React from "react";

class CommitList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

    componentDidMount() {
      const url = `https://api.github.com/repos/${this.props.orgName}/${this.props.commit}/commits`;

      fetch(url).then((result) => result.json())
        .then((result) => {
          result = result.map(x => {
              return {sha: x.sha, author: x.commit.author.name, message: x.commit.message}
            });
          console.log(result);
          this.setState(prevState => ({
            data: [...prevState.data, ...result] 
          }))
        })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
      const {data} = this.state

      const result = data.map((entry, index) => {
        return <tr key={entry.sha}><th>{entry.sha}</th><th>{entry.author}</th><th>{entry.message}</th></tr>
      })

    return <table><thead><tr><th>Sha</th><th>Author</th><th>Message</th></tr></thead><tbody>{result}</tbody></table>
    }
}
export default CommitList;
