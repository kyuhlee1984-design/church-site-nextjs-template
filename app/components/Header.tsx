"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mega menu on resize (optional, but good practice)
  useEffect(() => {
      const handleResize = () => {
          // If resizing to desktop, you might want to keep it open or close it
          // We'll leave it as is, or you can add logic here if needed
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: "/about", en: "About", ko: "교회안내" },
    { href: "/sermons", en: "Sermons", ko: "말씀" },
    { href: "/next-gen", en: "Next Gen", ko: "다음세대" },
    { href: "/em", en: "EM", ko: "EM" },
    { href: "/ministries", en: "Ministries", ko: "사역" },
    { href: "/community", en: "Community", ko: "서부광장" },
    { href: "/offering", en: "Online Giving", ko: "온라인헌금" },
  ];

  return (
    <>
    <header className="site-header">
      <div className="header-container container">
        <Link href="/" className="site-logo" style={{ textDecoration: 'none' }}>
          <Image
            src="/images/church-logo_only-warmwhite-background.png"
            alt="Westside Presbyterian Church Logo"
            width={40}
            height={40}
            className="logo-image"
            priority
          />
          <div className="logo-text">
            <span className="logo-text-ko" style={{ fontFamily: "'Jua', sans-serif", display: lang === "en" ? "none" : "block" }}>캐나다장로교 서부장로교회</span>
            <span className="logo-text-en" style={{ display: lang === "ko" ? "none" : "block" }}>Westside Presbyterian</span>
          </div>
        </Link>

        <nav className="main-nav" id="mainNav">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  {lang === "en" ? item.en : item.ko}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="mega-menu-btn"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-label={lang === "en" ? "Full Menu" : "전체메뉴"}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{lang === "en" ? "Menu" : "전체메뉴"}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="header-actions">

          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === "ko" ? "active" : ""}`}
              onClick={() => setLang("ko")}
            >
              한국어
            </button>
          </div>

          <button
            className="mobile-menu-toggle"
            id="mobileMenuToggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <style jsx>{`
                .site-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: rgba(245, 241, 235, 0.95);
                    backdrop-filter: blur(12px);
                    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
                    height: var(--header-height);
                    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
                }

                .header-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;
                    width: 100%;
                    position: relative;
                }

                .site-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                }

                .logo-image {
                    height: auto;
                    max-height: 40px;
                    width: auto;
                    object-fit: contain;
                }

                .logo-text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .logo-text-ko {
                    font-family: 'Jua', sans-serif;
                    font-size: 1.1rem;
                    color: var(--color-text-primary);
                    font-weight: normal;
                    letter-spacing: -0.02em;
                    line-height: 1;
                }


                .logo-text-en {
                    font-family: var(--font-family-heading);
                    font-size: 1.05rem;
                    color: var(--color-primary);
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    line-height: 1;
                }

                .main-nav {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    padding: 0 var(--space-md);
                }

                .main-nav ul {
                    display: flex;
                    list-style: none;
                    gap: var(--space-lg);
                    align-items: center;
                    justify-content: center;
                }

                .nav-link {
                    font-weight: var(--font-weight-medium);
                    color: var(--color-text-secondary);
                    transition: color var(--transition-base);
                    position: relative;
                    padding: var(--space-sm) 0;
                    white-space: nowrap;
                    font-size: var(--font-size-sm);
                    letter-spacing: 0.01em;
                }

                .nav-link:hover,
                .nav-link.active {
                    color: var(--color-accent);
                }

                .nav-link::after {
                    content: "";
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: var(--color-accent);
                    transition: width var(--transition-base);
                    border-radius: 1px;
                }

                .nav-link:hover::after,
                .nav-link.active::after {
                    width: 100%;
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    flex-shrink: 0;
                }

                .mega-menu-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    padding: 6px 14px;
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-secondary);
                    border-radius: var(--radius-md);
                    color: var(--color-text-secondary);
                    font-weight: var(--font-weight-medium);
                    font-size: var(--font-size-sm);
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .mega-menu-btn:hover {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                    background: var(--color-bg-main);
                }

                .lang-toggle {
                    display: flex;
                    gap: 2px;
                    background: var(--color-bg-secondary);
                    border-radius: var(--radius-md);
                    padding: 2px;
                    border: 1px solid var(--color-border);
                }

                .lang-toggle button {
                    padding: 5px 12px;
                    border-radius: calc(var(--radius-md) - 2px);
                    font-size: var(--font-size-xs);
                    font-weight: var(--font-weight-semibold);
                    color: var(--color-text-secondary); /* Darker text for unselected */
                    transition: all var(--transition-base);
                    letter-spacing: 0.02em;
                }

                .lang-toggle button.active {
                    background-color: var(--color-accent); /* Use theme gold/sand accent */
                    color: white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .lang-toggle button:not(.active):hover {
                    color: var(--color-text-primary);
                }

                .mobile-menu-toggle {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    padding: var(--space-sm);
                }

                .mobile-menu-toggle span {
                    width: 22px;
                    height: 2px;
                    background-color: var(--color-text-primary);
                    transition: all var(--transition-fast);
                    border-radius: 1px;
                }

                @media (max-width: 1200px) {
                    .main-nav ul {
                        gap: var(--space-md);
                    }
                    
                    .nav-link {
                        font-size: 0.813rem;
                    }
                }

                @media (max-width: 1024px) {
                    .logo-image {
                        max-height: 32px;
                    }
                    .logo-text-ko {
                        font-size: 0.95rem;
                    }
                    .logo-text-en {
                        font-size: 0.9rem;
                    }
                    .main-nav ul {
                        gap: var(--space-sm); /* Shrink gaps between menus */
                    }
                    .nav-link {
                        font-size: 0.8rem; /* Shrink menu font */
                    }
                    .mega-menu-btn span {
                        display: none;
                    }
                }

                @media (max-width: 768px) {
                    .main-nav {
                        display: none;
                        position: absolute;
                        top: var(--header-height);
                        left: 0;
                        right: 0;
                        transform: none;
                        background-color: var(--color-primary);
                        box-shadow: var(--shadow-lg);
                        padding: var(--space-lg);
                        max-width: none;
                    }

                    .main-nav.active {
                        display: block;
                    }

                    .main-nav ul {
                        flex-direction: column;
                        gap: var(--space-md);
                        align-items: flex-start;
                    }

                    .nav-link {
                        font-size: var(--font-size-base);
                    }

                    .header-actions {
                        display: flex;
                        gap: var(--space-sm);
                    }

                    .mega-menu-btn {
                        display: none;
                    }

                    .mobile-menu-toggle {
                        display: flex;
                    }

                    .lang-toggle {
                        display: flex;
                    }

                    .site-logo {
                        gap: 8px;
                    }

                    .logo-image {
                        max-height: 28px;
                    }

                    .logo-text-ko {
                        font-size: 0.9rem;
                    }
                    
                    .logo-text-en {
                        font-family: var(--font-family-heading);
                        font-size: 0.9rem;
                    }
                }
            `}</style>
    </header>

    {/* Mega Menu Component - placed outside header to avoid backdrop-filter containing block */}
    <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
    </>
  );
}
