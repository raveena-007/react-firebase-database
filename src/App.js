import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Write from './components/Write';
import Read from './components/Read';
import Update from './components/Update';
import UpdateWrite from './components/UpdateWrite'; // Correct path to UpdateWrite
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Write />} />
          <Route path='/write' element={<Write />} />
          <Route path='/read' element={<Read />} />
          <Route path='/update' element={<Update />} />
          <Route path='/updatewrite/:firebaseId' element={<UpdateWrite />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
