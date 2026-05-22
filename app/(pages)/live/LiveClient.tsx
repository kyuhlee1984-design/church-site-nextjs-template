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
            english: { en: "English (EM)", ko: "영어권 (EM)" },
            second: { en: "2nd Service", ko: "2부 예배" },
            firstTime: { en: "10:00 AM", ko: "오전 10:00" },
            englishTime: { en: "11:00 AM", ko: "오전 11:00" },
            secondTime: { en: "12:30 PM", ko: "오후 12:30" },
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
                style={{ backgroundImage: "url('/images/hero-live.png')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container" style={{ marginBottom: 'var(--space-4xl)', marginTop: 'var(--space-4xl)' }}>
                <div className="live-stream-card scroll-fade">
                    {/* Left Side: Content */}
                    <div style={{ backgroundColor: '#0B1B2D', padding: 'clamp(32px, 5vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                        <span style={{ color: '#E88B2D', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '1px' }}>ONLINE SERVICE</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 'bold', marginBottom: '24px', fontFamily: 'var(--font-family-cute)', color: 'white' }}>
                            {liveStream ? liveStream.title : (lang === 'en' ? 'Westside Live Stream' : '서부장로교회 예배 실황')}
                        </h2>
                        <p style={{ marginBottom: '32px', color: 'rgba(255, 255, 255, 0.9)' }}>
                            {lang === 'en' ? 'Our Sunday services are broadcast live on YouTube.' : '공예배는 유튜브 채널을 통해 방송됩니다.'}
                        </p>
                        
                        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                <strong>{t.serviceTimes.subtitle[lang]}</strong><br/>
                                {t.serviceTimes.first[lang]} ({t.serviceTimes.firstTime[lang]}) / {t.serviceTimes.english[lang]} ({t.serviceTimes.englishTime[lang]}) / {t.serviceTimes.second[lang]} ({t.serviceTimes.secondTime[lang]})
                            </p>
                            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: 'var(--space-sm)' }}>
                                <strong>{lang === 'en' ? 'Youth Service:' : '청년부 예배:'}</strong> {lang === 'en' ? 'Sunday (2:40 PM)' : '주일 (오후 2시 40분)'}
                            </p>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 'var(--space-md)', fontSize: '0.85rem' }}>
                                {t.serviceTimes.note[lang]}
                            </p>
                        </div>
                    </div>
                    
                    {/* Right Side: YouTube Video */}
                    <div className="image-pane" style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000' }}>
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={liveStream?.title || "Live Stream"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: "none" }}
                            />
                        ) : (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "var(--space-2xl)",
                                    textAlign: "center",
                                    background: "#111",
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
            </section>
        </>
    );
}
