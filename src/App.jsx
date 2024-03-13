// App.jsx
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import EquipaProvider from './context/EquipaContext';
import Home from './components/Home/Home';
import Layout from './common/Layout';

function App() {

  return (
    <HashRouter>
      <EquipaProvider>
        <Layout>
          <Routes>
            <Route exact path="/*" element={<Login />} />
            <Route exact path="/inicio" element={<Home />} />
          </Routes>
        </Layout>
      </EquipaProvider>
    </HashRouter>
  );
}

export default App;
