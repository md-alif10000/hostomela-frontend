import React from 'react'
import Header2 from '../Header'
import Header3 from '../Header/index2'
import MenuHeader from '../MenuHeader'

export default function Layout(props) {
    return (
       <>
       <Header3/>
       <Header2/>
       {/* <MenuHeader/> */}
       {props.children}
       </>
    )
}
