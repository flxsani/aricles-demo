import React, { Component } from 'react';
class AboutComp extends Component {
    render(props) {
        console.log("InAboutUsComponentRender");
        return (
            <React.Fragment>
                <div style={{ paddingBottom: 200, paddingTop:50 }}>
                    <h1>Hello this is About Page</h1>
                    <div style={{ padding: 10, }}>
                        <input type="button" value="Back" id="backBtn" onClick={this.props.back} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutComp;