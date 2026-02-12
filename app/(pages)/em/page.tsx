"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function EM() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "English Ministry (EM)", ko: "영어권 예배 (EM)" },
            subtitle: { en: "A vibrant community for English-speaking believers", ko: "영어권 신자들을 위한 활기찬 공동체" },
        },
        about: {
            title: { en: "About EM", ko: "EM 소개" },
            content: {
                en: "Our English Ministry (EM) is a thriving community for English-speaking members of all ages. We provide worship services, Bible studies, and fellowship opportunities designed to help you grow in your faith and build meaningful relationships.",
                ko: "영어권 예배(EM)는 모든 연령대의 영어권 교인들을 위한 활기찬 공동체입니다. 신앙 성장과 의미 있는 관계 형성을 돕기 위해 예배, 성경 공부, 그리고 친교의 기회를 제공합니다.",
            },
        },
        pastor: {
            title: { en: "EM Pastor", ko: "EM 담당 목사" },
            name: { en: "Rev. Steven Yoon", ko: "윤상훈 목사" },
            subtitle: { en: "Associate Pastor - EM", ko: "부목사 - EM 담당" },
            bio: {
                en: "Pastor Steven Yoon has been serving our English Ministry with passion and dedication. He is committed to helping young people and English-speaking members discover their purpose in Christ and grow in their faith journey.",
                ko: "윤상훈 목사님은 열정과 헌신으로 영어권 예배를 섬기고 계십니다. 청년들과 영어권 교인들이 그리스도 안에서 자신의 목적을 발견하고 신앙의 여정에서 성장하도록 돕는 데 헌신하고 있습니다.",
            },
            email: "Forstepssonyoon@gmail.com",
        },
        serviceTimes: {
            title: { en: "Service Times", ko: "예배 시간" },
            services: [
                {
                    day: { en: "Sunday", ko: "주일" },
                    time: "11:00 AM",
                    name: { en: "EM Worship Service", ko: "영어권 예배" },
                    location: { en: "Fellowship Hall", ko: "친교실" },
                },
            ],
        },
        programs: {
            title: { en: "Programs & Activities", ko: "프로그램 및 활동" },
            items: [
                {
                    title: { en: "Sunday Worship", ko: "주일 예배" },
                    description: {
                        en: "Contemporary worship service with relevant biblical teachings for young adults and English speakers.",
                        ko: "청년과 영어권을 위한 현대적인 예배와 성경적 가르침을 제공합니다.",
                    },
                },
                {
                    title: { en: "Small Groups", ko: "소그룹" },
                    description: {
                        en: "Connect with others through Bible studies and fellowship in small group settings.",
                        ko: "소그룹에서 성경 공부와 교제를 통해 다른 사람들과 연결됩니다.",
                    },
                },
                {
                    title: { en: "Youth Ministry", ko: "청소년 사역" },
                    description: {
                        en: "Engaging programs for teens to grow in faith and build lasting friendships.",
                        ko: "청소년들이 신앙 안에서 성장하고 지속적인 우정을 쌓을 수 있는 프로그램입니다.",
                    },
                },
                {
                    title: { en: "Outreach & Service", ko: "전도 및 봉사" },
                    description: {
                        en: "Opportunities to serve the community and share God's love through action.",
                        ko: "지역사회를 섬기고 행동으로 하나님의 사랑을 나누는 기회를 제공합니다.",
                    },
                },
            ],
        },
        cta: {
            title: { en: "Join Us", ko: "함께하세요" },
            description: {
                en: "Whether you're new to faith or have been walking with Christ for years, you'll find a welcoming community at EM. Come as you are!",
                ko: "신앙이 처음이든 오랫동안 그리스도와 함께 걸어온 분이든, EM에서 환영하는 공동체를 찾을 수 있습니다. 있는 그대로 오세요!",
            },
            button: { en: "Contact Us", ko: "문의하기" },
        },
    };

    return (
        <>
            <section className="hero-banner" style={{ backgroundImage: "url('/images/hero-em.jpg')" }}>
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            {/* About EM Section */}
            <section className="container">
                <h2 className="section-title">{t.about.title[lang]}</h2>
                <div className="content-wrapper">
                    <p className="text-lg" style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "var(--line-height-relaxed)" }}>
                        {t.about.content[lang]}
                    </p>
                </div>
            </section>

            {/* Pastor Section */}
            <section className="container" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                <div className="content-wrapper">
                    <div className="card scroll-fade">
                        <div className="card-content">
                            <h3 className="card-title">{t.pastor.name[lang]}</h3>
                            <div className="card-meta">{t.pastor.subtitle[lang]}</div>
                            <p className="card-description">{t.pastor.bio[lang]}</p>
                            <div className="card-footer">
                                <a href={`mailto:${t.pastor.email}`} className="btn btn-secondary">
                                    {t.pastor.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Times */}
            <section className="container">
                <h2 className="section-title">{t.serviceTimes.title[lang]}</h2>
                <div className="card-grid card-grid-1">
                    {t.serviceTimes.services.map((service, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", marginBottom: "var(--space-md)" }}>
                                    <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-accent)" }}>
                                        {service.time}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: "var(--font-weight-semibold)" }}>
                                            {service.name[lang]}
                                        </div>
                                        <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-light)" }}>
                                            {service.day[lang]} • {service.location[lang]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Programs */}
            <section className="container">
                <h2 className="section-title">{t.programs.title[lang]}</h2>
                <div className="card-grid card-grid-2">
                    {t.programs.items.map((program, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <h3 className="card-title">{program.title[lang]}</h3>
                                <p className="card-description">{program.description[lang]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                <div className="content-wrapper" style={{ textAlign: "center" }}>
                    <h2 className="section-title">{t.cta.title[lang]}</h2>
                    <p className="text-lg" style={{ maxWidth: "600px", margin: "0 auto var(--space-2xl)" }}>
                        {t.cta.description[lang]}
                    </p>
                    <Link href="/about#staff" className="btn btn-primary btn-lg">
                        {t.cta.button[lang]}
                    </Link>
                </div>
            </section>
        </>
    );
}
