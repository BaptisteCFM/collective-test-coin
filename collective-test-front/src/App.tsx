import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import CoinsPage from './pages/CoinsPage/CoinsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CoinsPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
