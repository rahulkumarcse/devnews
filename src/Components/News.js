import React, { Component } from 'react'
import { PropTypes } from "prop-types";
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "general",
        apiKeey : "dc56f66e9bf44f1f91538b64c8b34c82"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    

    constructor() {
        super();
        console.log("Hello i am a news construcor")
        this.state = {
            articles: [],
            loading: false,
            page: 1 ,
            totalResults :0
        }
    }
    async componentDidMount() {
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKeey}&page=${this.state.page}&category=${this.props.category}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        this.props.setProgress(30)
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }
    previousClickHandle = async () => {
        console.log("Previous click")
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKeey}&page=${this.state.page - 1}&category=${this.props.category}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    nextClickHandle = async () => {
        console.log("Pnext click")
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKeey}&page=${this.state.page + 1}&category=${this.props.category}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(apiUrl)
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    fetchMoreData = async () => {
      this.setState({page : this.state.page +1})
      let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKeey}&page=${this.state.page + 1}&category=${this.props.category}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            this.props.setProgress(30)
            let data = await fetch(apiUrl)
            
            let parsedData = await data.json()
            
            console.log(parsedData)
            
            this.props.setProgress(70)
            this.setState({
               totalResults : parsedData.totalResults,
                articles: this.state.articles.concat(parsedData.articles),
                loading: false
            })
            this.props.setProgress(100)
      }

    render() {
        return (
            < >
                <h2 className='text-center' style={{ margin: '35px' }}>SoftNews Top headline</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container'>
                    <div className="row">

                        {/*!this.state.loading &&*/ this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} publishDate={element.publishedAt.slice(0, 10) + " " + element.publishedAt.slice(11, 16)} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
               {/*infinite scroll added*/}
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.previousClickHandle}>&#8249; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextClickHandle}>Next &#8250;</button>

                </div> */}
            </>
        )
    }
}

export default News
