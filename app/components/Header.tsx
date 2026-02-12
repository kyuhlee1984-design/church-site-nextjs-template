"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/about", en: "About", ko: "교회안내" },
    { href: "/ministries", en: "Ministries", ko: "사역" },
    { href: "/em", en: "EM", ko: "EM" },
    { href: "/events", en: "Events", ko: "행사" },
    { href: "/sermons", en: "Sermons", ko: "설교" },
    { href: "/live", en: "Live", ko: "생방송" },
    { href: "/give", en: "Give", ko: "헌금" },
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link href="/" className="site-logo">
          <Image
            src="/images/church-logo.svg"
            alt="Westside Presbyterian Church"
            width={180}
            height={60}
            className="logo-image"
            priority
          />
        </Link>

        <nav className={`main-nav ${mobileMenuOpen ? "active" : ""}`} id="mainNav">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {lang === "en" ? item.en : item.ko}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
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
        </div>

        <button
          className="mobile-menu-toggle"
          id="mobileMenuToggle"
          aria-label="Toggle mobile menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mega Menu Component */}
      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      <style jsx>{`
                .site-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: var(--shadow-sm);
                    height: var(--header-height);
                }

                .header-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;
                    gap: var(--space-md);
                }

                .site-logo {
                    font-family: var(--font-family-heading);
                    font-size: var(--font-size-2xl);
                    font-weight: var(--font-weight-bold);
                    color: var(--color-text-primary);
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                .logo-image {
                    height: auto;
                    max-height: 50px;
                    width: auto;
                    object-fit: contain;
                }

                .main-nav {
                    flex: 1;
                    max-width: 800px;
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
                }

                .nav-link:hover,
                .nav-link.active {
                    color: var(--color-accent);
                }

                .nav-link::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: var(--color-accent);
                    transition: width var(--transition-base);
                }

                .nav-link:hover::after,
                .nav-link.active::after {
                    width: 100%;
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    flex-shrink: 0;
                }

                .mega-menu-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    padding: var(--space-sm) var(--space-md);
                    background: none;
                    border: 1px solid var(--color-tertiary);
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
                }

                .lang-toggle {
                    display: flex;
                    gap: var(--space-sm);
                }

                .lang-toggle button {
                    padding: var(--space-sm) var(--space-md);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    font-weight: var(--font-weight-medium);
                    color: var(--color-text-secondary);
                    transition: all var(--transition-base);
                }

                .lang-toggle button.active {
                    background-color: var(--color-accent);
                    color: white;
                }

                .mobile-menu-toggle {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    padding: var(--space-sm);
                }

                .mobile-menu-toggle span {
                    width: 24px;
                    height: 2px;
                    background-color: var(--color-text-primary);
                    transition: all var(--transition-fast);
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
                        background-color: white;
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
                        display: none;
                    }

                    .mobile-menu-toggle {
                        display: flex;
                    }

                    .lang-toggle {
                        position: absolute;
                        top: var(--space-md);
                        right: var(--space-md);
                    }
                }
            `}</style>
    </header>
  );
}
