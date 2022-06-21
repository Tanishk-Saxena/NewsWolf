import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);

    // document.title = props.title==="NewsMonkey - Get your daily dose of news for free!"?props.title: props.title + "- NewsMonkey";

    const fetchMoreData = async () => {
        await setPage(page+1);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        // setTotalPages(Math.ceil(parsedData.totalResults/props.pageSize));
    };

    useEffect(() => {
      componentDidMount();
    }, [])
    
    const componentDidMount = async () => {
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data=await fetch(url);
        props.setProgress(40);
        let parsedData=await data.json();
        props.setProgress(80);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        // setTotalPages(Math.ceil(parsedData.totalResults/props.pageSize));
        props.setProgress(100);
        setPage(page+1);
    }

    // const handleNextClick = async () => {
    //      await setPage(page+1);
    //      componentDidMount();
    // }

    // const handlePreviousClick = async () => {
    //      await setPage(page+1);
    //      componentDidMount();
    // }
    
    return (
        <>  
            
            <h1 className="text-center" style={{margin: "35px 0px 0px"}}>{props.title==="NewsMonkey - Get your daily dose of news for free!"?"NewsMonkey - Top Headlines":`Top ${props.title} Headlines`}</h1>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner/>}
            >

            {loading && <Spinner/>}
            
            <div className="container my-4">
                <div className="row" style={{margin: "30px 0px"}}>
                    {articles.map((element) => {
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
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                <button disabled={page>=(Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}

        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    title: PropTypes.string
}

export default News