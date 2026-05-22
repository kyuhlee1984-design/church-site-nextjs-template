"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
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

                    <div className="footer-section" style={{ gridColumn: 'span 2' }}>
                        <h4>{lang === "en" ? "Service Times" : "예배 시간"}</h4>
                        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', lineHeight: '1.6' }}>
                            <div style={{ flex: '1 1 min-content' }}>
                                <p style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap' }}><strong>{lang === "en" ? "Sunday Worship" : "주일 예배"}</strong></p>
                                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9em', whiteSpace: 'nowrap' }}>{lang === "en" ? "1st Service:" : "1부:"} 10:00 AM</p>
                                <p style={{ margin: '0 0 12px 0', opacity: 0.8, fontSize: '0.9em', whiteSpace: 'nowrap' }}>{lang === "en" ? "2nd Service:" : "2부:"} 12:30 PM</p>
                            </div>
                            <div style={{ flex: '1 1 min-content' }}>
                                <p style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap' }}><strong>{lang === "en" ? "English (EM)" : "영어권 (EM)"}</strong></p>
                                <p style={{ margin: '0 0 12px 0', opacity: 0.8, fontSize: '0.9em', whiteSpace: 'nowrap' }}>{lang === "en" ? "Sundays:" : "주일:"} 11:00 AM</p>
                            </div>
                            <div style={{ flex: '1 1 min-content' }}>
                                <p style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap' }}><strong>{lang === "en" ? "Youth Service" : "청년부 예배"}</strong></p>
                                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9em', whiteSpace: 'nowrap' }}>{lang === "en" ? "Sundays:" : "주일:"} 2:40 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>{lang === "en" ? "Connect" : "소셜 미디어"}</h4>
                        <p>
                            <a href="https://www.youtube.com/@westsidepresbyterianchurch8383/featured" target="_blank" rel="noopener noreferrer">
                                YouTube
                            </a>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                    <p style={{ margin: 0 }}>
                        {lang === "en"
                            ? "© 2026 Westside Presbyterian Church. All rights reserved."
                            : "© 2026 서부장로교회. 모든 권리 보유."}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85em', opacity: 0.7 }}>
                        Designed & Implemented by kyuhlee1984@gmail.com
                    </p>
                </div>
            </div>
        </footer>
    );
}
