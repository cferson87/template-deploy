import React from 'react';
import './App.css';
import TemplateSelector from './components/TemplateSelector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>ClickUp Template Application</h1>
          <p className="subtitle">Automate template management with one click</p>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          <TemplateSelector />
        </div>
      </main>

      <footer className="App-footer">
        <div className="container">
          <p>&copy; 2024 ClickUp Template Application | OuterBox Design</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
