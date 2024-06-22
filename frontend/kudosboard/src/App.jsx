import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CardPage from './Pages/CardPage'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/Boards' element={<HomePage />} />
          <Route path='/boards/:boardId/cards' element={<CardPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
 
}
export default App

// /boards/:board_id/cards