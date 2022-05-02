import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Construction from '../Misc/Construction';
import Home from '../Pages/PageComponents/Home';
import Fate from '../Misc/Fate';
import Phantom from '../Pages/PageComponents/WalletCon/Phantom/Connection/Phantom'
import Test from '../Misc/Test';
import Trade from '../Pages/PageComponents/Trade/Trade';
import Sidebar from '../Pages/PageComponents/Sidebar/Sidebar';

export default function Routing() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/construction" element={<Construction />}/>
          <Route  path="/fate1x" element={<Fate />} />
          <Route  path ="/test" element={<Phantom showTransact={true} showMint={true} transactionAmount={0}/>} />
          <Route  path ="/testies" element={<Test/>} />
          <Route  path ="/trade" element={<Trade name= 'DeGods' url="https://i.imgur.com/cqeqoZk.png" pfp='https://i.imgur.com/fO3tI1t.png'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
