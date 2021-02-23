import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Peoples extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            peopleUrl: 'https://swapi.dev/api/people/?page=1',
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
                let peoplelist = response.data.results
                let next = response.data.next
                let prev = response.data.previous
                let size = response.data.count / 10 + 1
                this.setState({ people: peoplelist, nextUrl: next, prevUrl: prev, pageSize: size })
            })
            .catch(error => {
                console.log(
                    "Error with the loading people.",
                    error,
                )
            })
    }

    componentDidMount() {
        this.loadingData(this.state.peopleUrl)
    }

    handleClick(event) {
        const { innerText } = event.target
        let curUrl = ''
        if (innerText === '<<')
            curUrl = this.state.prevUrl
        else if (innerText === '>>')
            curUrl = this.state.nextUrl
        else
            curUrl = `https://swapi.dev/api/people/?page=${innerText}`
        this.loadingData(curUrl)
    }

    render() {
        let arrButtons = []
        for (let i = 1; i < this.state.pageSize; i++) {
            arrButtons.push(<Button className="m-2" variant="light" onClick={this.handleClick}>{i}</Button>)
        }

        return (
            <div>
                <h1 className="title-heading">Peoples</h1>
                <div className="elem-card">
                    {this.state.people.map((people, i) => (
                        <div className="people-border">
                            <div className="elem-prop">
                                <div> Name: </div>
                                <div key={i}>{people.name}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Height: </div>
                                <div key={i}>{people.height}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Mass: </div>
                                <div key={i}>{people.mass}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Hair color: </div>
                                <div key={i}>{people.hair_color}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Skin color: </div>
                                <div key={i}>{people.skin_color}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Eye color: </div>
                                <div key={i}>{people.eye_color}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Birth year: </div>
                                <div key={i}>{people.birth_year}</div>
                            </div>
                            <div className="elem-prop">
                                <div> Gender: </div>
                                <div key={i}>{people.gender}</div>
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

export default Peoples