import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

     delete = () => {
      axios
    .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then( res => {
      this.props.history.push('/');
    })
    .catch( err => console.log(err.response));
    }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div>
          <button className="btnUpdate" onClick={() => this.props.history.push(`/updateMovie/${this.state.movie.id}`)}>Zip Zap Update</button>
          <button className="btn" onClick={this.delete}>Zap Zip Delete Movie</button>
        </div>
      </div>
    );
  }
}
