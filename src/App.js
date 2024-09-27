import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import AuthPage from './components/signInAndSignUp/AuthPage';
import UserPlans from './components/UserPlans';
import Contact from './components/main/Contact/Contact'; 
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import Contract from './components/profile/Contract';
import Payment from './components/payment/Payment';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/UserPlans" element={<UserPlans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile/contract" element={<Contract />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
