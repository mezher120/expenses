import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';
import Party from './components/Party';



function App() {

  return (
    <div className="App">
      <Header></Header>
      <Routes>
      <Route exact path='/' element={
        <Form></Form>}>
      </Route>
      <Route path='/:id' element={
        <Party></Party>}>
      </Route>

      </Routes>
    </div>
  );
}

export default App;
