import './Sidebar.scss'
import React, { Component } from 'react'
import * as AIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'


class Sidebar extends Component {
  render() {
    return (
        <nav>
          <ul className="nav__list">
            <li className="nav__item" data-tooltip="Company">
              <a href="/">
                <BsIcons.BsMicrosoft size={120} className={"firstIcon"}/>
              </a>
            </li>
      
            <li className="nav__item" data-tooltip="Home">
              <a href="/construction">
                <AIcons.AiFillHome size={100} className='Icon'/>
              </a>
            </li>

            <li className="nav__item" data-tooltip="Portfolio">
              <a href="/construction">
                <FaIcons.FaRocket size={100} className='Icon'/>
              </a>
            </li>   
      
            <li className="nav__item" data-tooltip="Messages">
              <a href="/construction">
                <BsIcons.BsFillChatDotsFill size={100} className='Icon'/>
              </a>
            </li>
      
            <li className="nav__item" data-tooltip="Account">
              <a href="/construction">
              <RiIcons.RiAccountPinCircleLine size={100} className='Icon'/>
              </a>  
            </li>
          </ul>
        </nav>
    )
  }
}

export default Sidebar