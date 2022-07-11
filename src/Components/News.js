import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor() {
        super();
        console.log("Hello i am a news construcor")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }


    }
    async componentDidMount() {
        console.log("cdm")
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc56f66e9bf44f1f91538b64c8b34c82&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    previousClickHandle = async () => {
        console.log("Previous click")

        let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc56f66e9bf44f1f91538b64c8b34c82&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
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
            let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc56f66e9bf44f1f91538b64c8b34c82&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
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
    render() {
        return (
            <div className="container my-3">
                <h2 className='text-center'>SoftNews Top headline</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (<div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} />
                        </div>)
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.previousClickHandle}>&#8249; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextClickHandle}>Next &#8250;</button>

                </div>
            </div>
        )
    }
}

export default News
