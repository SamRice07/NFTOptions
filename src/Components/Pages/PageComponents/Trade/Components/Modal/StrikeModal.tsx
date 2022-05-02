import React, { useState } from 'react'
import './Modal.scss'
import {reactLocalStorage} from 'reactjs-localstorage';

interface strikeValues {
    strike: number,
    perc: number,
    vol: number,
    break: number,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StrikeModal(props: strikeValues) {
  const [strikePrice, setstrikePrice] = useState(props.strike)
  
  function logy(){
    reactLocalStorage.set('strike', strikePrice)
    props.setIsOpen(false)
  }

  return (
    <div className='futureOption'>
      <button className='strikeButton' id='priceBtn' onClick={logy}>{props.strike}◎</button> {/*make it to the price of the cotnract*/}
      <div className='collumns'>
        <div>
          <h4 id='priceTxt'>Strike</h4>
          <h1 id='priceValue'>205</h1>
        </div>

        <div>
          <h4 id='percChange'>Percent Change</h4>
          <h1 id='percValue'>20%</h1>
        </div>

        <div>
          <h4 id='Volume'>Today's Volume</h4>
          <h1 id='volValue'>203</h1>
        </div>

        <div>
          <h4 id='breakEven'>Break Even</h4>
          <h1 id='breakValue'>209</h1>
        </div>

      </div>
    </div>
  )
  
}

