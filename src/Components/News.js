import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
// import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const updateNews = async () => {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fa50396946e04c29b2c6ef1e3e74e1b2&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();

        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = ` ${capitalize(props.category)} - NewsPupper`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }
    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fa50396946e04c29b2c6ef1e3e74e1b2&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);

    }
    return (
        <>
            <h1 className='text-center' style={{
                margin: '35px 0px',
                marginTop : '90px'
            }}>NewsPupper - Top Headlines from {capitalize(props.category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={(element.author ? 'By ' + element.author : "By Unknown")} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={state.page <= 1} type="button" class="btn btn-dark" onClick={handlePrevClick} >&larr; Previous</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News