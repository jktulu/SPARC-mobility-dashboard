import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SmartMobilityGoals from './pages/SmartMobilityGoals';
import DataCatalogue from './pages/DataCatalogue';
import WebMap from './pages/WebMap';
import About from './pages/About';

const base = import.meta.env.PROD ? '/mobility-dash' : '/';

function App() {
  return (
    <Router basename={base}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smart-mobility-goals" element={<SmartMobilityGoals />} />
        <Route path="/data-catalogue" element={<DataCatalogue />} />
        <Route path="/webmap" element={<WebMap />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;