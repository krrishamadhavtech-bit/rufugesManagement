import useHeader from "./ViewModal";
import "./Header.css";

const Header = () => {
    const { scrolled, activeTab, settingsOpen, settingsRef, navItems, settingsItems, handleNavClick, handleSettingsItemClick, handleLogout, setSettingsOpen, setActiveTab, setScrolled, navigate, languageMenuOpen, setLanguageMenuOpen, handleLanguageChange } = useHeader();
    return (
        <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-content">
                <div className="logo" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
                    <span className="logo-dot">●</span>
                    <span className="logo-text">RAHA</span>
                </div>

                <nav className="main-nav">
                    {navItems.map((item) => {
                        const itemId = item.toLowerCase().replace(/\s+/g, '-');
                        const isActive = activeTab === itemId && item !== "Settings";
                        const isSettings = item === "Settings";

                        return (
                            <div
                                key={item}
                                className={`nav-item-wrapper ${isSettings ? 'settings-wrapper' : ''}`}
                                ref={isSettings ? settingsRef : null}
                            >
                                <a
                                    href={!isSettings ? `#${itemId}` : undefined}
                                    className={`nav-link ${isActive ? "active" : ""} ${isSettings ? 'settings-trigger' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item);
                                    }}
                                >
                                    {item}
                                    {isSettings && (
                                        <i className={`fas fa-chevron-down settings-arrow ${settingsOpen ? 'open' : ''}`}></i>
                                    )}
                                    {isActive && <span className="nav-active-dot"></span>}
                                </a>

                                {/* Settings Dropdown Menu */}
                                {isSettings && settingsOpen && (
                                    <div className="settings-dropdown">
                                        <div className="settings-dropdown-header">
                                            <i className="fas fa-cog"></i>
                                            <span>Settings</span>
                                        </div>
                                        <ul className="settings-menu">
                                            {settingsItems.map((setting, index) => (
                                                <li
                                                    key={index}
                                                    className={`settings-menu-item ${setting.label === "Language" ? "has-submenu" : ""}`}
                                                    onClick={(e) => {
                                                        if (setting.label === "Language") {
                                                            e.stopPropagation();
                                                            setLanguageMenuOpen(!languageMenuOpen);
                                                        } else {
                                                            handleSettingsItemClick(setting.action);
                                                        }
                                                    }}
                                                    onMouseEnter={() => setting.label === "Language" && setLanguageMenuOpen(true)}
                                                    onMouseLeave={() => setting.label === "Language" && setLanguageMenuOpen(false)}
                                                >
                                                    <div className="settings-item-icon">
                                                        <i className={`fas ${setting.icon}`}></i>
                                                    </div>
                                                    <div className="settings-item-content">
                                                        <span className="settings-item-label">{setting.label}</span>
                                                        {setting.description && (
                                                            <span className="settings-item-description">{setting.description}</span>
                                                        )}
                                                    </div>
                                                    {setting.label === "Language" && (
                                                        <>
                                                            <i className="fas fa-chevron-right submenu-arrow"></i>
                                                            {languageMenuOpen && (
                                                                <ul className="language-submenu">
                                                                    <li onClick={(e) => { e.stopPropagation(); handleLanguageChange('en'); }}>English</li>
                                                                    <li onClick={(e) => { e.stopPropagation(); handleLanguageChange('hi'); }}>Hindi</li>
                                                                    <li onClick={(e) => { e.stopPropagation(); handleLanguageChange('gu'); }}>Gujarati</li>
                                                                </ul>
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <button className="donate-header-btn" onClick={handleLogout}>
                    <i className="fa-solid fa-sign-out"></i>
                </button>
            </div >
        </header >
    );
};

export default Header;