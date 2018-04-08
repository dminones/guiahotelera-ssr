import Layout from '../components/MyLayout.js'
import React, { Component } from 'react'
import {Header, Listing } from '../components'
import { getDestination, getItems, strings } from '../data';
import Head from 'next/head'

export default function FinalDestination(props) {
    const destination = props.destination;
    const catText = props.category ? 
                ((strings[props.category] && strings[props.category].plural) ? strings[props.category].plural :  props.category) : 
                'Atracciones';
    return(
        <div>
            <Head>
                <title>{catText} en {destination.name} - {props.site.name}</title>
            </Head>
            <Header src={ destination.image } title={ destination.name } headerFixed={true} />
            <Listing 	destination={destination} 
                        category={props.category} 
                        results={props.results} />
        </div>
    )
}