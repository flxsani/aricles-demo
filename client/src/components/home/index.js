import React, { Component } from 'react';
import HomeComp from './home';
// import AppUtils from '../../apputils';
//import { connect } from 'react-redux';


class homeCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            txtFirstName: '',
            txtLastName: ''
        }
        console.log("InHomeControllerContructor");
    }


    HandleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    AddUser = () => {
        //console.log("state: ", this.state);
        //ToDo: Handle Add User task

    }

    

    render() {
        console.log("InHomeControllerRender", this.props);
        return (
            <React.Fragment>
                <HomeComp {...this.props} handleChange={this.HandleChange} addUser={this.AddUser} myState={this.state}  />
            </React.Fragment>
        );
    }
}

// export const Home = PnkConnect(homeCtrl, '');
export const Home = homeCtrl;