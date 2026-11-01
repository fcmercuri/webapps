import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);

  const handleLogoClick = () => {
    setLogoSpin(true);
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
            src="/sainthetic-mark.svg"
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
        <button
          type="button"
          className="sainthetic-menu-toggle"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span aria-hidden="true" style={{ fontSize: 25, lineHeight: 1 }}>{mobileOpen ? "×" : "☰"}</span>
        </button>
        <div className="nav-right desktop-nav">
          <a href="#features">Product</a>
          <a href="#features">Use Cases</a>
          <a href="#pricing">Pricing</a>
          {/* NEW: FAQ link desktop */}
          <a href="/blog">Resources</a>
          
          <a href="/login">Log in</a>
          <a href="/register" className="cta">Get started →</a>
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
              <a href="#features" onClick={closeMobileMenu}>Product</a>
              <a href="#features" onClick={closeMobileMenu}>Use Cases</a>
              <a href="#pricing" onClick={closeMobileMenu}>Pricing</a>
              {/* NEW: FAQ link mobile */}
              <a href="/blog" onClick={closeMobileMenu}>Resources</a>
              
              <a href="/login" onClick={closeMobileMenu}>Log in</a>
              <a href="/register" className="cta" onClick={closeMobileMenu}>Get started →</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Responsive nav CSS */}
      <style>{`
        @media (max-width:800px) {
          nav.main-nav { position: relative; z-index: 11; }
          .desktop-nav { display: none !important; }
          nav.main-nav { position: relative; z-index: 1000; overflow: visible; }
          .mobile-dropdown {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            background: #ffffff;
            border: 1px solid #e9edf3;
            position: absolute;
            top: calc(100% + 8px); left: 0; right: 0;
            width: 100%;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 1001;
            padding: 10px;
            margin: 0;
            gap: 4px;
            box-sizing: border-box;
            border-radius: 16px;
            box-shadow: 0 18px 42px rgba(17,24,39,.14);
          }
          .mobile-dropdown.nav-right a, 
          .mobile-dropdown .mobile-nav-link,
          .mobile-dropdown .cta {
            margin: 2px 0;
            width: 100%;
            min-width: 0;
            min-height: 48px;
            box-sizing: border-box;
            text-align: left;
            white-space: normal;
            overflow-wrap: break-word;
            line-height: 1.35;
            font-size: 1rem;
            color: #111827;
            border: none;
            background: none;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.2s, color 0.2s;
            display: block;
            position: relative;
            overflow: visible;
          }
          .mobile-dropdown a:hover, 
          .mobile-dropdown .mobile-nav-link:hover,
          .mobile-dropdown a:focus {
            background: #fff7dc;
            color: #111827;
          }
          .mobile-dropdown .cta {
            background: #ffd945;
            color: #191919 !important;
            font-weight: 700;
            box-shadow: none;
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
