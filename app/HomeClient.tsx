/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";
import { Sermon, Banner, LiveStream } from "./lib/notion";
import VideoModal from "./components/VideoModal";

export default function HomeClient({ recentSermons, liveStream }: { recentSermons: Sermon[]; liveStream: LiveStream | null }) {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Welcome to", ko: "환영합니다" },
            church: { en: "Westside Presbyterian Church", ko: "서부장로교회" },
            subtitle: { en: "A community of faith, hope, and love", ko: "믿음, 소망, 사랑의 공동체" },
        },
        sermons: {
            title: { en: "Recent Sermons", ko: "최근 설교" },
            viewAll: { en: "View All", ko: "전체보기" },
        },
        serviceTime: {
            title: { en: "Service Times", ko: "예배 안내" },
            services: [
                {
                    category: { en: "Sunday Worship", ko: "주일예배" },
                    items: [
                        { time: { en: "10:00 AM", ko: "오전 10:00" }, name: { en: "1st Service (Korean)", ko: "1부 예배 (한국어)" } },
                        { time: { en: "11:00 AM", ko: "오전 11:00" }, name: { en: "English Ministry (EM)", ko: "영어권 (EM)" } },
                        { time: { en: "12:30 PM", ko: "오후 12:30" }, name: { en: "2nd Service (Korean)", ko: "2부 예배 (한국어)" } },
                        { time: { en: "2:40 PM", ko: "오후 2:40" }, name: { en: "Youth Service", ko: "청년부 예배" } },
                    ],
                },
                {
                    category: { en: "Church School", ko: "교회학교" },
                    items: [
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Infant & Toddler", ko: "영유아부" } },
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Kindergarten", ko: "유치부" } },
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Elementary", ko: "유초등부" } },
                        { time: { en: "11:40 AM", ko: "오전 11:40" }, name: { en: "Middle & High School", ko: "중고등부" } },
                    ],
                },
                {
                    category: { en: "Weekday Services", ko: "주중예배" },
                    items: [
                        { time: { en: "6:00 AM", ko: "오전 6:00" }, name: { en: "365 Dawn Prayer", ko: "365일 새벽기도회" } },
                        { time: { en: "7:30 PM", ko: "오후 7:30" }, name: { en: "Wednesday Service", ko: "수요예배" } },
                        { time: { en: "7:30 PM", ko: "오후 7:30" }, name: { en: "Friday Spirit Prayer", ko: "금요성령기도회" } },
                    ],
                },
            ],
        },
        location: {
            title: { en: "Contact Us", ko: "오시는 길" },
            address: {
                en: "3637 Grand Park Dr, Mississauga, ON L5B 4L6",
                ko: "3637 Grand Park Dr, Mississauga, ON L5B 4L6",
            },
            phone: "(905) 803-8800",
            email: "westside3637@gmail.com",
            directions: {
                en: "First-time visitors, please turn on your hazard lights when entering the parking lot, and our volunteers will guide you.",
                ko: "처음 오시는 분은 비상등을 켜고 들어오시면 안내해드립니다.",
            },
        },
    };

    const heroSlides = [
        {
            imageUrl: '/images/welcome_to_westside_0.jpg',
            title: { en: "Welcome to Westside Presbyterian Church", ko: "서부장로교회에 오신 것을 환영합니다" },
            description: { en: "", ko: "" },
            link: { en: "/about", ko: "/about" },
            linkText: { en: "Learn More", ko: "자세히 보기" },
        },
        {
            imageUrl: '/images/welcome_to_westside_1.png',
            title: { en: "Worship with Us", ko: "함께 예배합시다" },
            description: { en: "", ko: "" },
            link: { en: "/community", ko: "/community" },
            linkText: { en: "View Details", ko: "자세히 보기" },
        },
        {
            imageUrl: '/images/welcome_to_westside_2.png',
            title: { en: "Join Our Community", ko: "공동체에 참여하세요" },
            description: { en: "", ko: "" },
            link: { en: "/community", ko: "/community" },
            linkText: { en: "View Details", ko: "자세히 보기" },
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string>("");
    
    // Default effect state
    const [transitionStyle, setTransitionStyle] = useState({
        clipPath: 'inset(0 100% 0 0)',
        transform: 'scale(1)',
        filter: 'blur(0px)'
    });

    const totalSlides = heroSlides.length;

    const effects = [
        { clipPath: 'circle(0% at 50% 50%)', transform: 'scale(1.1)', filter: 'blur(5px)' }, // Iris reveal
        { clipPath: 'inset(0 100% 0 0)', transform: 'scale(1)', filter: 'blur(0px)' }, // Wipe from left
        { clipPath: 'inset(0 0 0 100%)', transform: 'scale(1)', filter: 'blur(0px)' }, // Wipe from right
        { clipPath: 'inset(0 0 100% 0)', transform: 'scale(1)', filter: 'blur(0px)' }, // Wipe from top
        { clipPath: 'inset(100% 0 0 0)', transform: 'scale(1)', filter: 'blur(0px)' }, // Wipe from bottom
        { clipPath: 'inset(0 0 0 0)', transform: 'scale(1.2)', filter: 'blur(15px)' } // Cinematic blur
    ];

    const pickRandomEffect = () => {
        setTransitionStyle(effects[Math.floor(Math.random() * effects.length)]);
    };

    useEffect(() => {
        if (totalSlides <= 1) return;
        const interval = setInterval(() => {
            pickRandomEffect();
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 8000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToSlide = (index: number) => {
        pickRandomEffect();
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        pickRandomEffect();
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNextSlide = () => {
        pickRandomEffect();
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    return (
        <>
            {/* Hero Section Carousel */}
            <section style={{ paddingTop: 0, paddingBottom: 'var(--section-padding-y)' }}>
                <div className="container">
                    <div className="news-carousel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                        <div className="carousel-container">
                            {heroSlides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                                    style={{ 
                                        position: index === currentSlide ? 'relative' : 'absolute', 
                                        opacity: index === currentSlide ? 1 : 0, 
                                        clipPath: index === currentSlide ? 'circle(150% at 50% 50%)' : transitionStyle.clipPath,
                                        transform: index === currentSlide ? 'scale(1)' : transitionStyle.transform,
                                        filter: index === currentSlide ? 'blur(0px)' : transitionStyle.filter,
                                        transition: 'all 1.5s ease-in-out', 
                                        width: '100%', 
                                        height: '100%' 
                                    }}
                                >
                                    {/* Static Image Background */}
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title[lang]}
                                        className="carousel-image skeleton-loading"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: index === 0 ? 'contain' : 'cover',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Previous Button */}
                        <button
                            className="carousel-nav carousel-prev"
                            onClick={goToPrevSlide}
                            aria-label="Previous slide"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button
                            className="carousel-nav carousel-next"
                            onClick={goToNextSlide}
                            aria-label="Next slide"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Carousel Indicators */}
                        <div className="carousel-indicators">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentSlide ? "active" : ""}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Stream Section */}
            {/* Live Stream Section */}
            {liveStream && (
                <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
                    <div className="live-stream-card scroll-fade">
                        {/* Left Side: Content */}
                        <div style={{ backgroundColor: '#0B1B2D', padding: 'clamp(32px, 5vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                            <span style={{ color: '#E88B2D', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '1px' }}>ONLINE SERVICE</span>
                            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 'bold', marginBottom: '24px', fontFamily: 'var(--font-family-cute)', color: 'white' }}>
                                {lang === 'en' ? 'Westside Live Stream' : '서부장로교회 예배 실황'}
                            </h2>
                            <p style={{ marginBottom: '32px', color: 'rgba(255, 255, 255, 0.9)' }}>
                                {lang === 'en' ? 'Our Sunday services are broadcast live on YouTube.' : '공예배는 유튜브 채널을 통해 방송됩니다.'}
                            </p>
                            
                            <div style={{ marginBottom: '40px', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '4px' }}>{lang === 'en' ? 'Sunday Worship:' : '주일예배:'} {lang === 'en' ? '1st (10:00 AM) / 2nd (12:30 PM)' : '1부 (오전 10시) / 2부 (오후 12시 30분)'}</p>
                                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '4px' }}>{lang === 'en' ? 'English (EM):' : '영어권 (EM):'} {lang === 'en' ? 'Sunday (11:00 AM)' : '주일 (오전 11시)'}</p>
                                <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>{lang === 'en' ? 'Youth Service: Sunday (2:40 PM)' : '청년부 예배: 주일 (오후 2시 40분)'}</p>
                            </div>
                            
                            <Link href="/live" className="btn" style={{ alignSelf: 'flex-start', backgroundColor: 'white', color: '#0B1B2D', padding: '12px 24px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                {lang === 'en' ? 'Watch in Live' : '예배 실황 바로가기'}
                            </Link>
                        </div>
                        
                        {/* Right Side: Image */}
                        <div className="image-pane" style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#2a2a2a' }}>
                            <Image 
                                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop" 
                                alt="Worship Service" 
                                fill 
                                style={{ objectFit: 'cover' }} 
                            />
                        </div>
                    </div>
                </section>
            )}
            {/* Quick Links Section (Replaces Recent Sermons Grid) */}
            <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
                <style>{`
                    .home-sketch-layout { display: flex; gap: 16px; }
                    .home-sketch-left { display: flex; flex-direction: column; gap: 16px; flex: 1.8; }
                    .home-sketch-right { display: flex; flex-direction: column; gap: 16px; flex: 1; }
                    .home-sketch-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                    .home-sketch-card { 
                        background-color: #0A1E3F; color: white; border-radius: 12px; 
                        display: flex; flex-direction: column; align-items: center; justify-content: center; 
                        text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; 
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 30px 20px; text-align: center;
                    }
                    .home-sketch-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
                    .home-sketch-right-card { flex: 1; min-height: 180px; }
                    
                    @media (max-width: 768px) {
                        .home-sketch-layout { flex-direction: column; }
                        /* On mobile, make the right column items sit side-by-side. 
                           row-reverse makes the second item (묵상) appear on the left, matching the sketch. */
                        .home-sketch-right { flex-direction: row-reverse; }
                        .home-sketch-card { padding: 20px 10px; } /* Slightly smaller padding on mobile */
                    }
                `}</style>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="home-sketch-layout">
                        {/* Left Column */}
                        <div className="home-sketch-left">
                            {/* Top Row: 주보, 행사 */}
                            <div className="home-sketch-row">
                                <Link href="/community?tab=bulletin" className="home-sketch-card">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.9 }}>
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                    </svg>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Bulletin' : '주보'}</span>
                                </Link>
                                
                                <Link href="/community?tab=events" className="home-sketch-card">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.9 }}>
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Events' : '행사'}</span>
                                </Link>
                            </div>

                            {/* Middle Row: 설교 (Sermons) */}
                            {recentSermons.length > 0 && (
                                <div onClick={() => { 
                                    const latest = recentSermons[0];
                                    if (latest.youtubeUrl) { 
                                        setVideoUrl(latest.youtubeUrl); 
                                        setVideoTitle(latest.title); 
                                    } 
                                }} style={{ 
                                    display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '12px', 
                                    cursor: 'pointer', minHeight: '300px', flex: 1,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'; }}>
                                    {(() => {
                                        const latest = recentSermons[0];
                                        const getYoutubeId = (url: string) => {
                                            if (!url) return null;
                                            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
                                            const match = url.match(regExp);
                                            return (match && match[2].length === 11) ? match[2] : null;
                                        };
                                        const yid = getYoutubeId(latest.youtubeUrl);
                                        return (
                                            <>
                                                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#2a2a2a' }}>
                                                    <img src={yid ? `https://img.youtube.com/vi/${yid}/maxresdefault.jpg` : "/images/hero-sermons.jpg"} 
                                                        onError={(e) => { e.currentTarget.src = yid ? `https://img.youtube.com/vi/${yid}/hqdefault.jpg` : "/images/hero-sermons.jpg"; }}
                                                        alt="Sermons" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(20px, 5vw, 50px)' }}>
                                                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '8px', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Sunday Worship' : '주일예배'} ({latest.date})</span>
                                                    <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: 1.3, maxWidth: '65%' }}>{latest.title}</h2>
                                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', margin: 0 }}>{latest.speaker}</p>
                                                    
                                                    <div style={{ position: 'absolute', bottom: 'clamp(20px, 5vw, 40px)', left: 'clamp(20px, 5vw, 50px)', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#00A8E8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 20px rgba(0, 168, 232, 0.4)', fontWeight: 'bold', lineHeight: 1.2, fontSize: '1rem', transition: 'transform 0.3s' }} className="play-button-hover">
                                                        <span>{lang === 'en' ? 'Watch' : '바로'}</span>
                                                        <span>{lang === 'en' ? 'Now' : '보기'}</span>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            )}

                            {/* Bottom Row: 전체말씀, 시리즈말씀 */}
                            <div className="home-sketch-row">
                                <Link href="/sermons" className="home-sketch-card">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.9 }}>
                                        <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'View All' : '전체말씀'}</span>
                                </Link>
                                
                                <Link href="/sermons?tab=series" className="home-sketch-card">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.9 }}>
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Series' : '시리즈말씀'}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="home-sketch-right">
                            <Link href="/community?tab=gallery" className="home-sketch-card home-sketch-right-card">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.9 }}>
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Gallery' : '교회 앨범'}</span>
                            </Link>
                            
                            <Link href="/community?tab=devotionals" className="home-sketch-card home-sketch-right-card">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.9 }}>
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{lang === 'en' ? 'Devotionals' : '묵상'}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Times */}
            <section id="service-times" className="container">
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 40px)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-secondary)' }}>
                    <h2 className="section-title scroll-fade" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span style={{ fontWeight: 800 }}>{lang === 'en' ? t.serviceTime.title.en : t.serviceTime.title.ko}</span>
                        <span style={{ fontWeight: 400, color: 'var(--color-text-tertiary)', fontSize: '0.85em', letterSpacing: '0.02em', paddingLeft: '4px' }}>
                            | {lang === 'en' ? t.serviceTime.title.ko : t.serviceTime.title.en}
                        </span>
                    </h2>
                    <div className="section-bracket-top"></div>
                    <div className="card-grid card-grid-3" style={{ gap: 'var(--space-2xl)', marginBottom: 0 }}>
                        {t.serviceTime.services.map((service, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-lg)', borderBottom: '2px solid var(--color-accent)', paddingBottom: 'var(--space-sm)', display: 'inline-block' }}>{service.category[lang]}</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {service.items.map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 'var(--space-sm)' }}>
                                            <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{item.name[lang]}</span>
                                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9em' }}>{item.time[lang]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="section-bracket-bottom"></div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="container" style={{ textAlign: 'center' }}>
                <h2 className="section-title scroll-fade" style={{ justifyContent: 'center' }}>
                    <span style={{ fontWeight: 800 }}>{lang === 'en' ? t.location.title.en : t.location.title.ko}</span>
                    <span style={{ fontWeight: 400, color: 'var(--color-text-tertiary)', fontSize: '0.85em', letterSpacing: '0.02em', paddingLeft: '4px' }}>
                        | {lang === 'en' ? t.location.title.ko : t.location.title.en}
                    </span>
                </h2>
                <div className="section-bracket-top"></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xl)', maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-md)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)', width: '100%' }}>
                        <div>
                            <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Address' : '주소'}</h4>
                            <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{t.location.address[lang]}</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Phone' : '전화번호'}</h4>
                            <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                                <a href={`tel:${t.location.phone}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>{t.location.phone}</a>
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Email' : '이메일'}</h4>
                        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-lg)' }}>
                            <a href={`mailto:${t.location.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>{t.location.email}</a>
                        </p>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                            {t.location.directions[lang]}
                        </p>
                    </div>
                    
                    <div style={{ marginTop: 'var(--space-xs)' }}>
                        <a href="https://maps.google.com/?q=3637+Grand+Park+Dr,+Mississauga,+ON+L5B+4L6" target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'inline-block', backgroundColor: 'var(--color-accent)', color: 'white', padding: '12px 32px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', transition: 'background-color 0.2s' }}>
                            {lang === 'en' ? 'View on Google Maps' : '구글 지도로 보기'}
                        </a>
                    </div>
                </div>
                <div className="section-bracket-bottom"></div>
            </section>

            {/* Video Modal */}
            <VideoModal
                url={videoUrl}
                title={videoTitle}
                onClose={() => setVideoUrl(null)}
            />
        </>
    );
}
