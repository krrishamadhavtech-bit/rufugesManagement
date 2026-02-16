import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Login from "../screens/Auth/Login/Login"
import Signup from "../screens/Auth/signup/signup"
import Welcome from "../screens/OnBoarding/Welcome/Welcome"
import LanguageSelector from "../screens/OnBoarding/LanguageSelector/LanguageSelector"
import Manual from "../screens/OnBoarding/Manual/Manual"
import Finish from "../screens/OnBoarding/Finish/Finish"
import ForgotPassword from "../screens/Auth/ForgetPassword/ForgotPassword"
import Home from "../screens/Home/Home"
import ContentList from "../screens/Home/Content"
import SearchScreen from "../screens/Home/Searchscreen"
import Category from "../screens/Home/CategoryDetail/category"
import NewsCorner from "../screens/Home/NewsCorner/NewsCorner"
import ReadMore from "../screens/Home/NewsCorner/ReadMore/ReadMore"
import UpcomingEvents from "../screens/Home/UpcommingEvents/UpcommingEvents"

// Admin Screens
import AdminDashboard from "../screens/Admin/Dashboard/Dashboard"
import AdminContentManagement from "../screens/Admin/ContentManagement/ContentManagement"
import AdminCategoryManagement from "../screens/Admin/CategoryManagement/ContentManagement"
import ContentEditor from "../screens/Admin/ContentEditor/ContentEditor"

const ProtectedRoute = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (user?.role === 'admin') {
        return children;
    }

    if (user?.onboardingCompleted && location.pathname.startsWith("/onboarding")) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

const AdminRoute = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth);

    if (!token || user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

const PublicRoute = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth);
    if (token) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return user?.onboardingCompleted ?
            <Navigate to="/home" replace /> :
            <Navigate to="/onboarding/welcome" replace />;
    }
    return children;
};

const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderFooterPaths = ["/", "/signup", "/forgot-password"];
    const isOnboarding = location.pathname.startsWith("/onboarding");
    const isAdmin = location.pathname.startsWith("/admin");
    const shouldHide = hideHeaderFooterPaths.includes(location.pathname) || isOnboarding || isAdmin;

    return (
        <>
            {!shouldHide && <Header />}
            {children}
            {!shouldHide && <Footer />}
        </>
    );
};

function Navigation() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

                    {/* Protected Onboarding Routes */}
                    <Route path="/onboarding/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
                    <Route path="/onboarding/language" element={<ProtectedRoute><LanguageSelector /></ProtectedRoute>} />
                    <Route path="/onboarding/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />
                    <Route path="/onboarding/finish" element={<ProtectedRoute><Finish /></ProtectedRoute>} />

                    {/* Protected App Routes */}
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/Category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
                    <Route path="/content-list" element={<ProtectedRoute><ContentList /></ProtectedRoute>} />
                    <Route path="/search" element={<ProtectedRoute><SearchScreen /></ProtectedRoute>} />

                    {/* ✅ SIMPLE NAVIGATION - No IDs */}
                    <Route path="/news-corner" element={<ProtectedRoute><NewsCorner /></ProtectedRoute>} />
                    <Route path="/news-corner/ReadMore" element={<ProtectedRoute><ReadMore /></ProtectedRoute>} />
                    <Route path="/upcoming-events" element={<ProtectedRoute><UpcomingEvents /></ProtectedRoute>} />
                    <Route path="/news-corner/upcoming-events" element={<ProtectedRoute><UpcomingEvents /></ProtectedRoute>} />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/content" element={<AdminRoute><AdminContentManagement /></AdminRoute>} />
                    <Route path="/admin/categories" element={<AdminRoute><AdminCategoryManagement /></AdminRoute>} />
                    <Route path="/admin/ContentEditor" element={<AdminRoute><ContentEditor /></AdminRoute>} />

                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default Navigation