import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage';
import './Card.scss'
import { ChangeEventHandler } from "react";


interface cardValues{
    name: string,
    url: string,
    totalworth: number,
    expiry: string,
    pfp: string,
    numcontracts ?: number,
    cost ?: number,
    todaysworth ?: number,
    perc ?: number,
    type: string,
    strike: number,
    project?: string    
}



export function Card(props: cardValues) {
    
    //#50C878 for green
    //for left column red ffcccb
    //for right column red F88379
    //for left colum green 90EE90
    //for right column green 0BDA51

    var left = '10px'

    let sign: string = props.totalworth > 0? '+':''

    let id: string = ''

    const Component = props.project ? "a" : "div";

    if(props.totalworth > 0){
        sign = '+'
        id = 'pos'
    }
    else {
        sign = ''
        id = 'neg'
    }

    if(props.strike > 99) {
        left = '-6px'
    }
    else if(9 < props.strike ) {
        left = '2px'
    }


    return (
        <>
                <div className='cardWrapper' id={id}>
                    <Component href={props.project}>
                        <div className='card'>
                            <div className='namewrapper'>
                                <h1>{props.name} <img src = {props.pfp} alt={props.name} className="pfp"/></h1>
                            </div>
                            <hr className='cardhr'/>
                            <div className='trapezoid'>
                                <h1 className='trapText' id='strikeText'style={{left: left}}>{props.strike}◎</h1>
                                <h4 className='trapText' id='typeText'>{props.type}</h4>
                            </div>
                            <div className='imgwrapper'>
                                <img src={props.url} alt={props.name}/>
                            </div>
                            <div className='totalwrapper'>
                                <h1>{sign}{props.totalworth} SOL</h1>
                            </div>
                            <div className='expirywrapper'>
                                <h5>{props.expiry}</h5>
                            </div>
                            <hr className='cardhr'/>
                            <div className='column' id='column1'>
                                <h6># of contracts:</h6>
                                <h2>{props.numcontracts} Contract</h2> 
                            </div>
                            <div className='column' id='column2'>
                                <h6>cost:</h6>
                                <h2>{props.cost} SOL</h2>
                            </div>
                        </div>
                    </Component>
                </div>
        </>
    )
}
