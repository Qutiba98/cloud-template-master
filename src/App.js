import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AuthPage from './components/signInAndSignUp/AuthPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import UserPlans from './components/UserPlans';

function App() {
  return (
    <Router>
      <div>
        {/* Always show Header and Footer */}
        <Header />
        
        {/* Define routes for different components */}
        <Routes>
          <Route path="/" element={<Main />} /> {/* Default Route */}
          <Route path="/login" element={<AuthPage />} /> {/* AuthPage Route */}
          <Route path="/UserPlans" element={<UserPlans />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
