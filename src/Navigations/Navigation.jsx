import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../screens/Auth/Login/Login"
import Signup from "../screens/Auth/signup/signup"
import Welcome from "../screens/OnBoarding/Welcome/Welcome"
import LanguageSelector from "../screens/OnBoarding/LanguageSelector/LanguageSelector"
import Manual from "../screens/OnBoarding/Manual/Manual"
import Finish from "../screens/OnBoarding/Finish/Finish"
import ForgotPassword from "../screens/Auth/ForgetPassword/ForgotPassword"
import Home from "../screens/Home/Home"
import CategoryDetail from "../screens/Home/Catoegory"
import ContentList from "../screens/Home/Content"
import SearchScreen from "../screens/Home/Searchscreen"

function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/onboarding/welcome" element={<Welcome />} />
                <Route path="/onboarding/language" element={<LanguageSelector />} />
                <Route path="/onboarding/manual" element={<Manual />} />
                <Route path="/onboarding/finish" element={<Finish />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/category/:name" element={<CategoryDetail />} />
                <Route path="/content-list" element={<ContentList />} />
                <Route path="/search" element={<SearchScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation  
