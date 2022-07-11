import React, { Component } from 'react'

export class NewsItem extends Component {
  
    render() {
        let{title,description,imageurl, newsurl}=this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageurl?imageurl:"https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
