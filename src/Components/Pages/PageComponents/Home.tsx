import Sidebar from './Sidebar/Sidebar'
import React, { Component } from 'react'
import  ReactDOM  from 'react-dom'
import { Card } from './Card/Card'
import Phantom from './WalletCon/Phantom/Connection/Phantom';


//<Card name="DeGods" url = "https://i.imgur.com/cqeqoZk.png" totalworth = {-1000} expiry = "4/25/22" cost={40} numcontracts = {1} pfp="https://i.imgur.com/fO3tI1t.png"/>



export default class Home extends Component{
    state = {
      cardArray: [
        {name: 'DeGods', url:"https://i.imgur.com/cqeqoZk.png", totalworth : 1000, expiry: "4/25/22", cost: 40, numcontracts: 1, pfp: "https://i.imgur.com/fO3tI1t.png", type: 'Call', strike: 12},
        {name: 'DeGods', url:"https://i.imgur.com/cqeqoZk.png", totalworth : 2000, expiry: "4/25/22", cost: 80, numcontracts: 2, pfp: "https://i.imgur.com/fO3tI1t.png", type: 'Call', strike: 2, project: '/construction'},
        {name: 'DeGods', url:"https://i.imgur.com/cqeqoZk.png", totalworth : 3000, expiry: "4/25/22", cost: 120, numcontracts: 3, pfp: "https://i.imgur.com/fO3tI1t.png", type: 'Call', strike: 102},

      ]
    }

    add = () => {
      this.setState(state => ({
        cardArray: [...this.state.cardArray, {name: 'DeGods', url:"https://i.imgur.com/cqeqoZk.png", totalworth : 3000, expiry: "4/25/22", cost: 120, numcontracts: 3, pfp: "https://i.imgur.com/fO3tI1t.png", type: 'Put', strike: 2}]
      }))
    }
    
    render() {
    return (
      <>
      <div className='phantom' style={{left: '100px', position:"absolute"}}>
        <Phantom showTransact={false} showMint={false} transactionAmount={0}/>
      </div>
        <div className='wrapper'>

          <div className='sidebar'>
            <Sidebar />
          </div>
          <button onClick={this.add} style={{left:'500px', position:'relative'}}>click me</button>
          <button><a href='/trade'>Trading</a></button>
          <br></br>
          <br></br>
          <button><a href='/testies'>Test</a></button>          
          <div className='allCards' id='allCards' style={{right: '400px', position: 'relative'}}>
            {
              this.state.cardArray.map((card, index) => {
                return(
                  <Card name={card.name} url = {card.url} totalworth = {card.totalworth} expiry = {card.expiry} cost={card.cost} numcontracts = {card.numcontracts} pfp={card.pfp} type={card.type} strike={card.strike} project={card.project}/> 
                )
              })
            }
          </div>
        </div>

        </>
    )
  }
}


