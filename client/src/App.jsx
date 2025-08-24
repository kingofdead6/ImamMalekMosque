import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import Quran from './pages/QuranPage';
import DawaratPage from './pages/DawaratPage';
import LibraryPage from './pages/LibraryPage';
import DawratRegistration from './components/Dawarat/Register';
import LibraryRegistration from './components/Library/LibraryRegistration';
import BooksPage from './components/Library/Books';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import JumuaDashboard from './components/admin/JumuaDashboard';
import TilawaDashboard from './components/admin/TilawaDashboard';
import ContactDashboard from './components/admin/ContactDashboard';
import NewsletterDashboard from './components/admin/NewsletterDashboard';
import DawraDashboard from './components/admin/DawraDashboard';
import LibraryDashboard from './components/admin/LibraryDashboard';
import BooksDashboard from './components/admin/BooksDashboard';
import AddAdmin from './components/admin/AddAdmin';
import OpeningDashboard from './components/admin/OpeningDashboard';
import ViewUsers from './components/admin/ViewUsers';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/shared/ScrollTop';

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ children, superadminOnly = false }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (superadminOnly && role !== 'superadmin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

// Wrapper to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard') || location.pathname === '/add-admin';
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/dawarat" element={<DawaratPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/registration" element={<DawratRegistration />} />
          <Route path="/libraryregistration" element={<LibraryRegistration />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={   <PrivateRoute>     <Dashboard />   </PrivateRoute> }>
            <Route index element={<Navigate to="/dashboard/jumua" />} />
            <Route path="jumua" element={<JumuaDashboard />} />
            <Route path="tilawa" element={<TilawaDashboard />} />
            <Route path="contact" element={<ContactDashboard />} />
            <Route path="newsletter" element={<NewsletterDashboard />} />
            <Route path="dawra" element={<DawraDashboard />} />
            <Route path="library" element={<LibraryDashboard />} />
            <Route path="books" element={<BooksDashboard />} />
            <Route path="library-times" element={<OpeningDashboard />}/>
            <Route path="add-admin" element={<PrivateRoute superadminOnly>  <AddAdmin /></PrivateRoute>  }/>
            <Route path="users" element={<PrivateRoute superadminOnly>  <ViewUsers /></PrivateRoute>  }/>

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;