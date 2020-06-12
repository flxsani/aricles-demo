import React, { Component } from 'react';
import { Capitalize, TimeDifference } from '../../../utils/appUtils';
import { PnkPagination } from '../../../utils/pagination';
class ArticleMasterListComp extends Component {
    render(props) {
        return (
            <React.Fragment>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Master Article List</h3>

                        <button class="btn btn-primary btn-flat" style={{ float: 'right', marginLeft: 5, }} onClick={() => { this.props.addMoreAticles() }}>Add more Articles {this.props.myState.isLoading ? <i class="fa fa-refresh fa-spin"></i> : null}</button>
                    </div>
                    <div className="box-body table-responsive">
                        {this.props.myState.articles ?
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: 10 }}>#</th>
                                        <th style={{ width: 10 }}>Title</th>
                                        <th style={{ width: 10 }}>Url</th>
                                        <th style={{ width: 10 }}>Hacker Url</th>
                                        <th style={{ width: 10 }}>Posted On</th>
                                        <th style={{ width: 10 }}>Votes</th>
                                        <th style={{ width: 10 }}>Comments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.myState.articles.rows.map((article, index) => {
                                        return <tr key={article._id}>
                                            <td style={{ width: 10 }}>{this.props.myState.startCount + index}</td>
                                            <td style={{ width: 10 }}>{article.title}</td>
                                            <td style={{ width: 10 }}>{article.url}</td>
                                            <td style={{ width: 10 }}>{article.hacker_news_url}</td>
                                            <td style={{ width: 10 }}>{TimeDifference(article.posted_on)}</td>
                                            <td style={{ width: 10 }}>{article.up_votes}</td>
                                            <td style={{ width: 10 }}>{article.comments}</td>
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

export default ArticleMasterListComp;