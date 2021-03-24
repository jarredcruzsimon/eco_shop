import React from 'react'
import Menu from './Menu.js'

const Layout = (props) =>{
    const {title='Title', description='Description', children, className } = props
    
    return(
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default Layout