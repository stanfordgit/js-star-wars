import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Vehicles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicles: [],
            vehiclesUrl: 'https://swapi.dev/api/vehicles/?page=1',
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
                let vehicleslist = response.data.results
                let next = response.data.next
                let prev = response.data.previous
                let size = response.data.count / 10 + 1
                this.setState({ vehicles: vehicleslist, nextUrl: next, prevUrl: prev, pageSize: size })
            })
            .catch(error => {
                console.log(
                    "Error with the loading vehicles.",
                    error,
                )
            })
    }

    componentDidMount() {
        this.loadingData(this.state.vehiclesUrl)
    }

    handleClick(event) {
        const { innerText } = event.target
        let curUrl = ''
        if (innerText === '<<')
            curUrl = this.state.prevUrl
        else if (innerText === '>>')
            curUrl = this.state.nextUrl
        else
            curUrl = `https://swapi.dev/api/vehicles/?page=${innerText}`
        this.loadingData(curUrl)
    }


    render() {
        let arrButtons = []
        for (let i = 1; i < this.state.pageSize; i++) {
            arrButtons.push(<Button className="m-2" variant="light" onClick={this.handleClick}>{i}</Button>)
        }

        return (
            <div>
                <h1 className="title-heading">Vehicles</h1>
                <div className="elem-card">
                    {this.state.vehicles.map((vehicle, i) => (
                        <div className="vehicle-border">
                            <div className="elem-prop">
                                <div> Name: </div>
                                <div key={i}>{vehicle.name}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Model: </div>
                                <div key={i}>{vehicle.model}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Manufacturer: </div>
                                <div key={i}>{vehicle.manufacturer}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Cost in credits: </div>
                                <div key={i}>{vehicle.cost_in_credits}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Length: </div>
                                <div key={i}>{vehicle.length}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Max atmosphering speed: </div>
                                <div key={i}>{vehicle.max_atmosphering_speed}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Crew: </div>
                                <div key={i}>{vehicle.crew}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Passengers: </div>
                                <div key={i}>{vehicle.passengers}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Cargo capacity: </div>
                                <div key={i}>{vehicle.cargo_capacity}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Consumables: </div>
                                <div key={i}>{vehicle.consumables}</div>
                            </div>

                            <div className="elem-prop">
                                <div> Vehicle class: </div>
                                <div key={i}>{vehicle.vehicle_class}</div>
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

export default Vehicles