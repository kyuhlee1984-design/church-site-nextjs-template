"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";

export default function Home() {
    const { lang } = useLanguage();

    const t = {
        mission: {
            title: {
                en: "Our Mission",
                ko: "우리의 사명",
            },
            items: [
                {
                    title: { en: "Love God", ko: "하나님 사랑" },
                    description: {
                        en: "We worship and glorify God through prayer, praise, and living according to His Word.",
                        ko: "우리는 기도, 찬양, 그리고 말씀에 따라 사는 삶을 통해 하나님을 예배하고 영광을 돌립니다.",
                    },
                },
                {
                    title: { en: "Love People", ko: "이웃 사랑" },
                    description: {
                        en: "We build authentic community and serve one another with compassion and grace.",
                        ko: "우리는 진정한 공동체를 세우고 서로를 긍휼과 은혜로 섬깁니다.",
                    },
                },
                {
                    title: { en: "Make Disciples", ko: "제자 양육" },
                    description: {
                        en: "We share the Gospel and help people grow in their faith journey with Christ.",
                        ko: "우리는 복음을 전하고 사람들이 그리스도와 함께하는 신앙 여정에서 성장하도록 돕습니다.",
                    },
                },
            ],
        },
        sermons: {
            title: { en: "Latest Sermons", ko: "최근 설교" },
            items: [
                {
                    date: { en: "February 2, 2026 • Pastor John Kim", ko: "2026년 2월 2일 • 김요한 목사" },
                    title: { en: "Walking in Faith", ko: "믿음으로 걷기" },
                    description: {
                        en: "Exploring what it means to trust God in every season of life.",
                        ko: "삶의 모든 계절에서 하나님을 신뢰한다는 것의 의미를 탐구합니다.",
                    },
                    cta: { en: "Watch Now", ko: "시청하기" },
                },
                {
                    date: { en: "January 26, 2026 • Pastor Sarah Lee", ko: "2026년 1월 26일 • 이사라 목사" },
                    title: { en: "The Power of Prayer", ko: "기도의 능력" },
                    description: {
                        en: "Discovering how prayer transforms our lives and deepens our relationship with God.",
                        ko: "기도가 어떻게 우리의 삶을 변화시키고 하나님과의 관계를 깊게 하는지 발견합니다.",
                    },
                    cta: { en: "Watch Now", ko: "시청하기" },
                },
                {
                    date: { en: "January 19, 2026 • Pastor John Kim", ko: "2026년 1월 19일 • 김요한 목사" },
                    title: { en: "Living with Purpose", ko: "목적 있는 삶" },
                    description: {
                        en: "Understanding God's unique calling and purpose for each of our lives.",
                        ko: "우리 각자의 삶에 대한 하나님의 독특한 부르심과 목적을 이해합니다.",
                    },
                    cta: { en: "Watch Now", ko: "시청하기" },
                },
            ],
        },
        events: {
            title: { en: "Upcoming Events", ko: "다가오는 행사" },
            items: [
                {
                    date: { en: "Friday, February 14 • 7:00 PM", ko: "2월 14일 금요일 • 오후 7시" },
                    title: { en: "Valentine's Couples Night", ko: "발렌타인 커플의 밤" },
                    description: {
                        en: "An evening of worship, fellowship, and celebration for married couples.",
                        ko: "부부를 위한 예배, 교제, 축하의 저녁.",
                    },
                    cta: { en: "Learn More", ko: "자세히 보기" },
                },
                {
                    date: { en: "Saturday, February 22 • 9:00 AM", ko: "2월 22일 토요일 • 오전 9시" },
                    title: { en: "Community Service Day", ko: "지역 봉사의 날" },
                    description: {
                        en: "Join us as we serve our local community through various outreach projects.",
                        ko: "다양한 봉사 프로젝트를 통해 우리 지역 사회를 섬기는 데 함께하세요.",
                    },
                    cta: { en: "Learn More", ko: "자세히 보기" },
                },
            ],
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

            {/* Mission Statement */}
            <section className="container">
                <h2 className="section-title">{t.mission.title[lang]}</h2>
                <div className="card-grid card-grid-3">
                    {t.mission.items.map((item, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <h3 className="card-title">{item.title[lang]}</h3>
                                <p className="card-description">{item.description[lang]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Sermons */}
            <section className="container">
                <h2 className="section-title">{t.sermons.title[lang]}</h2>
                <div className="card-grid card-grid-3">
                    {t.sermons.items.map((sermon, index) => (
                        <div key={index} className="card scroll-fade">
                            <Image
                                src={`/images/sermon-${index + 1}.jpg`}
                                alt="Sermon thumbnail"
                                width={400}
                                height={225}
                                className="card-image"
                                loading="lazy"
                            />
                            <div className="card-content">
                                <div className="card-meta">{sermon.date[lang]}</div>
                                <h3 className="card-title">{sermon.title[lang]}</h3>
                                <p className="card-description">{sermon.description[lang]}</p>
                                <div className="card-footer">
                                    <Link href="/sermons" className="btn btn-secondary">
                                        {sermon.cta[lang]}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="container">
                <h2 className="section-title">{t.events.title[lang]}</h2>
                <div className="card-grid card-grid-2">
                    {t.events.items.map((event, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <div className="card-meta">{event.date[lang]}</div>
                                <h3 className="card-title">{event.title[lang]}</h3>
                                <p className="card-description">{event.description[lang]}</p>
                                <div className="card-footer">
                                    <Link href="/events" className="btn btn-secondary">
                                        {event.cta[lang]}
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
