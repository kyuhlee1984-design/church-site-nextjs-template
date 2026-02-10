"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>{lang === "en" ? "Westside Presbyterian Church" : "서부장로교회"}</h4>
                        <p>
                            {lang === "en"
                                ? "A welcoming Korean-Canadian Presbyterian community"
                                : "환영하는 한인-캐나다 장로교회 공동체"}
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>{lang === "en" ? "Contact" : "연락처"}</h4>
                        <p>
                            3637 Grand Park Dr.
                            <br />
                            Mississauga, ON L5B 4L6
                        </p>
                        <p>
                            Phone: (905) 803-8800
                            <br />
                            Email: office@westsidepc.ca
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>{lang === "en" ? "Service Times" : "예배 시간"}</h4>
                        <p>{lang === "en" ? "Sundays" : "주일"}</p>
                        <p>10:00 AM & 12:30 PM</p>
                    </div>

                    <div className="footer-section">
                        <h4>{lang === "en" ? "Connect" : "소셜 미디어"}</h4>
                        <p>
                            <a href="https://www.westsidepc.ca" target="_blank" rel="noopener noreferrer">
                                Website
                            </a>
                            <br />
                            <a href="https://www.youtube.com/@westsidepc" target="_blank" rel="noopener noreferrer">
                                YouTube
                            </a>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        {lang === "en"
                            ? "© 2026 Westside Presbyterian Church. All rights reserved."
                            : "© 2026 서부장로교회. 모든 권리 보유."}
                    </p>
                </div>
            </div>
        </footer>
    );
}
