import React, { Component } from "react";
// import '../assests/css/style.css'; 
import { HeaderCtrl } from '../common/header-normal/'
import { FooterCtrl } from '../common/footer/'
// import { PnkConnect } from '../pnk-react/pnk-miniredux'
export default class SinglePageLayout extends Component {
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
    console.log("InSimpleLayout::", this.props);
    this.InitUser();
  }
  InitUser = () => {
    let { location } = this.props;
    if (this.props.location.state.User == undefined || this.props.location.state.User._id == undefined) {
      console.log("UserNotAvailable in location");
      let user = localStorage.getItem('User');
      if (user !== null) {
        user = JSON.parse(user);
        console.log("UserAvailable in Storage::::", user);
        this.setState({
          user: user
        })

      }
      else {
        console.log("UserNotAvailable:Go and login again:::");
        this.props.history.go('/');
      }
    }
    else {
      console.log("UserAvailable in location", this.props.location.state.User);
      this.setState({
        user: this.props.location.state.User
      })
    }
  }

  render() {
    // alert('in render')
    console.log("InSinglelayoutRender");
    document.body.style.backgroundColor = '#d2d6de';

    return (

      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <HeaderCtrl {...this.props} HandleLoader={this.HandleLoader} userData={this.state.user} />
          <hr />
          {/* <!-- content --> */}
          <div style={{ paddingTop: 20, }}>
            {this.state.isLoader ? <div style={{ width: '100vw', height: '100vh', }} classNameName="d-flex justify-content-center align-items-center">
              <img src='images/flx/loading.gif' width="50px" height='50px' />
            </div>
              :
              <React.Fragment>
                <this.props.children {...this.props} HandleLoader={this.HandleLoader} userData={this.state.user} />
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
