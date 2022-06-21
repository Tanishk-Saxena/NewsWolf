import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string,
        title: PropTypes.string
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = this.props.title==="NewsMonkey - Get your daily dose of news for free!"?this.props.title: this.props.title + "- NewsMonkey";
    }

    fetchMoreData = async () => {
        // await this.setState({
        //     page: this.state.page+1
        // });
        this.state.page+=1;
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
            // totalPages: Math.ceil(parsedData.totalResults/this.props.pageSize)
        });
    };

    async componentDidMount(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        this.props.setProgress(40);
        let parsedData=await data.json();
        this.props.setProgress(80);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
            // totalPages: Math.ceil(parsedData.totalResults/this.props.pageSize)
        });
        this.props.setProgress(100);
    }

    handleNextClick = async () => {
        await this.setState({page: this.state.page+1});
        this.componentDidMount();
    }

    handlePreviousClick = async () => {
        await this.setState({page: this.state.page-1});
        this.componentDidMount();
    }
    
    render() {
        return (
            <>
                
                
                <h1 className="text-center" style={{margin: "35px 0px 0px"}}>{this.props.title==="NewsMonkey - Get your daily dose of news for free!"?"NewsMonkey - Top Headlines":`Top ${this.props.title} Headlines`}</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner/>}
                >

                {this.state.loading && <Spinner/>}
                
                <div className="container my-4">
                    <div className="row" style={{margin: "30px 0px"}}>
                        {this.state.articles.map((element) => {
                            return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                            )
                        })}
                    </div>
                </div>

                </InfiniteScroll>


                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page>=(Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}


            </>
        )
    }
}

export default News