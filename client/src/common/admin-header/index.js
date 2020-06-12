import React, { Component } from 'react';
import HeaderComp from './header';
import { PnkConnect } from '../../pnk-react/pnk-miniredux';
class headerCtrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    scrollOnCurrentPage = (e) => {
        setTimeout(e.target.click(), 2500);
        this.ToggleHeader(1);
    }
    ToggleHeader = (e) => {
        if (e == 1) {
            document.getElementById('header').classList.remove('active');
            document.getElementById('toggle-btn').classList.remove('active');
        } else {
            document.getElementById('header').classList.toggle('active');
            document.getElementById('toggle-btn').classList.toggle('active');
        }
    }
    Logout = () => {
        localStorage.clear();
        this.props.PnkStore.SetData("user", "");
        this.props.PnkStore.SetData("authToken", "");
        this.props.PnkStore.BroadCast();
        // this.props.appstate.BrodCastChange();
        this.props.componentprops.componentprops.history.replace('/');
    }
    render() {
        return (
            <React.Fragment>
                <HeaderComp ToggleHeader={this.ToggleHeader} scrollOnCurrentPage={this.scrollOnCurrentPage} {...this.props} HandleLoader={this.props.HandleLoader} myState={this.state} userData={this.props.PnkStore.GetData('user')} logout={this.Logout}/>
            </React.Fragment>
        );
    }
}


export const HeaderCtrl = PnkConnect(headerCtrl, 'user');


