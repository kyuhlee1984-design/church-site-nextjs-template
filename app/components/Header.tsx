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
    { href: "/sermons", en: "Sermons", ko: "말씀" },
    { href: "/next-gen", en: "Next Gen", ko: "다음세대" },
    { href: "/em", en: "EM", ko: "EM" },
    { href: "/ministries", en: "Ministries", ko: "사역" },
    { href: "/events", en: "Community", ko: "서부광장" },
    { href: "/give", en: "Online Giving", ko: "온라인헌금" },
  ];

  return (
    <>
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="site-logo">
          <Image
            src="/images/church-logo-to-replace.png"
            alt="Westside Presbyterian Church"
            width={329}
            height={71}
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

      <style jsx>{`
                .site-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: rgba(255, 255, 255, 0.98);
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
                    padding: 0 clamp(1rem, 3vw, 2rem);
                    position: relative;
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
                    max-height: 44px;
                    width: auto;
                    object-fit: contain;
                }

                .main-nav {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
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
                    background: var(--color-primary);
                    border-radius: var(--radius-md);
                    padding: 2px;
                }

                .lang-toggle button {
                    padding: 5px 12px;
                    border-radius: calc(var(--radius-md) - 2px);
                    font-size: var(--font-size-xs);
                    font-weight: var(--font-weight-semibold);
                    color: var(--color-text-light);
                    transition: all var(--transition-base);
                    letter-spacing: 0.02em;
                }

                .lang-toggle button.active {
                    background-color: var(--color-accent);
                    color: white;
                    box-shadow: 0 1px 3px rgba(37, 99, 235, 0.3);
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
                        max-width: 140px;
                    }

                    .logo-image {
                        max-height: 38px;
                    }
                }
            `}</style>
    </header>

    {/* Mega Menu Component - placed outside header to avoid backdrop-filter containing block */}
    <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
    </>
  );
}
