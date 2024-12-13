import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import StudHomePage from './pages/StudentHome';
import DonorPage from './pages/DonorPage';
import RecipientPage from './pages/RecipientPage';
import Footer from './components/Footer';
import FacultyLogin from './components/FacultyLogin';
import Login from './components/Login';
import FacultyHome from './pages/FacultyHome';
import Addusers from './pages/AddUsers';
import View from './pages/ViewComplaints';
import ViewUsers from './pages/ViewUsers';
import UpdateComplaint from './pages/UpdateComplaint';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import HistoryOfComplaints from './pages/ComplaintHistory';
import AddFaculty from './pages/AddFaculty';
import AssignComplaints from './pages/AssignComplaints';
import AdminHome from './pages/AdminHome';
import { FacultyComplaints } from './pages/FacultyComplaints';
import AdminLogin from './pages/AdminLogin';
import AdminAnalytics from './pages/Analytics';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app inside the AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-home" element={<FacultyHome />} />
          <Route path="/add-users" element={<Addusers />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/profile" element={<Profile />} /> {/* Updated */}
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Updated */}
          <Route path="/view-complaints" element={<View />} />
          <Route path="/stud-home" element={<StudHomePage />} />
          <Route path="/register-complaint" element={<DonorPage />} />
          <Route path="/view-status" element={<RecipientPage />} />
          <Route path="/update-complaint-status" element={<UpdateComplaint />} />
          <Route path="/history" element={<HistoryOfComplaints/>} />
          <Route path="/add-faculty" element={<AddFaculty/>} />
          <Route path="/assign-faculties" element={<AssignComplaints/>} />
          <Route path="/admin-home" element={<AdminHome/>} />
          <Route path="/view-assigned-complaints" element={<FacultyComplaints/>} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/analytics" element={<AdminAnalytics/>} />
        </Routes>
        { <Footer /> }
      </Router>
    </AuthProvider>
  );
};

export default App;
