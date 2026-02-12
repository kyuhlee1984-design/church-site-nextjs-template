"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    const { lang } = useLanguage();

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const menuSections = [
        {
            title: { en: "About", ko: "교회안내" },
            links: [
                { href: "/about#vision", label: { en: "Church Vision", ko: "교회비전" } },
                { href: "/about#about", label: { en: "About Us", ko: "교회소개" } },
                { href: "/about#staff", label: { en: "Our Staff", ko: "섬기는 이들" } },
                { href: "/about#service-times", label: { en: "Service Times", ko: "예배시간" } },
                { href: "/about#location", label: { en: "Location", ko: "찾아오시는 길" } },
                { href: "/about#history", label: { en: "History", ko: "발자취" } },
            ],
        },
        {
            title: { en: "Ministries", ko: "사역" },
            links: [
                { href: "/ministries#promise-land", label: { en: "Promise Land", ko: "Promise Land" } },
                { href: "/ministries#kings-army", label: { en: "King's Army", ko: "King's Army" } },
                { href: "/ministries#second-chapter", label: { en: "Second Chapter", ko: "Second Chapter" } },
                { href: "/ministries#korean-school", label: { en: "Korean School", ko: "서부한국어학교" } },
                { href: "/ministries#enoch-university", label: { en: "Enoch University", ko: "캐나다 에녹대학" } },
            ],
        },
        {
            title: { en: "Worship & Connect", ko: "예배 및 교제" },
            links: [
                { href: "/em", label: { en: "English Ministry", ko: "영어권 예배" } },
                { href: "/sermons", label: { en: "Sermons", ko: "설교" } },
                { href: "/live", label: { en: "Live Stream", ko: "생방송" } },
                { href: "/events", label: { en: "Events", ko: "행사" } },
            ],
        },
        {
            title: { en: "Get Involved", ko: "참여하기" },
            links: [
                { href: "/give", label: { en: "Give", ko: "헌금" } },
                { href: "/about#staff", label: { en: "Contact Us", ko: "문의하기" } },
            ],
        },
    ];

    return (
        <>
            {/* Overlay */}
            <div className="mega-menu-overlay" onClick={onClose} />

            {/* Mega Menu Content */}
            <div className="mega-menu-content">
                <div className="mega-menu-header">
                    <h2>{lang === "en" ? "Full Menu" : "전체메뉴"}</h2>
                    <button className="mega-menu-close" onClick={onClose} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mega-menu-grid">
                    {menuSections.map((section, index) => (
                        <div key={index} className="mega-menu-section">
                            <h3 className="mega-menu-section-title">{section.title[lang]}</h3>
                            <ul className="mega-menu-links">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href} onClick={onClose}>
                                            {link.label[lang]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="mega-menu-footer">
                    <div className="quick-links">
                        <Link href="/" onClick={onClose} className="quick-link-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M3 10L10 3L17 10M4 9V16C4 16.5523 4.44772 17 5 17H8V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V17H15C15.5523 17 16 16.5523 16 16V9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {lang === "en" ? "Home" : "홈"}
                        </Link>
                        <Link href="/live" onClick={onClose} className="quick-link-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="3" fill="currentColor" />
                                <path
                                    d="M10 5V2M10 18V15M15 10H18M2 10H5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {lang === "en" ? "Live" : "생방송"}
                        </Link>
                        <Link href="/give" onClick={onClose} className="quick-link-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            {lang === "en" ? "Give" : "헌금"}
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .mega-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 9998;
                    animation: fadeIn 0.2s ease-out;
                }

                .mega-menu-content {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 100%;
                    max-width: 600px;
                    height: 100vh;
                    background-color: white;
                    z-index: 9999;
                    overflow-y: auto;
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                    animation: slideInRight 0.3s ease-out;
                    display: flex;
                    flex-direction: column;
                }

                .mega-menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-xl);
                    border-bottom: 1px solid var(--color-tertiary);
                    flex-shrink: 0;
                }

                .mega-menu-header h2 {
                    font-size: var(--font-size-2xl);
                    font-weight: var(--font-weight-bold);
                    color: var(--color-text-primary);
                    margin: 0;
                }

                .mega-menu-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    padding: var(--space-sm);
                    transition: color var(--transition-base);
                }

                .mega-menu-close:hover {
                    color: var(--color-accent);
                }

                .mega-menu-grid {
                    flex: 1;
                    padding: var(--space-xl);
                    display: grid;
                    gap: var(--space-2xl);
                }

                .mega-menu-section-title {
                    font-size: var(--font-size-lg);
                    font-weight: var(--font-weight-bold);
                    color: var(--color-accent);
                    margin-bottom: var(--space-md);
                    padding-bottom: var(--space-sm);
                    border-bottom: 2px solid var(--color-accent);
                }

                .mega-menu-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-sm);
                }

                .mega-menu-links li a {
                    display: block;
                    padding: var(--space-sm) var(--space-md);
                    color: var(--color-text-secondary);
                    font-weight: var(--font-weight-medium);
                    transition: all var(--transition-base);
                    border-radius: var(--radius-sm);
                }

                .mega-menu-links li a:hover {
                    background-color: var(--color-bg-secondary);
                    color: var(--color-accent);
                    transform: translateX(4px);
                }

                .mega-menu-footer {
                    padding: var(--space-xl);
                    border-top: 1px solid var(--color-tertiary);
                    background-color: var(--color-bg-secondary);
                    flex-shrink: 0;
                }

                .quick-links {
                    display: flex;
                    gap: var(--space-md);
                    justify-content: center;
                }

                .quick-link-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--space-xs);
                    padding: var(--space-md);
                    background-color: white;
                    border-radius: var(--radius-md);
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                    font-weight: var(--font-weight-semibold);
                    transition: all var(--transition-base);
                    flex: 1;
                    max-width: 120px;
                    box-shadow: var(--shadow-sm);
                }

                .quick-link-btn:hover {
                    background-color: var(--color-accent);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                @media (max-width: 768px) {
                    .mega-menu-content {
                        max-width: 100%;
                    }

                    .mega-menu-header,
                    .mega-menu-grid,
                    .mega-menu-footer {
                        padding: var(--space-lg);
                    }

                    .quick-links {
                        gap: var(--space-sm);
                    }

                    .quick-link-btn {
                        font-size: 0.75rem;
                        padding: var(--space-sm);
                    }
                }
            `}</style>
        </>
    );
}
