import React, { useState } from 'react'
import Phantom from '../WalletCon/Phantom/Connection/Phantom'
import Sidebar from '../Sidebar/Sidebar'
import './Trade.scss'
import Modal from "react-modal";
import StrikeModal from './Components/Modal/StrikeModal'
import {reactLocalStorage} from 'reactjs-localstorage';

//remember that the button that says "trade" isnt the minting button but rather a dropup button that opens to "buy calls" and "buy puts" which is a bunch of cards with minting attached
interface cardValues{
  name: string,
  url: string,
  pfp: string,
}


export default function Trade(props: cardValues) {
  const [purchaseText, setPurchaseText] = useState('Buy')
  const [checked, setChecked] = useState(false)
  const [optionType, setOptionType] = useState('Call')
  const [clicked, setClicked] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [strike, setStrike] = useState(205); {/* Change To Based On Strike They Chose */}
  const [num, setNum] = useState(1)


  function Buying(){
    setPurchaseText('Buy')
    setChecked(false)
  }
  function Selling(){
    setPurchaseText('Sell')
    setChecked(false)
  }

  function switchType() {
    if(clicked == false) {
      setClicked(true)
      setOptionType('Call')

    }
    else {
      setClicked(false  )
      setOptionType('Put')
    }
  }

  function increment() {
    setNum(num + 1)
  }

  function decrement() {
    setNum(num - 1)
  }

  
  return (
      <>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='Trade'>

          <div className='dropMenu'>
            <label htmlFor="touch"><span>{purchaseText}</span></label>               
            <input type="checkbox" id="touch" checked={checked} onChange={(e) => setChecked(e.target.checked)}/> 
              <ul className="slide">
                <li><button className='buySell' onClick={Buying}>Buy</button></li> 
                <li><button className='buySell' onClick={Selling}>Sell</button></li>  
              </ul>
          </div>

          <hr className='hr' />
          
          <div className='optionType'>
            <h2 id='type'>Option Type: </h2>
            <button className='typeButton' id='typeBtn' onClick={switchType}>{optionType}</button>
          </div>

          <div className='strikePrice'>
            <h2 id='strike'>Strike Price: </h2>
            <button className='strikeButton' id='strikeBtn' onClick={() => setIsOpen(true)}>{strike}◎</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before"
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before"
              }}
              closeTimeoutMS={500}
            >
              <button onClick={() => setIsOpen(false)} id="closeModal">X</button>
              <div className='allStrikes'>
                <StrikeModal strike={205} perc={20} vol={293} break={209} setIsOpen={setIsOpen}/> 
                <StrikeModal strike={208} perc={20} vol={293} break={209} setIsOpen={setIsOpen}/>

              </div>
            </Modal> 
          </div>
          
          <div className='numContracts'>
            <h2 id='num'># Of Contracts: </h2>
            <div className="quantity-counter">
              <button id="counter-increment" className="increment" onClick={increment}>+</button>
              <input id="counter-value" className="value" type="number" value={num} />
              <button id="counter-decrement" className="decrement" onClick={decrement}>-</button>
            </div>
          </div>

        </div>
        


      <Phantom showTransact={false} showMint={false} transactionAmount={0}/>
      <div className='graph'>
          <img src='https://i.imgur.com/cqeqoZk.png' className='graphImg'/>
      </div>
    </>
  )
}
