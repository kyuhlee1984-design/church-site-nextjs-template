"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Give() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Give", ko: "헌금" },
            subtitle: {
                en: "Generosity changes lives and builds God&apos;s kingdom",
                ko: "너그러움은 삶을 변화시키고 하나님의 나라를 세웁니다",
            },
        },
        heading: {
            title: { en: "Your generosity makes a difference", ko: "여러분의 너그러움이 변화를 만듭니다" },
            description: {
                en: "Every gift helps us spread the Gospel, serve our community, and support missions around the world. Thank you for your faithful partnership in ministry!",
                ko: "모든 헌금은 복음을 전파하고, 지역 사회를 섬기며, 전 세계 선교를 지원하는 데 도움이 됩니다. 사역에 신실하게 동참해 주셔서 감사합니다!",
            },
        },
        giveNow: { en: "Give Now", ko: "지금 헌금하기" },
        givingOptions: [
            {
                title: { en: "Online Giving", ko: "온라인 헌금" },
                description: {
                    en: "Give securely online using your credit card, debit card, or bank account. Set up one-time or recurring donations.",
                    ko: "신용카드, 직불카드 또는 은행 계좌를 사용하여 안전하게 온라인으로 헌금하세요. 일회성 또는 정기 헌금을 설정할 수 있습니다.",
                },
            },
            {
                title: { en: "In-Person", ko: "현장 헌금" },
                description: {
                    en: "Offering boxes are available during each service. You can also drop off donations at the church office Monday-Friday, 9 AM - 5 PM.",
                    ko: "각 예배 시간마다 헌금함이 준비되어 있습니다. 월요일부터 금요일, 오전 9시부터 오후 5시까지 교회 사무실에서도 헌금하실 수 있습니다.",
                },
            },
            {
                title: { en: "By Mail", ko: "우편 헌금" },
                description: {
                    en: "Send checks payable to 'Grace Community Church' to: 123 Faith Avenue, Your City, ST 12345",
                    ko: "'은혜 공동체 교회' 앞으로 수표를 보내주세요: 123 Faith Avenue, Your City, ST 12345",
                },
            },
        ],
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
                <div className="content-wrapper">
                    <div className="text-center mb-2xl">
                        <h2 className="mb-lg">{t.heading.title[lang]}</h2>
                        <p className="section-subtitle">{t.heading.description[lang]}</p>
                        <Link href="#" className="btn btn-primary btn-large">
                            {t.giveNow[lang]}
                        </Link>
                    </div>

                    <div className="card-grid card-grid-3">
                        {t.givingOptions.map((option, index) => (
                            <div key={index} className="card scroll-fade">
                                <div className="card-content">
                                    <h3 className="card-title">{option.title[lang]}</h3>
                                    <p className="card-description">{option.description[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
