import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import AuthPage from './components/signInAndSignUp/AuthPage';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPlans from './components/UserPlans';
import Contact from './components/contact/Contact'; // Import Contact Component

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/UserPlans" element={<UserPlans />} />
<<<<<<< HEAD
          <Route path="/contact" element={<Contact />} /> {/* Contact Page Route */}
=======
          <Route path="/profile" element={<Profile />} />
>>>>>>> 5f95fd323a77e7210c7ce3c72602d77e7ec8e44a
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
