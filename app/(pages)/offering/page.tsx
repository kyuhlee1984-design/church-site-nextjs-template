"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Give() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Online Giving", ko: "온라인 헌금 안내" },
            subtitle: {
                en: "Generosity changes lives and builds God's kingdom",
                ko: "너그러움은 삶을 변화시키고 하나님의 나라를 세웁니다",
            },
        },
        heading: {
            title: { en: "E-transfer is available for your offering", ko: "E-transfer 를 통해 헌금이 가능합니다." },
            description: {
                en: "Please download and use your bank's app on your smartphone.",
                ko: "스마트폰에서 사용 은행의 어플을 다운로드 받으셔서 이용하세요.",
            },
        },
        etransfer: {
            title: "Interac e-Transfer",
            emailLabel: "Recipient(Name) & e-mail :",
            email: "offering@westsidepc.net",
            messageLabel: { en: "Message: English Name/Offering Number/Offering Type", ko: "Message: 영문이름/헌금번호/헌금종류" },
            exampleLabel: "Ex) Peter Jang/123/T",
            typesTitle: { en: "Types:", ko: "구분:" },
            types: { en: "Tithe-T / Thanksgiving-TH / Mission-M / Weekly-G / Building-B", ko: "십일조-T / 감사-TH / 선교-M / 주정-G / 건축-B" }
        }
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-give.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper" style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <div className="text-center mb-2xl">
                        <h2 className="mb-md" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: "bold" }}>
                            {t.heading.title[lang]}
                        </h2>
                        <p className="section-subtitle" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: "500", color: "var(--color-text-secondary)" }}>
                            {t.heading.description[lang]}
                        </p>
                    </div>

                    <div className="card scroll-fade" style={{ borderTop: "4px solid #c17a5f", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", padding: "var(--space-2xl)" }}>
                        <div className="card-content">
                            <h3 style={{ color: "#c17a5f", fontSize: "1.8rem", marginBottom: "var(--space-lg)", fontWeight: "bold", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
                                {t.etransfer.title}
                            </h3>
                            
                            <div style={{ marginBottom: "var(--space-xl)" }}>
                                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "8px" }}>
                                    {t.etransfer.emailLabel}
                                </div>
                                <a href={`mailto:${t.etransfer.email}`} style={{ fontSize: "1.4rem", fontWeight: "bold", color: "var(--color-accent)", textDecoration: "underline" }}>
                                    {t.etransfer.email}
                                </a>
                            </div>

                            <div style={{ background: "var(--color-bg-secondary)", padding: "24px", borderRadius: "12px", marginBottom: "var(--space-xl)" }}>
                                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "12px" }}>
                                    {t.etransfer.messageLabel[lang]}
                                </div>
                                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--color-text-secondary)" }}>
                                    {t.etransfer.exampleLabel}
                                </div>
                            </div>

                            <div style={{ fontSize: "1.1rem", fontWeight: "bold", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                                <span>{t.etransfer.typesTitle[lang]}</span>
                                <span style={{ color: "var(--color-text-secondary)" }}>
                                    {t.etransfer.types[lang]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
