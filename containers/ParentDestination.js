import Layout from '../components/MyLayout.js'
import React, { Component } from 'react'
import {Header, Listing } from '../components'
import { getDestination, getItems, strings } from '../data';
import Head from 'next/head'
import Destinations from '../components/Destinations';
import Items from '../components/Items';

export default function ParentDestination(props) {
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
            <Destinations page={6} 
                      site={props.site.slug} 
                      destinations={props.children}
                      title={'Destinos en '+destination.name} />
            <Items  site={props.site.slug}  
                    publicationType={['PremiumDestino', 'Premium']}
                    summary={ 'Descubri los mejores hoteles en ' + destination.name } 
                    destination={destination} />
        </div>
    )
}