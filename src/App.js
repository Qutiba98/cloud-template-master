import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AuthPage from './components/signInAndSignUp/AuthPage';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPlans from './components/UserPlans';
import Contact from './components/main/Contact/Contact'; 
import StyledClock from './components/main/StyledClock/StyledClock'; // Correct path to StyledClock

function App() {
  return (
    <Router>
      <div>
        <Header />
        <StyledClock /> {/* Display clock */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/UserPlans" element={<UserPlans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
