import React from 'react'
import Phantom from '../Pages/PageComponents/WalletCon/Phantom/Connection/Phantom'

export default function Test() {

  return (
    <>
    <h1 style={{top: '40px', position:'absolute'}}>Buy Something!</h1>
      <Phantom showTransact={true} showMint={true} transactionAmount={1} transactLeft='150px' transactTop='100px' mintTop='100px'/>

    </>
  )
}
