import React, { Component } from 'react';
import ArticleListComp from './articlelist';
import { GetArticleList, MarkArticleAsRead } from '../../services/article.services';
import { PnkConnect } from '../../pnk-react/pnk-miniredux';
import { HeaderCtrl } from '../../common/admin-header'
import { FooterCtrl } from '../../common/footer'

class articleListCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            articles: null,
            currentPage: 1,
            startCount: 1
        };
    }

    componentDidMount() {
        this.InitUser();
    }
    InitUser = () => {
        // console.log("InArticleListProps::", this.props);
        let user = this.props.PnkStore.GetData('user');
        if (!user || user._id == undefined) {
            // UserNotAvailable in location
            user = localStorage.getItem('User');
            if (user !== null) {
                // UserAvailable in Storage
                user = JSON.parse(user);
                this.props.PnkStore.SetData('user', user);
                this.props.PnkStore.SetData('authToken', user.access_token);
                this.props.PnkStore.BroadCast();
                
                GetArticleList(this.props.PnkStore, this.state.currentPage, this.HandleArticleList)
            }
            else {
                // UserNotAvailable:Go and login again
                this.props.componentprops.history.replace('/');
            }
        }
        else {
            // UserAvailable in Store
            GetArticleList(this.props.PnkStore, this.state.currentPage, this.HandleArticleList)
        }
    }


    HandleArticleList = (error, response) => {
        // console.log("Response::", response);

        if (error) {
            alert("Error:" + error.message);
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires
        }
        else {
            // Successfully get article list
            this.setState({
                articles: response,
                heads: response.rows.length > 0 ? Object.keys(response.rows[0]) : [],
                currentPage: response.metarow.currentSetNo,
                startCount: ((response.metarow.currentSetNo - 1) * response.metarow.totalRecordsInSet) + 1
            })
        }


    }

    GetSubsequentPageData = (pageNo) => {
        GetArticleList(this.props.PnkStore, pageNo, this.HandleArticleList)
    }
    Read = (articleId) => {
        MarkArticleAsRead(this.props.PnkStore, articleId, this.HandleRead);
    }
    HandleRead = (error, response) => {
        // console.log("Response::", response);

        if (error) {
            alert("Error:" + error.message);
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires
        }
        else {
            // Article is successfully marked as read.
            GetArticleList(this.props.PnkStore, this.state.currentPage, this.HandleArticleList)
        }


    }
    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <div className="wrapper" style={{ backgroundColor: '#d2d6de' }}>
                    <HeaderCtrl {...this.props} HandleLoader={this.HandleLoader} />
                    {/* <!-- content --> */}
                    <div className="container" style={{ paddingTop: 100, }}>
                        <ArticleListComp {...this.props} handleChange={this.HandleChange} myState={this.state} handleSubsequentPages={this.GetSubsequentPageData} read={this.Read} />

                        <hr />
                        <FooterCtrl {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}


export const ArticleList = PnkConnect(articleListCtrl, '');