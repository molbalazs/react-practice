import React from 'react';
import './App.css';
import { getRepositories, getCommits } from './services/Data';
import List from './components/List'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.github.com/users/molbalazs/repos',
      repositories: [],
      commits: [],
      error: null,
    };

    getRepositories(this.state.url)
      .then((repositories) => this.setState({
        repositories: repositories.map(repo => {

          let onClick = () => {
            getCommits(repo.commitsUrl)
              .then(commits => this.setState({ commits }))
              .catch(err => {
                this.setState({ error: err.message });
              });
          }
          return {
            onClick,
            text: repo.name,
          }

        })
      }))
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  populateCommitsList() {
    let url = this.commitsUrl;
    getCommits(url)
      .then(commits => this.setState({ commits }))
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render() {
      return <div>
        <div className="error">{this.state.error}</div>
        <List data = {this.state.repositories}/>
        <List data = {this.state.commits.map(response => {
          return { text: response.commit.message };
        })} />
      </div>;
  }
}
