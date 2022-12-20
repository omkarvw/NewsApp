import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <>

            <div className="card" >
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge rounded-pill bg-danger" >
                        {source}
                    </span>
                </div>
                <img src={!imageUrl ? "https://a.mortgagenewsdaily.com/dsocial/63238f9d9c51c45985fb5dcb/63238f9d9c51c45985fb5dcb_0_202209160455.jpg?provider=facebook" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">{author} On {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </>
    )

}

export default NewsItem