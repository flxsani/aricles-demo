import React, { Component } from 'react';
class pnkPagination extends Component {
    constructor(props) {
        super();
        this.state = {
            getStudentMasterListFlag: false,
            studentMaster: null,
            heads: []
        };
        console.log("InHomeControllerContructor");
    }


    // HandleChange = (e) => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }

    componentDidMount() {
        // this.setState({
        //     getStudentMasterListFlag: true
        // })
        // GetStudentMasterList(this.HandleStudentMasterList)
    }
    render() {
        return (
            <React.Fragment>
                <ul className="pagination pagination-sm no-margin pull-right">
                    <li onClick={() => this.props.subsequentMethod(1)}>
                        <a>&laquo;</a>
                    </li>
                    {this.props.metarow.currentSetNo - 2 > 0 ? <li onClick={() => this.props.subsequentMethod(this.props.metarow.currentSetNo - 2)}>
                        <a href="#">{this.props.metarow.currentSetNo - 2}</a>
                    </li> : null}
                    {this.props.metarow.currentSetNo - 1 > 0 ? <li onClick={() => this.props.subsequentMethod(this.props.metarow.currentSetNo - 1)}>
                        <a href="#">{this.props.metarow.currentSetNo - 1}</a>
                    </li> : null}

                    <li className="active" onClick={() => this.props.subsequentMethod(this.props.metarow.currentSetNo)}>
                        <a href="#">{this.props.metarow.currentSetNo}</a>
                    </li>

                    {this.props.metarow.currentSetNo + 1 <= Math.ceil((this.props.metarow.totalRecordsInDb / this.props.metarow.totalRecordsInSet)) ? <li onClick={() => this.props.subsequentMethod(this.props.metarow.currentSetNo + 1)}>
                        <a href="#">{parseInt(this.props.metarow.currentSetNo) + 1}</a>
                    </li> : null}

                    {this.props.metarow.currentSetNo + 2 <= Math.ceil((this.props.metarow.totalRecordsInDb / this.props.metarow.totalRecordsInSet)) ? <li onClick={() => this.props.subsequentMethod(this.props.metarow.currentSetNo + 2)}>
                        <a href="#">{parseInt(this.props.metarow.currentSetNo) + 2}</a>
                    </li> : null}

                    {/*<li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>*/}
                    <li><a onClick={() => this.props.subsequentMethod(Math.ceil(this.props.metarow.totalRecordsInDb / this.props.metarow.totalRecordsInSet))}>&raquo;</a></li>
                </ul>
            </React.Fragment>
        );
    }

}

export const PnkPagination = pnkPagination;