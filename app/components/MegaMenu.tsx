"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import "./MegaMenu.css";

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    const { lang } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);

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
                { href: "/next-gen", label: { en: "Next Generation", ko: "다음세대" } },
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
                { href: "/sermons", label: { en: "Sermons", ko: "말씀" } },
                { href: "/live", label: { en: "Live Stream", ko: "생방송" } },
                { href: "/community", label: { en: "Community", ko: "서부광장" } },
            ],
        },
        {
            title: { en: "Get Involved", ko: "참여하기" },
            links: [
                { href: "/offering", label: { en: "Online Giving", ko: "온라인헌금" } },
                { href: "/about#staff", label: { en: "Contact Us", ko: "문의하기" } },
            ],
        },
    ];

    const quickLinks = [
        {
            href: "/",
            label: { en: "Home", ko: "홈" },
            icon: (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M3 10L10 3L17 10M4 9V16C4 16.5523 4.44772 17 5 17H8V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V17H15C15.5523 17 16 16.5523 16 16V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            href: "/live",
            label: { en: "Live", ko: "생방송" },
            icon: (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="3" fill="currentColor" />
                    <path
                        d="M10 5V2M10 18V15M15 10H18M2 10H5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ),
        },
        {
            href: "/offering",
            label: { en: "Online Giving", ko: "온라인헌금" },
            icon: (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: "/sermons",
            label: { en: "Sermons", ko: "말씀" },
            icon: (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M4 3H16C16.5523 3 17 3.44772 17 4V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: "/community?tab=bulletin",
            label: { en: "Bulletin", ko: "주보" },
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Overlay - click to close */}
            <div
                className={`mega-menu-overlay ${isOpen ? "active" : ""}`}
                onClick={onClose}
            />

            {/* Mega Menu Panel - drops down from header */}
            <div
                ref={menuRef}
                className={`mega-menu-panel ${isOpen ? "active" : ""}`}
            >
                <div className="mega-menu-inner">
                    {/* Quick Links Row */}
                    <div className="mega-menu-quick-row">
                        <span className="quick-label">QUICK LINKS</span>
                        <div className="quick-links-row">
                            {quickLinks.map((link, i) => (
                                <Link key={i} href={link.href} onClick={onClose} className="quick-link-item">
                                    {link.icon}
                                    <span>{link.label[lang]}</span>
                                </Link>
                            ))}
                        </div>
                        <button className="mega-menu-close" onClick={onClose} aria-label="Close menu">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M18 6L6 18M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Category Grid */}
                    <div className="mega-menu-grid">
                        {menuSections.map((section, index) => (
                            <div key={index} className="mega-menu-column">
                                <h3 className="mega-menu-category">{section.title[lang]}</h3>
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
                </div>
            </div>
        </>
    );
}
