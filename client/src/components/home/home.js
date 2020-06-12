import React, { Component } from 'react';
class HomeComp extends Component {
    render(props) {
        console.log("InHomeComponentRender::", this.props);
        return (
            <React.Fragment>
                <div style={{ paddingBottom: 200, paddingTop: 50, }}>
                    <h1>Hello this is Home Page</h1>
                    
                    <div style={{ padding: 10, }}>
                        Value 1 : <input type="text" name="txtFirstName" id="txtFirstName" value={this.props.myState.txtFirstName} onChange={(e) => this.props.handleChange(e)} /> <br /> <br />
                        Value 2 : <input type="text" name="txtLastName" id="txtLastName" value={this.props.myState.txtLastName} onChange={(e) => this.props.handleChange(e)} />

                    </div>
                    <div style={{ padding: 10, }}>
                        <input type="button" value="Add User" id="addBtn" onClick={this.props.addUser} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default HomeComp;