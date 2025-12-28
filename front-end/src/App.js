import logo from './logo.svg';
import './App.css';
import * as API from './JS/API/API.js';
import { useEffect ,useState } from 'react';
function App() {
  const [data, setData] = useState(null);

  useEffect(() => { 
    async function fetchData() {
      const response = await API.CallAPI(null, { url: 'api/test', PhuongThuc: 2 });
      alert(JSON.stringify(response));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
