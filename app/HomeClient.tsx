/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";
import { Sermon, Banner, LiveStream } from "./lib/notion";
import VideoModal from "./components/VideoModal";

export default function HomeClient({ recentSermons, banners, liveStream }: { recentSermons: Sermon[]; banners: Banner[]; liveStream: LiveStream | null }) {
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

    const newsSlides = [
        {
            title: { en: "Welcome to Westside Presbyterian Church!", ko: "서부장로교회에 오신 것을 환영합니다" },
            description: { en: "Join us every Sunday at 10:00 AM & 12:30 PM", ko: "매주 주일 오전 10:00 & 오후 12:30" },
            link: { en: "/about", ko: "/about" },
            linkText: { en: "Learn More", ko: "자세히 보기" },
        },
        {
            title: { en: "2026 New Year Service", ko: "2026 신년예배" },
            description: { en: "Join us for a special New Year worship service", ko: "특별 신년예배에 함께하세요" },
            link: { en: "/community", ko: "/community" },
            linkText: { en: "View Details", ko: "자세히 보기" },
        },
        {
            title: { en: "Weekly Prayer Meeting", ko: "주중 기도회" },
            description: { en: "Wednesday 7:30 PM - Join us for prayer and worship", ko: "수요일 저녁 7시 30분 - 기도와 찬양으로 함께해요" },
            link: { en: "/about#service-times", ko: "/about#service-times" },
            linkText: { en: "Service Times", ko: "예배시간" },
        },
        {
            title: { en: "Youth Ministry Programs", ko: "다음세대 사역 프로그램" },
            description: { en: "Middle School & High School ministries every week", ko: "주중 중고등부 사역 프로그램" },
            link: { en: "/ministries", ko: "/ministries" },
            linkText: { en: "Learn More", ko: "자세히 보기" },
        },
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

    const totalSlides = banners.length > 0 ? banners.length : newsSlides.length;

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
        }, 5000);
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
            {/* News / Banner Carousel */}
            <section style={{ padding: 'var(--section-padding-y) 0' }}>
                <div className="container">
                    <div className="news-carousel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                        <div className="carousel-container">
                            {banners.length > 0 ? (
                                /* Notion Image Banners */
                                banners.map((banner, index) => (
                                    <div
                                        key={banner.id}
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
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.title}
                                            className="carousel-image skeleton-loading"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                /* Fallback: Hardcoded slides */
                                newsSlides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-slide carousel-slide-${index + 1} ${index === currentSlide ? "active" : ""}`}
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
                                        <div className="carousel-background">
                                            <div className="carousel-pattern"></div>
                                        </div>
                                        <div className="carousel-content">
                                            <h2 className="carousel-title">{slide.title[lang]}</h2>
                                            <p className="carousel-description">{slide.description[lang]}</p>
                                            <Link href={slide.link[lang]} className="btn btn-primary">
                                                {slide.linkText[lang]}
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
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
            {/* Sunday Sermons Section */}
            <section className="container">
                <h2 className="section-title scroll-fade">
                    <span style={{ fontWeight: 800 }}>{lang === 'en' ? t.sermons.title.en : t.sermons.title.ko}</span>
                    <span style={{ fontWeight: 400, color: 'var(--color-text-tertiary)', fontSize: '0.85em', letterSpacing: '0.02em', paddingLeft: '4px' }}>
                        | {lang === 'en' ? t.sermons.title.ko : t.sermons.title.en}
                    </span>
                </h2>
                <div className="section-bracket-top"></div>
                
                <div className="card-grid card-grid-3 horizontal-scroll-mobile">
                    {/* Recent Sermons from Notion */}
                    {recentSermons.map((sermon) => {
                        // Extract YouTube ID for thumbnail
                        const getYoutubeId = (url: string) => {
                            if (!url) return null;
                            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
                            const match = url.match(regExp);
                            return (match && match[2].length === 11) ? match[2] : null;
                        };
                        const youtubeId = getYoutubeId(sermon.youtubeUrl);

                        return (
                            <div key={sermon.id} className="card scroll-fade sermon-card compact-card-mobile" style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }} onClick={() => { if (sermon.youtubeUrl) { setVideoUrl(sermon.youtubeUrl); setVideoTitle(sermon.title); } }}>
                                {/* Thumbnail Section */}
                                <div className="skeleton-loading" style={{ display: 'block', position: 'relative', aspectRatio: '16/9' }}>
                                    {youtubeId ? (
                                        <img 
                                            src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} 
                                            alt={sermon.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'var(--color-primary)' }} />
                                    )}
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content Section */}
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
                    })}
                </div>
                <div className="section-bracket-bottom"></div>
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
