import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForgetPasswordComp extends Component {
    render(props) {
        return (
            <React.Fragment>
                <div className="login-page">
                    <div className="login-box">
                        <div className="login-logo">
                            <b>Recover</b> Password
                        </div>
                        {/*<!-- /.login-logo -->*/}
                        <div className="login-box-body">
                            <p className="login-box-msg">Your registered email address</p>

                            <form onSubmit={() => { this.props.forgetPassword() }}>
                                
                                <div className="form-group has-feedback">
                                    <input type="email" className="form-control" placeholder="Email" name="txtEmail" onChange={(e) => this.props.handleChange(e)} />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                </div>
                                {this.props.myState.errors.txtEmail.length > 0 &&
                                    <span className='text-red'>{this.props.myState.errors.txtEmail}</span>}

                                
                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 text-center">
                                        <input type="button" className="btn btn-primary btn-block btn-flat" onClick={() => { this.props.forgetPassword() }} value="Submit" />
                                    </div>
                                </div>
                            </form>
                            <div style={{ paddingTop: 10, }}>
                                <Link className="text-center" to={{
                                    pathname: '/'
                                }} >Go back to login</Link>
                            </div>
                        </div>
                        {/*<!-- /.login-box-body -->*/}
                    </div>
                    {/*<!-- /.login-box -->*/}
                </div>
            </React.Fragment>
        );
    }
}

export default ForgetPasswordComp;