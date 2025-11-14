import logo from './logo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Heroes of the Storm
        </p>
        <a
          className="App-link"
          href="https://heroesofthestorm.blizzard.com/ko-kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Homepage
        </a>
      </header>
    </div>
  );
}

export default App;
