import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Planets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            planets: [],
            planetsUrl: 'https://swapi.dev/api/planets/?page=1',
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
                let planetslist = response.data.results
                let next = response.data.next
                let prev = response.data.previous
                let size = response.data.count / 10 + 1
                this.setState({ planets: planetslist, nextUrl: next, prevUrl: prev, pageSize: size })
            })
            .catch(error => {
                console.log(
                    "Error with the loading planets.",
                    error,
                )
            })
    }

    componentDidMount() {
        this.loadingData(this.state.planetsUrl)
    }

    handleClick(event) {
        const { innerText } = event.target
        let curUrl = ''
        if (innerText === '<<')
            curUrl = this.state.prevUrl
        else if (innerText === '>>')
            curUrl = this.state.nextUrl
        else
            curUrl = `https://swapi.dev/api/planets/?page=${innerText}`
        this.loadingData(curUrl)
    }

    render() {
        let arrButtons = []
        for (let i = 1; i < this.state.pageSize; i++) {
            arrButtons.push(<Button className="m-2" variant="light" onClick={this.handleClick}>{i}</Button>)
        }

        return (
            <div>
                <h1 className="title-heading">Planets</h1>
                <div className="elem-card">
                    {this.state.planets.map((planet, i) => (
                        <div className="planet-border">
                            <div className="elem-prop">
                                <div> Name: </div>
                                <div key={i}>{planet.name}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Rotation period: </div>
                                <div key={i}>{planet.rotation_period}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Orbital period: </div>
                                <div key={i}>{planet.orbital_period}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Diameter: </div>
                                <div key={i}>{planet.diameter}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Climate: </div>
                                <div key={i}>{planet.climate}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Gravity: </div>
                                <div key={i}>{planet.gravity}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Terrain: </div>
                                <div key={i}>{planet.terrain}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Surface water: </div>
                                <div key={i}>{planet.surface_water}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Population: </div>
                                <div key={i}>{planet.population}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="btn-page">
                    <Button className="m-2" variant="light" onClick={this.handleClick}>&lt;&lt;</Button>
                    {arrButtons}
                    <Button className="m-2" variant="light" onClick={this.handleClick}>&gt;&gt;</Button>
                </div>
            </div>
        )
    }
}

export default Planets