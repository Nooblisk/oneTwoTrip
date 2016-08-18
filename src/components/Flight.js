/**
 * Created by Nooblisk on 10.08.2016.
 */
import React, { Component } from 'react';
import Set from 'Set';


class Flight extends Component {

    render() {
        const { id, from, to, arrival, departure, carrier } = this.props
        var time1 = function (arrival) {
            var time = new Date(arrival);
            return time.getHours() + ':' + time.getMinutes()
        }
        const wowTime = time1(arrival)
        const wow2Time = time1(departure)

        return <div className='flight' id={carrier}>

            <p>Рейс {id}</p>
            <p>Из {from} в {to}</p>
            <p>{wow2Time} - {wowTime}()</p>
            <p>авиакомпания {carrier}</p>

        </div>
    }
}


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'all'};
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
        this.props.setCarrier(e.target.value);
        console.log('я выбрал : ' + e.target.value);
    }

    render() {
        const {flights}=this.props

        function uniq(a) {
            var un = new Set(a);
            return un.toArray();
        }

        var try1 = flights.flights.map(opt => {
            return opt.carrier
        })
        console.log('try1 : ' + try1)
        var uniqueCarriers = uniq(try1)
        console.log('uniqueCarriers : ' + uniqueCarriers)
        return (
            <div className='form-group'>
                <label htmlFor='select'>Выберите рейс для показа</label>
                <select value={this.state.value} onChange={this.onChange.bind(this)} className='form-control'>
                    <option value='all' key='all'>all</option>
                    {uniqueCarriers.map(option => {
                        return <option value={option} key={option}>{option}</option>
                    })}
                </select>
            </div>

        )
    }
}

export default class FlightList extends Component {
    render() {
        const { flights } = this.props
        const {setCarrier} = this.props
        const show = flights.carrierToShow
        var flightslist = flights.flights.map(function (flight) {
            if (show == flight.carrier || show == 'all') {
                return <Flight
                    key={flight.id}
                    from={flight.direction.from}
                    to={flight.direction.to}
                    arrival={flight.arrival}
                    departure={flight.departure}
                    carrier={flight.carrier}
                />
            }
        })

        return (
            <div className='flightList'>
                <SelectBox flights={flights} setCarrier={setCarrier}/>
                {flightslist}
            </div>)
    }
}