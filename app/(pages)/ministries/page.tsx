"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Ministries() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Ministries", ko: "사역" },
            subtitle: { en: "Find your place to connect, grow, and serve", ko: "연결하고, 성장하고, 섬길 곳을 찾으세요" },
        },
        ministries: [
            {
                title: { en: "Promise Land (Children)", ko: "Promise Land (유아·초등부)" },
                description: {
                    en: "Our children's ministry (Promise Land) provides a loving environment for infants through elementary students to learn about God's love through engaging activities, worship, and Bible stories.",
                    ko: "Promise Land는 유아부터 초등학생까지를 위한 사역으로, 재미있는 활동, 예배, 그리고 성경 이야기를 통해 하나님의 사랑을 배우는 사랑이 가득한 환경을 제공합니다.",
                },
            },
            {
                title: { en: "King's Army (Middle School)", ko: "King's Army (중학부)" },
                description: {
                    en: "King's Army is our middle school ministry where students develop strong faith foundations, build lasting friendships, and learn to serve God with courage and passion.",
                    ko: "King's Army는 중학생들을 위한 사역으로, 학생들이 견고한 믿음의 기초를 다지고, 지속적인 우정을 쌓으며, 용기와 열정으로 하나님을 섬기는 법을 배웁니다.",
                },
            },
            {
                title: { en: "Second Chapter (High School)", ko: "Second Chapter (고등부)" },
                description: {
                    en: "Second Chapter is our high school ministry empowering students to write their faith story with purpose, helping them navigate challenges and discover their identity in Christ.",
                    ko: "Second Chapter는 고등학생들을 위한 사역으로, 학생들이 목적을 가지고 자신의 믿음 이야기를 쓰도록 힘을 실어주며, 도전을 헤쳐나가고 그리스도 안에서 정체성을 발견하도록 돕습니다.",
                },
            },
            {
                title: { en: "English Ministry & Young Adults", ko: "영어부 및 청년부" },
                description: {
                    en: "Our English Ministry and Young Adult Community provide worship, fellowship, and discipleship opportunities for English-speaking members and young adults, building a vibrant community of faith.",
                    ko: "영어 공동체는 영어권 교인들과 청년들을 위한 예배, 친교, 그리고 제자 훈련의 기회를 제공하며, 활기찬 믿음의 공동체를 세워갑니다.",
                },
            },
        ],
        learnMore: { en: "Learn More", ko: "자세히 보기" },
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-ministries.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <div className="card-grid card-grid-2">
                    {t.ministries.map((ministry, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <h3 className="card-title">{ministry.title[lang]}</h3>
                                <p className="card-description">{ministry.description[lang]}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
                                        {t.learnMore[lang]}
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
