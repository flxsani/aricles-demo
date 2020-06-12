import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginComp extends Component {
    render(props) {
        return (
            <React.Fragment>
                <div className="login-page">
                    <div className="login-box">
                        <div className="login-logo">
                            <b>User</b> Login
                        </div>
                        {/*<!-- /.login-logo -->*/}
                        <div className="login-box-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form onSubmit={() => { this.props.login() }}>
                                <div className="form-group has-feedback">
                                    <input type="email" className="form-control" placeholder="Email" name="txtEmail" onChange={(e) => this.props.handleChange(e)} />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                </div>
                                {this.props.myState.errors.txtEmail.length > 0 &&
                                    <span className='text-red'>{this.props.myState.errors.txtEmail}</span>}

                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control" placeholder="Password" name="txtPassword" onChange={(e) => this.props.handleChange(e)} />
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                </div>
                                {this.props.myState.errors.txtPassword.length > 0 &&
                                    <span className='text-red'>{this.props.myState.errors.txtPassword}</span>}

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 text-center">
                                        <input type="button" className="btn btn-primary btn-block btn-flat" onClick={() => { this.props.login() }} value="Sign In" />
                                    </div>
                                </div>
                            </form>


                            <div style={{ paddingTop: 10, }}>
                                <Link className="text-center" to={{
                                    pathname: '/forgetpassword'
                                }}>I forgot my password</Link> <br />
                                <Link className="text-center" to={{
                                    pathname: '/register'
                                }}>Create an account</Link>
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

export default LoginComp;