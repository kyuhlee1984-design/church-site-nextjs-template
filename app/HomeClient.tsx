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
            title: { en: "Contact", ko: "Contact" },
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
            link: { en: "/events", ko: "/events" },
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

    const totalSlides = banners.length > 0 ? banners.length : newsSlides.length;

    useEffect(() => {
        if (totalSlides <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNextSlide = () => {
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
                                        style={{ position: index === currentSlide ? 'relative' : 'absolute', opacity: index === currentSlide ? 1 : 0, transition: 'opacity 0.6s ease-in-out', width: '100%', height: '100%' }}
                                    >
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundColor: 'var(--color-secondary)',
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

            {/* Sunday Sermons Section */}
            <section className="container">
                <h2 className="section-title">{t.sermons.title[lang]}</h2>
                {liveStream && (
                <div style={{ marginBottom: 'var(--space-xl)' }}>
                    {/* YouTube Live Card - opens modal */}
                    <div onClick={() => { setVideoUrl(liveStream.youtubeUrl); setVideoTitle(liveStream.title); }} className="card scroll-fade card-featured" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 'clamp(200px, 30vh, 300px)', background: 'linear-gradient(135deg, #1c2833 0%, #2c3e50 50%, #4a6fa5 100%)', textDecoration: 'none', border: 'none', cursor: 'pointer' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" style={{ marginBottom: 'var(--space-md)' }}>
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        <h3 className="card-title" style={{ color: 'white', marginBottom: 'var(--space-sm)' }}>{liveStream.title}</h3>
                        <p className="card-description" style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, flex: 'none' }}>
                            {lang === 'en' ? 'Watch our Sunday service live' : '주일 예배 실시간 방송'}
                        </p>
                    </div>
                </div>
                )}
                
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
                            <div key={sermon.id} className="card scroll-fade sermon-card compact-card-mobile" style={{ overflow: 'hidden', padding: 0, minWidth: '240px', cursor: 'pointer' }} onClick={() => { if (sermon.youtubeUrl) { setVideoUrl(sermon.youtubeUrl); setVideoTitle(sermon.title); } }}>
                                {/* Thumbnail Section */}
                                <div style={{ display: 'block', position: 'relative', aspectRatio: '16/9', backgroundColor: '#e2e2e2' }}>
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
            </section>

            {/* Service Times */}
            <section id="service-times" className="container">
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 40px)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-secondary)' }}>
                    <h2 className="section-title" style={{ marginBottom: 'var(--space-2xl)' }}>{t.serviceTime.title[lang]}</h2>
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
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="container" style={{ textAlign: 'center' }}>
                <h2 className="section-title">{t.location.title[lang]}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)', maxWidth: '600px', margin: '0 auto' }}>
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Address' : '주소'}</h4>
                        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>{t.location.address[lang]}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Phone' : '전화번호'}</h4>
                        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>{t.location.phone}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'en' ? 'Email' : '이메일'}</h4>
                        <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                            <a href={`mailto:${t.location.email}`} style={{ color: 'var(--color-accent)' }}>{t.location.email}</a>
                        </p>
                    </div>
                </div>
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
