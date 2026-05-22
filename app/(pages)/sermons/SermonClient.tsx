/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Sermon } from "../../lib/notion";
import VideoModal from "../../components/VideoModal";

const MONTH_NAMES_KO = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const MONTH_NAMES_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SermonClient({ initialSermons }: { initialSermons: Sermon[] }) {
    const { lang } = useLanguage();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");

    const t = {
        hero: {
            title: { en: "Sermons", ko: "말씀" },
            subtitle: { en: "Listen to messages that inspire and challenge", ko: "영감을 주고 도전하는 메시지를 들으세요" },
        },
        searchPlaceholder: { en: "Search by title, speaker, or keyword...", ko: "제목, 설교자, 키워드로 검색..." },
        sermonCount: { en: "sermons", ko: "편" },
        noResults: { en: "No sermons found.", ko: "검색 결과가 없습니다." },
        noSermons: { en: "No sermons available.", ko: "설교 데이터를 불러올 수 없습니다." },
        back: { en: "← Back", ko: "← 돌아가기" },
        searchResults: { en: "Search Results", ko: "검색 결과" },
    };

    // Group sermons by year and month
    const groupedData = useMemo(() => {
        const yearMap = new Map<number, Map<number, Sermon[]>>();
        const years: number[] = [];

        initialSermons.forEach(sermon => {
            if (!sermon.date) return;
            const d = new Date(sermon.date);
            const year = d.getFullYear();
            const month = d.getMonth();

            if (!yearMap.has(year)) {
                yearMap.set(year, new Map());
                years.push(year);
            }
            const monthMap = yearMap.get(year)!;
            if (!monthMap.has(month)) {
                monthMap.set(month, []);
            }
            monthMap.get(month)!.push(sermon);
        });

        years.sort((a, b) => b - a);
        return { yearMap, years };
    }, [initialSermons]);

    const [selectedYear, setSelectedYear] = useState<number | null>(
        groupedData.years.length > 0 ? groupedData.years[0] : null
    );
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Global search across all sermons
    const searchResults = useMemo(() => {
        if (!searchQuery) return null;
        const q = searchQuery.toLowerCase();
        return initialSermons.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.speaker.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
    }, [searchQuery, initialSermons]);

    // Get sermons for current month selection
    const currentSermons = useMemo(() => {
        if (selectedYear !== null && selectedMonth !== null) {
            return groupedData.yearMap.get(selectedYear)?.get(selectedMonth) || [];
        }
        return [];
    }, [selectedYear, selectedMonth, groupedData]);

    // Get months available for selected year
    const availableMonths = useMemo(() => {
        if (selectedYear === null) return [];
        const monthMap = groupedData.yearMap.get(selectedYear);
        if (!monthMap) return [];
        return Array.from(monthMap.keys()).sort((a, b) => b - a);
    }, [selectedYear, groupedData]);

    // Render sermon card
    const renderSermonCard = (sermon: Sermon) => {
        const youtubeId = getYoutubeId(sermon.youtubeUrl);
        return (
            <div
                key={sermon.id}
                className="card scroll-fade sermon-card compact-card-mobile"
                style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                onClick={() => { if (sermon.youtubeUrl) { setVideoUrl(sermon.youtubeUrl); setVideoTitle(sermon.title); } }}
            >
                <div style={{ display: 'block', position: 'relative', aspectRatio: '16/9', backgroundColor: '#e2e2e2' }}>
                    {youtubeId ? (
                        <img src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} alt={sermon.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--color-primary)' }} />
                    )}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                </div>
                <div className="card-content" style={{ padding: '16px' }}>
                    <div className="card-meta" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        {sermon.date} • {sermon.speaker}
                    </div>
                    <h3 className="card-title" style={{ fontSize: '1.1rem', margin: '0 0 8px 0', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {sermon.title}
                    </h3>
                    {sermon.description && (
                        <p className="card-description" style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {sermon.description}
                        </p>
                    )}
                </div>
            </div>
        );
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

            <section className="container" style={{ paddingTop: 'var(--space-3xl)' }}>
                {/* Search Bar - always visible at top */}
                <div style={{ maxWidth: '600px', margin: '0 auto var(--space-2xl) auto', position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder[lang]}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "14px 16px 14px 48px",
                                border: "1px solid var(--color-tertiary)",
                                borderRadius: "50px",
                                fontSize: "var(--font-size-base)",
                                background: "var(--color-bg-secondary)",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                                outline: "none",
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,111,165,0.15)'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-tertiary)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>
                </div>

                {/* If searching, show global search results */}
                {searchResults !== null ? (
                    <>
                        <h2 style={{ marginBottom: 'var(--space-xl)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
                            {t.searchResults[lang]}
                            <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginLeft: '12px', fontWeight: 400 }}>
                                {searchResults.length}{t.sermonCount[lang]}
                            </span>
                        </h2>
                        <div className="card-grid card-grid-3 gallery-grid-mobile" id="sermonGrid">
                            {searchResults.map(sermon => renderSermonCard(sermon))}
                            {searchResults.length === 0 && (
                                <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "var(--space-3xl)" }}>
                                    <p>{t.noResults[lang]}</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Year Selector */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {groupedData.years.map(year => {
                                const isActive = selectedYear === year;
                                return (
                                    <button
                                        key={year}
                                        onClick={() => { setSelectedYear(year); setSelectedMonth(null); }}
                                        style={{
                                            padding: '14px 36px',
                                            borderRadius: '50px',
                                            border: 'none',
                                            background: isActive
                                                ? 'linear-gradient(135deg, #2c3e50 0%, #4a6fa5 100%)'
                                                : 'var(--color-bg-secondary)',
                                            color: isActive ? 'white' : 'var(--color-text-primary)',
                                            fontSize: '1.1rem',
                                            fontWeight: isActive ? 700 : 500,
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            boxShadow: isActive
                                                ? '0 4px 15px rgba(44, 62, 80, 0.35)'
                                                : '0 1px 3px rgba(0,0,0,0.08)',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Month Grid or Sermon Cards */}
                        {selectedMonth === null ? (
                            <div className="gallery-grid-mobile" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: 'var(--space-xl)',
                                marginBottom: 'var(--space-2xl)',
                            }}>
                                {availableMonths.map(month => {
                                    const sermons = groupedData.yearMap.get(selectedYear!)?.get(month) || [];
                                    const count = sermons.length;
                                    const previewSermon = sermons[0];
                                    const previewId = previewSermon ? getYoutubeId(previewSermon.youtubeUrl) : null;

                                    return (
                                        <div
                                            key={month}
                                            onClick={() => setSelectedMonth(month)}
                                            className="card scroll-fade compact-card-mobile"
                                            style={{
                                                cursor: 'pointer',
                                                padding: 0,
                                                overflow: 'hidden',
                                                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                                borderRadius: 'var(--radius-lg)',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.14)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                                        >
                                            <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#e8e8e8', overflow: 'hidden' }}>
                                                {previewId ? (
                                                    <img src={`https://img.youtube.com/vi/${previewId}/mqdefault.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'opacity 0.3s' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2c3e50 0%, #4a6fa5 100%)' }} />
                                                )}
                                                <div style={{
                                                    position: 'absolute', inset: 0,
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 100%)',
                                                }}>
                                                    <span style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                                        {lang === 'ko' ? MONTH_NAMES_KO[month] : MONTH_NAMES_EN[month]}
                                                    </span>
                                                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 500 }}>
                                                        {count} {t.sermonCount[lang]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {availableMonths.length === 0 && (
                                    <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "var(--space-3xl)" }}>
                                        <p>{t.noSermons[lang]}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Back button + Title */}
                                <div style={{ marginBottom: 'var(--space-xl)' }}>
                                    <button
                                        onClick={() => setSelectedMonth(null)}
                                        style={{
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            color: 'var(--color-accent)', fontSize: '0.95rem', fontWeight: 600,
                                            padding: '8px 0', marginBottom: 'var(--space-md)',
                                        }}
                                    >
                                        {t.back[lang]}
                                    </button>
                                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 0 }}>
                                        {selectedYear}{lang === 'ko' ? '년 ' : ' '}{lang === 'ko' ? MONTH_NAMES_KO[selectedMonth] : MONTH_NAMES_EN[selectedMonth]}
                                        <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginLeft: '12px', fontWeight: 400 }}>
                                            {currentSermons.length}{t.sermonCount[lang]}
                                        </span>
                                    </h2>
                                </div>

                                <div className="card-grid card-grid-3 gallery-grid-mobile" id="sermonGrid">
                                    {currentSermons.map(sermon => renderSermonCard(sermon))}
                                    {currentSermons.length === 0 && (
                                        <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "var(--space-3xl)" }}>
                                            <p>{t.noSermons[lang]}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>

            <VideoModal url={videoUrl} title={videoTitle} onClose={() => setVideoUrl(null)} />
        </>
    );
}
