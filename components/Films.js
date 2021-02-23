import React from 'react';
import axios from 'axios';

class Films extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            filmUrl: 'https://swapi.dev/api/films/'
        }
        this.loadingData = this.loadingData.bind(this)
    }

    loadingData(Url) {
        axios({
            method: 'GET',
            url: Url,
        })
            .then(response => {
                console.log(response)
                let filmslist = response.data.results
                this.setState({ films: filmslist })
            })
            .catch(error => {
                console.log(
                    "Error with the loading films.",
                    error
                )
            })
    }

    componentDidMount() {
        this.loadingData(this.state.filmUrl)
    }

    render() {
        return (
            <div>
                <h1 className="title-heading">Films</h1>
                <div className="elem-card">
                    {this.state.films.map((film, i) => (
                        <div className="film-border">
                            <div className="elem-prop">
                                <div> Title: </div>
                                <div key={i}>{film.title}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Episode: </div>
                                <div key={i}>{film.episode_id}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Director: </div>
                                <div key={i}>{film.director}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Producer: </div>
                                <div key={i}>{film.producer}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Release date: </div>
                                <div key={i}>{film.release_date}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}

export default Films