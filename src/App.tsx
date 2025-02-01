import React from 'react';
import CityDistanceCalculator from './components/CityDistanceCalculator';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>City Distance Calculator</h1>
                <CityDistanceCalculator />
            </header>
        </div>
    );
};

export default App;
