import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import KudoBoard from './components/KudoBoard'
import Banner from './components/Banner'

const App = () => {
 
  return (
    <div>
      <Header />
      <input className="search-bar" type='text' placeholder='Search boards...' />
      <Banner />
      <KudoBoard />
      <Footer />
      
    </div>
    
  )
}
export default App
