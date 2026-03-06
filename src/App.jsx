import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import ProtectedSuperAdminRoute from './components/ProtectedSuperAdminRoute'
import DashboardLayout from './components/DashboardLayout'
import AdminLayout from './components/AdminLayout'
import SuperAdminLayout from './components/SuperAdminLayout'

import Home from './pages/Home'
import WhoIsSamrajyaLakshmi from './pages/About/WhoIsSamrajyaLakshmi'
import AboutTemple from './pages/About/AboutTemple'
import Trustees from './pages/About/Trustees'
import MahaSamsthanam from './pages/About/MahaSamsthanam'
import TempleConstructionLive from './pages/Darshan/TempleConstructionLive'
import BookPuja from './pages/PujaSeva/BookPuja'
import SpecialRituals from './pages/PujaSeva/SpecialRituals'
import Prasadam from './pages/PujaSeva/Prasadam'
import TempleCalendar from './pages/Events/TempleCalendar'
import RegisterTickets from './pages/Events/RegisterTickets'
import Store from './pages/Store'
import EHundi from './pages/EHundi'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Volunteer from './pages/Community/Volunteer'
import Testimonials from './pages/Community/Testimonials'
import MediaGallery from './pages/Media/MediaGallery'
import Publications from './pages/Media/Publications'
import LalithaAudio from './pages/Media/LalithaAudio'
import Resources from './pages/Media/Resources'
import Terms from './pages/Legal/Terms'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import RefundPolicy from './pages/Legal/RefundPolicy'
import TaxInfo from './pages/Legal/TaxInfo'
import FAQ from './pages/Legal/FAQ'

import DashboardHome from './pages/dashboard/DashboardHome'
import MyProfile from './pages/dashboard/MyProfile'
import MyDonations from './pages/dashboard/MyDonations'
import MyPujaSeva from './pages/dashboard/MyPujaSeva'
import MyContributions from './pages/dashboard/MyContributions'
import Notifications from './pages/dashboard/Notifications'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import MemberManagement from './pages/admin/MemberManagement'
import PujaSevaManagement from './pages/admin/PujaSevaManagement'
import StoreManagement from './pages/admin/StoreManagement'
import DonationsManagement from './pages/admin/DonationsManagement'
import EventManagement from './pages/admin/EventManagement'
import VolunteerManagement from './pages/admin/VolunteerManagement'
import ContentModeration from './pages/admin/ContentModeration'
import NotificationsManagement from './pages/admin/NotificationsManagement'

import ReportsAnalytics from './pages/superadmin/ReportsAnalytics'
import UserRoleControl from './pages/superadmin/UserRoleControl'

function SiteRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/who-is-samrajya-lakshmi" element={<WhoIsSamrajyaLakshmi />} />
          <Route path="/about/temple" element={<AboutTemple />} />
          <Route path="/about/trustees" element={<Trustees />} />
          <Route path="/about/maha-samsthanam" element={<MahaSamsthanam />} />
          <Route path="/darshan/live" element={<TempleConstructionLive />} />
          <Route path="/puja-seva/book" element={<BookPuja />} />
          <Route path="/puja-seva/rituals" element={<SpecialRituals />} />
          <Route path="/puja-seva/prasadam" element={<Prasadam />} />
          <Route path="/events/calendar" element={<TempleCalendar />} />
          <Route path="/events/register" element={<RegisterTickets />} />
          <Route path="/store" element={<Store />} />
          <Route path="/e-hundi" element={<EHundi />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community/volunteer" element={<Volunteer />} />
          <Route path="/community/testimonials" element={<Testimonials />} />
          <Route path="/media/gallery" element={<MediaGallery />} />
          <Route path="/media/publications" element={<Publications />} />
          <Route path="/media/lalitha-audio" element={<LalithaAudio />} />
          <Route path="/media/resources" element={<Resources />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal/refund" element={<RefundPolicy />} />
          <Route path="/legal/80g-12a" element={<TaxInfo />} />
          <Route path="/legal/faq" element={<FAQ />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="donations" element={<MyDonations />} />
            <Route path="puja-seva" element={<MyPujaSeva />} />
            <Route path="contributions" element={<MyContributions />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<MemberManagement />} />
        <Route path="puja-seva" element={<PujaSevaManagement />} />
        <Route path="store" element={<StoreManagement />} />
        <Route path="donations" element={<DonationsManagement />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="volunteers" element={<VolunteerManagement />} />
        <Route path="content" element={<ContentModeration />} />
        <Route path="notifications" element={<NotificationsManagement />} />
      </Route>
      <Route path="/super-admin" element={<ProtectedSuperAdminRoute><SuperAdminLayout /></ProtectedSuperAdminRoute>}>
        <Route index element={<ReportsAnalytics />} />
        <Route path="users" element={<UserRoleControl />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  const location = useLocation()
  const isAdminArea = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin')

  return isAdminArea ? <AdminRoutes /> : <SiteRoutes />
}
