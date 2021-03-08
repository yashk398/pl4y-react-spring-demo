import './App.css';
import Home from './components/home';
import Editor from './components/editor';

function App() {
  const isEditor = false;
  return (
    <div className="App">
      {!isEditor?<Home/>:<Editor/>}
    </div>
  );
}

export default App;
