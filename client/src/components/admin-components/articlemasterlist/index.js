import React, { Component } from 'react';
import ArticleMasterListComp from './articlemasterlist';
import { GetArticleMasterList, AddMoreAticles } from '../../../services/article.services';
import { PnkConnect } from '../../../pnk-react/pnk-miniredux';
import { HeaderCtrl } from '../../../common/admin-header'
import { FooterCtrl } from '../../../common/footer'

class articleMasterListCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            articles: null,
            currentPage: 1,
            startCount: 1,
            isLoading: false
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

                GetArticleMasterList(this.props.PnkStore, this.state.currentPage, this.HandleArticleList)
            }
            else {
                // UserNotAvailable:Go and login again
                this.props.componentprops.history.replace('/');
            }
        }
        else {
            // UserAvailable in Store
            GetArticleMasterList(this.props.PnkStore, this.state.currentPage, this.HandleArticleList)
        }
    }


    HandleArticleList = (error, response) => {
        // console.log("Response::", response);

        if (error) {
            // Get Article list success
            alert("Error:" + error.message);
            this.setState({
                isLoading: false
            })
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires
            this.setState({
                isLoading: false
            })
        }
        else {
            // Get Article list success
            console.log("inElse")
            this.setState({
                isLoading: false,
                articles: response,
                heads: response.rows.length > 0 ? Object.keys(response.rows[0]) : [],
                currentPage: response.metarow.currentSetNo,
                startCount: ((response.metarow.currentSetNo - 1) * response.metarow.totalRecordsInSet) + 1
            })
        }


    }

    GetSubsequentPageData = (pageNo) => {
        GetArticleMasterList(this.props.PnkStore, pageNo, this.HandleArticleList)
    }

    AddMoreAticles = () => {
        this.setState({
            isLoading: true
        }, () => {
            AddMoreAticles(this.props.PnkStore, this.HandleAddMoreArticles)
        })

    }
    HandleAddMoreArticles = (error, response) => {
        // console.log("Response::", response);

        if (error) {
            alert("Error:" + error.message);
            this.setState({
                isLoading: false
            })
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires
            this.setState({
                isLoading: false
            })
        }
        else {
            // More Aticles added on server and call the Article list API to update the current master list
            // console.log("inElse")
            GetArticleMasterList(this.props.PnkStore, 1, this.HandleArticleList)
        }


    }
    render() {
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <div className="wrapper" style={{ backgroundColor: '#d2d6de' }}>
                    <HeaderCtrl {...this.props} HandleLoader={this.HandleLoader} />
                    {/* <!-- content --> */}
                    <div className="container" style={{ paddingTop: 100, }}>
                        <ArticleMasterListComp {...this.props} handleChange={this.HandleChange} myState={this.state} handleSubsequentPages={this.GetSubsequentPageData} addMoreAticles={this.AddMoreAticles} />

                        <hr />
                        <FooterCtrl {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}


export const ArticleMasterList = PnkConnect(articleMasterListCtrl, '');