import React from 'react';
import './App.css';
import {getRepositories, getCommits} from './services/Data';
import List from './components/List'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      commits: [],
      error: null,
    };

    getRepositories()
      .then((repositories) => this.setState({
        repositories: repositories.map((repo) => {
          return {
            name: repo.name,
            onClick: this.populateCommitsList.apply(this, [repo.commitsUrl])
          }

        })
      }))
      .catch(err => {
        this.setState({error: err.message});
      })
  }

  populateCommitsList(url) {
    getCommits(url)
      .then((commits) => this.setState({ commits }))
      .catch(err => {
        this.setState({error: err.message});
      });
  }

  render() {
      return <div>
        <div className="error">{this.state.error}</div>
        <List data = {this.state.repositories}/>
        <List data = {this.state.commits} />
      </div>;
  }
}
