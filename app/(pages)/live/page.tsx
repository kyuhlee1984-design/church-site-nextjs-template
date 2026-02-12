"use client";

import { useLanguage } from "../../contexts/LanguageContext";

export default function Live() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Live Worship", ko: "실시간 예배" },
            subtitle: { en: "Join us online for live worship services", ko: "온라인으로 실시간 예배에 함께하세요" },
        },
        watchLive: { en: "Watch Live", ko: "실시간 시청" },
        streamOffline: {
            title: { en: "Stream Offline", ko: "방송 중이 아닙니다" },
            message: {
                en: "We&apos;re not currently streaming. Check back during service times!",
                ko: "현재 방송 중이 아닙니다. 예배 시간에 다시 확인해주세요!",
            },
        },
        serviceTimes: {
            title: { en: "Service Times", ko: "예배 시간" },
            subtitle: { en: "Sunday Worship Services:", ko: "주일 예배:" },
            first: { en: "First Service", ko: "1부 예배" },
            second: { en: "Second Service", ko: "2부 예배" },
            note: {
                en: "Can&apos;t make it in person? We live stream both services every Sunday!",
                ko: "직접 참석하기 어려우신가요? 매주 일요일 두 예배 모두 실시간 중계합니다!",
            },
        },
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-live.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper">
                    <div className="card-featured scroll-fade mb-2xl">
                        <h2 className="mb-lg">{t.watchLive[lang]}</h2>
                        <div className="video-container" id="liveStreamContainer">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    padding: "var(--space-2xl)",
                                    textAlign: "center",
                                    background: "rgba(255,255,255,0.1)",
                                }}
                            >
                                <div>
                                    <h3 style={{ color: "white", marginBottom: "var(--space-md)" }}>
                                        {t.streamOffline.title[lang]}
                                    </h3>
                                    <p style={{ color: "rgba(255,255,255,0.9)" }}>
                                        {t.streamOffline.message[lang]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card scroll-fade">
                        <div className="card-content">
                            <h3 className="card-title">{t.serviceTimes.title[lang]}</h3>
                            <p className="mb-md">{t.serviceTimes.subtitle[lang]}</p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                <li
                                    style={{
                                        padding: "var(--space-sm) 0",
                                        borderBottom: "1px solid var(--color-secondary)",
                                    }}
                                >
                                    <strong>{t.serviceTimes.first[lang]}</strong> • <span>10:00 AM</span>
                                </li>
                                <li style={{ padding: "var(--space-sm) 0" }}>
                                    <strong>{t.serviceTimes.second[lang]}</strong> • <span>12:30 PM</span>
                                </li>
                            </ul>
                            <p className="mt-lg text-light">{t.serviceTimes.note[lang]}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
