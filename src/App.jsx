import ContactFormPopup from './components/common/ContactFormPopup';
import Header from './components/common/Header';
import About from './pages/About';
import Home from './pages/Home';


function App() {
  return (
    <div>
      <Header />
      <Home />
      <About />
      <ContactFormPopup />
    </div>
  );
}

export default App;