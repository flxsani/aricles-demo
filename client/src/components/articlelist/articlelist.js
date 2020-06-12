import React, { Component } from 'react';
import { Capitalize, TimeDifference } from '../../utils/appUtils';
import { PnkPagination } from '../../utils/pagination';
class ArticleListComp extends Component {
    render(props) {
        return (
            <React.Fragment>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Latest Articles</h3>
                    </div>
                    <div className="box-body table-responsive">
                        {this.props.myState.articles ?
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th >#</th>
                                        <th >Title</th>
                                        <th >Url</th>
                                        <th >Hacker Url</th>
                                        <th >Posted On</th>
                                        <th >Votes</th>
                                        <th >Comments</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.myState.articles.rows.map((article, index) => {
                                        return <tr key={article._id}>
                                            <td >{this.props.myState.startCount + index}</td>
                                            <td >{article.title}</td>
                                            <td >{article.url}</td>
                                            <td >{article.hacker_news_url}</td>
                                            <td >{TimeDifference(article.posted_on)}</td>
                                            <td >{article.up_votes}</td>
                                            <td >{article.comments}</td>
                                            <td style={{ width: 10 }}><input type="button" className="btn btn-primary" value="Read" onClick={() => this.props.read(article._id)} /></td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                            :
                            <h3>No data available!</h3>
                        }
                    </div>
                    {this.props.myState.articles ? <div className="box-footer clearfix">
                        <PnkPagination metarow={this.props.myState.articles.metarow} subsequentMethod={this.props.handleSubsequentPages} />
                    </div>
                        :
                        null
                    }
                </div>

            </React.Fragment>
        );
    }
}

export default ArticleListComp;