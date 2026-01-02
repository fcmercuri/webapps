import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);

  const handleLogoClick = () => {
    setLogoSpin(true);
    setMobileOpen((open) => !open);
    setTimeout(() => setLogoSpin(false), 600); // reset after spin
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="main-nav" style={{ position: "relative" }}>
        <div className="nav-left">
          <motion.img
            src="/logo.jpg"
            alt="sainthetic"
            className="nav-logo"
            animate={logoSpin ? { rotate: 360, scale: 1.13 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
          <span
            className="nav-brand"
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            sAInthetic
          </span>
        </div>
        <div className="nav-spacer"></div>
        <div className="nav-right desktop-nav">
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <Link to="/blog" className="nav-link">Blog</Link>
          <a href="/login">Sign In</a>
          <a href="/register" className="cta">Get Started</a>
        </div>
        {/* Mobile Dropdown - must be inside nav! */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="dropdown"
              className="mobile-dropdown nav-right"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.33 }}
            >
              <a href="#how-it-works" onClick={closeMobileMenu}>How It Works</a>
              <a href="#pricing" onClick={closeMobileMenu}>Pricing</a>
              <Link to="/blog" onClick={closeMobileMenu} className="mobile-nav-link">Blog</Link>
              <a href="/login" onClick={closeMobileMenu}>Sign In</a>
              <a href="/register" className="cta" onClick={closeMobileMenu}>Get Started</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Responsive nav CSS */}
      <style>{`
        @media (max-width:800px) {
          nav.main-nav { position: relative; z-index: 11; }
          .desktop-nav { display: none !important; }
          .mobile-dropdown {
            display: flex !important;
            flex-direction: column;
            align-items: stretch;
            background: #0B0B0B;
            border-bottom: 1px solid #232323;
            position: absolute;
            top: 100%; left: 0; right: 0;
            width: 100%;
            z-index: 1001;
            padding: 18px 12px 12px 12px;
            margin: 0;
            box-sizing: border-box;
          }
          .mobile-dropdown.nav-right a, 
          .mobile-dropdown .mobile-nav-link,
          .mobile-dropdown .cta {
            margin: 2px 0;
            width: 100%;
            text-align: center;
            font-size: 1.11rem;
            color: #fff;
            border: none;
            background: none;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.2s, color 0.2s;
            display: block;
            position: relative;
            overflow: hidden;
          }
          .mobile-dropdown a:hover, 
          .mobile-dropdown .mobile-nav-link:hover,
          .mobile-dropdown a:focus {
            background: #171717;
            color: #ffd945;
          }
          .mobile-dropdown .cta {
            background: #ffd945;
            color: #191919 !important;
            font-weight: 700;
            box-shadow: 0 6px 28px #ffd94540;
            padding: 0.8rem 2rem !important;
            text-align: center;
          }
          .mobile-dropdown a::after,
          .mobile-dropdown .mobile-nav-link::after {
            content: '';
            position: absolute;
            left: 0; bottom: 0;
            width: 100%;
            height: 2.5px;
            background: #ffd945;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.22s cubic-bezier(.52, .24, .14, 1.36);
          }
          .mobile-dropdown a:active::after,
          .mobile-dropdown a:focus::after,
          .mobile-dropdown a:hover::after,
          .mobile-dropdown .mobile-nav-link:active::after,
          .mobile-dropdown .mobile-nav-link:focus::after,
          .mobile-dropdown .mobile-nav-link:hover::after {
            transform: scaleX(1);
          }
        }
        @media (min-width:801px) {
          .mobile-dropdown { display: none !important; }
          .desktop-nav { display: flex !important; }
          .desktop-nav .nav-link {
            color: inherit;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s;
          }
          .desktop-nav .nav-link:hover {
            background: rgba(255,255,255,0.1);
            color: #ffd945;
          }
        }
      `}</style>
    </>
  );
}
