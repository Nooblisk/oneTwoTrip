/**
 * Created by Nooblisk on 10.08.2016.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Flight from '../components/Flight'
import FlightList from '../components/Flight'
import * as pageActions from '../actions/PageActions'


//<Flight id={flightlist.id}
//from={flightlist.direction.from}
//to ={flightlist.direction.to}
//arrival={flightlist.arrival}
//departure={flightlist.departure}
//carrier={flightlist.carrier}
//setCarrier={setCarrier}
//    />

class App extends Component {
    render() {
        const { flightlist } = this.props
        const { setCarrier } = this.props.pageActions

        return <div>
            <FlightList flights={flightlist}
                        setCarrier = {setCarrier}
                        />


        </div>
    }
}

function mapStateToProps (state) {
    return {
        flightlist: state
    }
}


function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


