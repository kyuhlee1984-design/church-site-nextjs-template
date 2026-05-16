"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";

export default function Home() {
    const { lang } = useLanguage();

    const t = {
        sermons: {
            title: { en: "Sunday Sermons", ko: "주일설교" },
        },
        serviceTime: {
            title: { en: "Service Times", ko: "예배시간" },
            services: [
                {
                    category: { en: "Sunday Worship", ko: "주일예배" },
                    items: [
                        { time: { en: "8:00 AM", ko: "오전 8:00" }, name: { en: "Steward Service", ko: "청지기 예배" } },
                        { time: { en: "9:40 AM", ko: "오전 9:40" }, name: { en: "1st Service", ko: "1부" } },
                        { time: { en: "11:40 AM", ko: "오전 11:40" }, name: { en: "2nd Service", ko: "2부" } },
                        { time: { en: "9:40 AM", ko: "오전 9:40" }, name: { en: "EM Service", ko: "EM 예배" } },
                        { time: { en: "2:40 PM", ko: "오후 2:40" }, name: { en: "Youth Service", ko: "청년예배" } },
                    ],
                },
                {
                    category: { en: "Church School", ko: "교회학교" },
                    items: [
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Infant & Toddler", ko: "영.유아부" } },
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Kindergarten", ko: "유치부" } },
                        { time: { en: "9:40 AM / 11:40 AM", ko: "오전 9:40 / 오전 11:40" }, name: { en: "Elementary", ko: "유.초등부" } },
                        { time: { en: "11:40 AM", ko: "오전 11:40" }, name: { en: "Middle & High School", ko: "중.고등부" } },
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
                ko: "처음 오시는 분은 비상등을 켜고 들어오시면 안내해 드립니다.",
            },
        },
    };

    const newsSlides = [
        {
            title: { en: "Welcome to Westside Presbyterian Church!", ko: "서부장로교회에 오신 것을 환영합니다!" },
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
            title: { en: "Youth Ministry Programs", ko: "청소년 사역 프로그램" },
            description: { en: "Middle School & High School ministries every week", ko: "주중 중고등부 사역 프로그램" },
            link: { en: "/ministries", ko: "/ministries" },
            linkText: { en: "Learn More", ko: "자세히 보기" },
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [newsSlides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    };

    return (
        <>
            {/* News Carousel */}
            <section className="news-carousel">
                <div className="carousel-container">
                    {newsSlides.map((slide, index) => (
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
                    {newsSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Sunday Sermons */}
            <section className="container">
                <h2 className="section-title">{t.sermons.title[lang]}</h2>
                <div className="card-grid card-grid-3">
                    {/* YouTube Live Card */}
                    <Link href="/sermons" className="card scroll-fade card-featured" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px', background: 'linear-gradient(135deg, #cc0000 0%, #ff4d4d 100%)', textDecoration: 'none' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" style={{ marginBottom: 'var(--space-md)' }}>
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        <h3 className="card-title" style={{ color: 'white', marginBottom: 'var(--space-sm)' }}>YOUTUBE LIVE</h3>
                        <p className="card-description" style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, flex: 'none' }}>
                            {lang === 'en' ? 'Watch our Sunday service live' : '주일 예배 실시간 방송'}
                        </p>
                    </Link>
                    
                    {/* Recent Sermons 1 to 5 */}
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-image" style={{ background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </div>
                            <div className="card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <h3 className="card-title" style={{ margin: 0 }}>{lang === 'en' ? 'Recent Sermon' : '최근순'}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Service Times */}
            <section id="service-times" className="container" style={{ padding: '0 clamp(16px, 4vw, 24px)' }}>
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'clamp(32px, 5vw, 64px) clamp(16px, 4vw, 32px)', borderRadius: 'var(--radius-xl)' }}>
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
        </>
    );
}
