/**
 * Created by Nooblisk on 10.08.2016.
 */
import React, { Component } from 'react';
import Set from 'Set';


function findUniqueCarriers(a) {
    function uniq(b) {
        const un = new Set(b);
        return un.toArray();
    }

    var carriers = a.flights.map(opt => {
        return opt.carrier;
    })
    return uniq(carriers);
}

function parseDateString(date) {
    const time = new Date(date);
    var parseDate = {};
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    parseDate.hours = time.getHours(),
        parseDate.minutes = time.getMinutes(),
        parseDate.date = time.getDate(),
        parseDate.day = days[time.getDay()],  //день недели
        parseDate.month = months[time.getMonth()],    //месяца
        parseDate.summary = parseDate.hours + ':' + parseDate.minutes

    return parseDate;
}

class Flight extends Component {

    render() {
        const {from, to, arrival, departure, carrier } = this.props

        const objArrival = parseDateString(arrival);
        const objDeparture = parseDateString(departure);
        return <div className='flight' id={carrier}>
            <p>{carrier}</p>
            <p>ТУДА, {objDeparture.date} {objDeparture.month}, {objDeparture.day}</p>
            <p>{objDeparture.summary} - {objArrival.summary}({objArrival.date} {objArrival.month})</p>
            <p>Из {from} в {to}</p>
        </div>
    }
}


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props[0]};
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
        this.props.setCarrier(e.target.value);
    }

    render() {
        const {uniqueCarriers}=this.props
        return (
            <div className='form-group'>
                <label htmlFor='select'>Выберите рейс для показа</label>
                <select value={this.state.value} onChange={this.onChange.bind(this)} className='form-control'>
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
        var flightslist = flights.flights.map(function (flight) {
            if (flights.carrierToShow === flight.carrier || flights.carrierToShow === 'all') {
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
        var uniqueCarriers = findUniqueCarriers(flights);
        uniqueCarriers.splice(0, 0, 'all');
        return (
            <div className='flightList'>
                <SelectBox uniqueCarriers={uniqueCarriers} setCarrier={setCarrier}/>
                {flightslist}
            </div>)
    }
}