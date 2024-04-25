import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from '../src/components/Landing/landing';
import InstallPWA from '../src/components/Install Button/installButton';



function App() {
  return (
    <Router>
      <InstallPWA />
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="install-pwa" element={<InstallPWA />} /> */}
      </Routes>
    </Router>
  );
}

export default App;