import React from 'react'
import Header from '../Header'


export default function Layout(props) {
    return (
       <>
       
       <Header fixed/>
       {/* <MenuHeader/> */}
       {props.children}
       </>
    )
}
