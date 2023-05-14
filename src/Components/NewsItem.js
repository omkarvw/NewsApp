import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <>

            <div className="card" >
                <img src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">{author} On {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                    }}>
                        <span className="badge rounded-pill bg-danger" >
                            {source}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NewsItem
