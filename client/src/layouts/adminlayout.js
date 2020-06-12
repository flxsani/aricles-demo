import React, { Component } from "react";
// import '../assests/css/style.css'; 
import { HeaderCtrl } from '../common/admin-header'
import { FooterCtrl } from '../common/footer'
import { PnkConnect } from '../pnk-react/pnk-miniredux';

export default class adminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      user: null
    }

  }
  HandleLoader = () => {
    this.setState({
      isLoader: true
    })
    setTimeout(() => {
      this.setState({
        isLoader: false
      })
    }, 100)
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#d2d6de';
    console.log("InAdminLayout::", this.props);
    this.InitUser();
  }
  InitUser = () => {
    let user = this.props.PnkStore.GetData('user');
    if (!user || user._id == undefined) {
      console.log("UserNotAvailable in location");
      user = localStorage.getItem('User');
      if (user !== null) {
        user = JSON.parse(user);
        this.props.PnkStore.SetData('user', user);
        this.props.PnkStore.SetData('authToken', user.access_token);
        this.props.PnkStore.BroadCast();
        console.log("UserAvailable in Storage::::", user);

      }
      else {
        console.log("UserNotAvailable:Go and login again:::");
        this.props.history.go('/');
      }
    }
    else {
      console.log("UserAvailable in Store");

    }
  }
  render() {

    return (

      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <HeaderCtrl {...this.props} HandleLoader={this.HandleLoader} />
          <hr />
          {/* <!-- content --> */}
          <div style={{ paddingTop: 20, }}>
            {this.state.isLoader ? <div style={{ width: '100vw', height: '100vh', }} classNameName="d-flex justify-content-center align-items-center">
              <img src='images/flx/loading.gif' width="50px" height='50px' />
            </div>
              :
              <React.Fragment>
                <this.props.children {...this.props} HandleLoader={this.HandleLoader} />
                <hr />
                <FooterCtrl {...this.props} />
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

export const AdminLayout = PnkConnect(adminLayout, 'user');;