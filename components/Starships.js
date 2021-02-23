import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Starships extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            starships: [],
            starshipsUrl: 'https://swapi.dev/api/starships/?page=1',
            nextUrl: '',
            prevUrl: '',
            pageSize: 0
        }
        this.handleClick = this.handleClick.bind(this)
        this.loadingData = this.loadingData.bind(this)
    }

    loadingData(Url) {
        axios({
            method: 'GET',
            url: Url,
        })
            .then(response => {
                console.log(response)
                let starshipslist = response.data.results
                let next = response.data.next
                let prev = response.data.previous
                let size = response.data.count / 10 + 1
                this.setState({ starships: starshipslist, nextUrl: next, prevUrl: prev, pageSize: size })
            })
            .catch(error => {
                console.log(
                    "Error with the loading starships.",
                    error,
                )
            })
    }

    componentDidMount() {
        this.loadingData(this.state.starshipsUrl)
    }

    handleClick(event) {
        const { innerText } = event.target
        let curUrl = ''
        if (innerText === '<<')
            curUrl = this.state.prevUrl
        else if (innerText === '>>')
            curUrl = this.state.nextUrl
        else
            curUrl = `https://swapi.dev/api/starships/?page=${innerText}`
        this.loadingData(curUrl)
    }


    render() {
        let arrButtons = []
        for (let i = 1; i < this.state.pageSize; i++) {
            arrButtons.push(<Button className="m-2" variant="light" onClick={this.handleClick}>{i}</Button>)
        }

        return (
            <div>
                <h1 className="title-heading">Starships</h1>
                <div className="elem-card">
                    {this.state.starships.map((starship, i) => (
                        <div className="starship-border">
                            <div className="elem-prop">
                                <div> Name: </div>
                                <div key={i}>{starship.name}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Model: </div>
                                <div key={i}>{starship.model}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Manufacturer: </div>
                                <div key={i}>{starship.manufacturer}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Cost in credits: </div>
                                <div key={i}>{starship.cost_in_credits}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Length: </div>
                                <div key={i}>{starship.length}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Max atmosphering speed: </div>
                                <div key={i}>{starship.max_atmosphering_speed}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Crew: </div>
                                <div key={i}>{starship.crew}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Passengers: </div>
                                <div key={i}>{starship.passengers}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Cargo capacity: </div>
                                <div key={i}>{starship.cargo_capacity}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Consumables: </div>
                                <div key={i}>{starship.consumables}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Hyperdrive rating: </div>
                                <div key={i}>{starship.hyperdrive_rating}</div>
                            </div>
                            <div className="elem-prop">
                                <div> MGLT: </div>
                                <div key={i}>{starship.MGLT}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Starship class: </div>
                                <div key={i}>{starship.starship_class}</div>
                            </div>
                        </div>

                    ))}
                </div>

                <div className="btn-page">
                    <button className="m-2" variant="light" onClick={this.handleClick}>&lt;&lt;</button>
                    {arrButtons}
                    <button className="m-2" variant="light" onClick={this.handleClick}>&gt;&gt;</button>
                </div>

            </div>
        )
    }
}

export default Starships
