import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AuthPage from './components/signInAndSignUp/AuthPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPlans from './components/UserPlans';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/UserPlans" element={<UserPlans />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
