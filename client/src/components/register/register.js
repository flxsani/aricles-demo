import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterComp extends Component {
    render(props) {
        return (
            <React.Fragment>
                <div className="login-page">
                    <div className="login-box">
                        <div className="login-logo">
                            <b>User</b> Registration
                        </div>
                        {/*<!-- /.login-logo -->*/}
                        <div className="login-box-body">
                            <p className="login-box-msg">Please fill the details</p>

                            <form onSubmit={() => { this.props.register() }}>
                                <div className="form-group has-feedback">
                                    <input type="text" className="form-control" placeholder="Full Name" name="txtFullName" onChange={(e) => this.props.handleChange(e)} />
                                    <span className="glyphicon glyphicon-people form-control-feedback"></span>
                                </div>
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
                                        <input type="button" className="btn btn-primary btn-block btn-flat" onClick={() => { this.props.register() }} value="Create my account" />
                                    </div>
                                </div>
                            </form>
                            <div style={{ paddingTop: 10, }}>
                                <Link className="text-center" to={{
                                    pathname: '/'
                                }} >Already have an account</Link>
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

export default RegisterComp;