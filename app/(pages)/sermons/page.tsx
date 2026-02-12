"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Sermons() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Sermons", ko: "설교" },
            subtitle: { en: "Listen to messages that inspire and challenge", ko: "영감을 주고 도전하는 메시지를 들으세요" },
        },
        searchPlaceholder: { en: "Search sermons...", ko: "설교 검색..." },
        sermons: [
            {
                date: { en: "February 2, 2026", ko: "2026년 2월 2일" },
                speaker: { en: "Pastor John Kim", ko: "김요한 목사" },
                title: { en: "Walking in Faith", ko: "믿음으로 걷기" },
                description: {
                    en: "Exploring what it means to trust God in every season of life.",
                    ko: "삶의 모든 계절에 하나님을 신뢰한다는 것의 의미를 탐구합니다.",
                },
            },
            {
                date: { en: "January 26, 2026", ko: "2026년 1월 26일" },
                speaker: { en: "Pastor Sarah Lee", ko: "이사라 목사" },
                title: { en: "The Power of Prayer", ko: "기도의 능력" },
                description: {
                    en: "Discovering how prayer transforms our lives and deepens our relationship with God.",
                    ko: "기도가 우리 삶을 변화시키고 하나님과의 관계를 깊게 하는 방법을 발견합니다.",
                },
            },
            {
                date: { en: "January 19, 2026", ko: "2026년 1월 19일" },
                speaker: { en: "Pastor John Kim", ko: "김요한 목사" },
                title: { en: "Living with Purpose", ko: "목적을 가지고 살기" },
                description: {
                    en: "Understanding God's unique calling and purpose for each of our lives.",
                    ko: "우리 각자의 삶에 대한 하나님의 고유한 부르심과 목적을 이해합니다.",
                },
            },
            {
                date: { en: "January 12, 2026", ko: "2026년 1월 12일" },
                speaker: { en: "Pastor John Kim", ko: "김요한 목사" },
                title: { en: "God's Unfailing Love", ko: "하나님의 변함없는 사랑" },
                description: {
                    en: "A journey through the depths of God's unconditional love for His children.",
                    ko: "자녀를 향한 하나님의 무조건적인 사랑의 깊이를 여행합니다.",
                },
            },
            {
                date: { en: "January 5, 2026", ko: "2026년 1월 5일" },
                speaker: { en: "Pastor Sarah Lee", ko: "이사라 목사" },
                title: { en: "New Year, New Beginnings", ko: "새해, 새로운 시작" },
                description: {
                    en: "Embracing fresh starts and God's promises for the year ahead.",
                    ko: "새로운 시작과 앞으로의 해를 위한 하나님의 약속을 받아들입니다.",
                },
            },
            {
                date: { en: "December 29, 2025", ko: "2025년 12월 29일" },
                speaker: { en: "Pastor John Kim", ko: "김요한 목사" },
                title: { en: "Reflecting on God's Faithfulness", ko: "하나님의 신실하심을 되돌아보며" },
                description: {
                    en: "Looking back at God's provision and guidance throughout the past year.",
                    ko: "지난 한 해 동안 하나님의 공급하심과 인도하심을 되돌아봅니다.",
                },
            },
        ],
        watch: { en: "Watch", ko: "보기" },
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-sermons.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper mb-2xl">
                    <input
                        type="text"
                        id="sermonSearch"
                        placeholder={t.searchPlaceholder[lang]}
                        style={{
                            width: "100%",
                            padding: "var(--space-md)",
                            border: "1px solid var(--color-tertiary)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "var(--font-size-base)",
                        }}
                    />
                </div>

                <div className="card-grid card-grid-3" id="sermonGrid">
                    {t.sermons.map((sermon, index) => (
                        <div key={index} className="card scroll-fade sermon-card">
                            <div className="card-content">
                                <div className="card-meta">
                                    {sermon.date[lang]} • {sermon.speaker[lang]}
                                </div>
                                <h3 className="card-title">{sermon.title[lang]}</h3>
                                <p className="card-description">{sermon.description[lang]}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
                                        {t.watch[lang]}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
