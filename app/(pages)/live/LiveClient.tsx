"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { LiveStream } from "../../lib/notion";

function getYoutubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    // Handle /live/ URLs
    const liveMatch = url.match(/youtube\.com\/live\/([^?&#]+)/);
    if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}?autoplay=1`;
    // Handle standard watch URLs
    const watchMatch = url.match(/[?&]v=([^&#]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
    // Handle youtu.be short URLs
    const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
    return null;
}

export default function LiveClient({ liveStream }: { liveStream: LiveStream | null }) {
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
                en: "We're not currently streaming. Check back during service times!",
                ko: "현재 방송 중이 아닙니다. 예배 시간에 다시 확인해주세요!",
            },
        },
        serviceTimes: {
            title: { en: "Service Times", ko: "예배 시간" },
            subtitle: { en: "Sunday Worship Services:", ko: "주일 예배:" },
            first: { en: "1st Service", ko: "1부 예배" },
            second: { en: "2nd Service", ko: "2부 예배" },
            firstTime: { en: "9:40 AM", ko: "오전 9:40" },
            secondTime: { en: "11:40 AM", ko: "오전 11:40" },
            note: {
                en: "Can't make it in person? We live stream both services every Sunday!",
                ko: "직접 참석하기 어려우신가요? 매주 일요일 두 예배 모두 실시간 중계합니다!",
            },
        },
    };

    const embedUrl = liveStream ? getYoutubeEmbedUrl(liveStream.youtubeUrl) : null;

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
                        <h2 className="mb-lg">{liveStream ? liveStream.title : t.watchLive[lang]}</h2>
                        <div className="video-container" id="liveStreamContainer">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    title={liveStream?.title || "Live Stream"}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                    }}
                                />
                            ) : (
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
                            )}
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
                                    <strong>{t.serviceTimes.first[lang]}</strong> • <span>{t.serviceTimes.firstTime[lang]}</span>
                                </li>
                                <li style={{ padding: "var(--space-sm) 0" }}>
                                    <strong>{t.serviceTimes.second[lang]}</strong> • <span>{t.serviceTimes.secondTime[lang]}</span>
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
