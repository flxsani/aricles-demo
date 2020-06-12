import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Aputils from '../../apputils'
export default class HeaderComp extends Component {
    render() {
        return (
            <React.Fragment>
                {/*<!--Main Navigation-->*/}
                <header>
                    <div className="conatiner">
                        <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar" style={{ backgroundColor: '#000' }}>
                            {this.props.userData.role == 'Super Admin' ? <Link to={{
                                pathname: '/admin'
                            }} className="navbar-brand"><strong>Articles Demo</strong></Link>
                                : <Link to={{
                                    pathname: '/articles'
                                }} className="navbar-brand"><strong>Articles Demo</strong></Link>
                            }
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        {this.props.userData.role == 'Super Admin' ? <Link className="nav-link" to={{
                                            pathname: '/admin'
                                        }}>Home <span className="sr-only">(current)</span></Link>
                                            : <Link className="nav-link" to={{
                                                pathname: '/articles'
                                            }}>Home <span className="sr-only">(current)</span></Link>
                                        }

                                    </li>


                                    {/*<li className="nav-item">
                                    <Link to={{
                                        pathname: '/about'
                                    }} className="nav-link">About Us</Link>
                                </li>*/}
                                </ul>
                                {this.props.userData ? <ul className="navbar-nav nav-flex-icons">

                                    <li className="nav-item">
                                        <span className="nav-link">Hi!  {this.props.userData.full_name}  &nbsp; &nbsp;|</span>
                                    </li>
                                    <li className="nav-item" onClick={() => this.props.logout()}>
                                        <span className="nav-link">Logout</span>
                                    </li>

                                </ul>
                                    :
                                    <ul className="navbar-nav nav-flex-icons">
                                        <li className="nav-item">
                                            <span className="nav-link">Hi! Guest</span>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </nav>
                    </div>
                </header>
                {/*<!--Main Navigation-->*/}

            </React.Fragment>
        );
    }
}
