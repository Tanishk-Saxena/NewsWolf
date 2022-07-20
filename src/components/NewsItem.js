import React from 'react'
import defImage from '../DefaultNews.png'

const NewsItem = (props) => {
  let {title, description, imageUrl, newsUrl, author, date, source} = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{display: "flex", position: "absolute", justifyContent: "flex-end", right: 0}}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={imageUrl?imageUrl:defImage} className="card-img-top" alt="not received" height="200px"/>
        <div className="card-body">
            <h5 className="card-title">{title?title.slice(0, 50)+"...":"no title received"}</h5>
            <p className="card-text">{description?description.slice(0, 100)+"...":"no description received"}</p>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem