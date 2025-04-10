import React from 'react'
import SearchBar from './partials/SearchBar'
import MessageDisplay from './partials/MessageDisplay'
import Navigation from '../Navigation/Navigation'
import "./messages.css";

const Messages = () => {
  return (
    <div className='messages'>
        <h2>Messages</h2>
        <SearchBar />
        <MessageDisplay /> 
        <Navigation />
    </div>
  )
}

export default Messages