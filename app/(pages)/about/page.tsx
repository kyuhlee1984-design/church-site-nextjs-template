"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function About() {
    const { lang } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const t = {
        hero: {
            title: { en: "Welcome to Westside Presbyterian", ko: "서부장로교회에 오신 것을 환영합니다!" },
            subtitle: { en: "We're glad you're here!", ko: "참! 잘 오셨습니다." },
        },
        vision: {
            title: { en: "Church Vision", ko: "교회 비전" },
            mission: {
                en: "To be a church that truly worships God and faithfully proclaims the Gospel of Jesus Christ.",
                ko: "하나님을 진정으로 예배하며 예수 그리스도의 복음을 충실히 선포하는 교회가 되는 것입니다.",
            },
            values: [
                {
                    title: { en: "Gospel-Centered", ko: "복음 중심" },
                    description: { en: "We proclaim the Gospel to make the church truly the church.", ko: "오직 복음을 선포하여 교회를 교회되게 합니다." },
                },
                {
                    title: { en: "Worship-Focused", ko: "예배 중심" },
                    description: { en: "We strive to make worship truly worship in spirit and truth.", ko: "예배를 예배되게 하여 신령과 진정으로 드립니다." },
                },
                {
                    title: { en: "Community Service", ko: "지역 사회 섬김" },
                    description: { en: "We serve our community with love as salt and light in the world.", ko: "온 세상에 빛과 소금이 되어 사랑으로 지역사회를 섬깁니다." },
                },
            ],
        },
        about: {
            title: { en: "About Us", ko: "교회 소개" },
            content: {
                en: "Westside Presbyterian Church is located in Mississauga, Ontario, Canada. Founded in 1987, our church has been faithfully serving the Korean-Canadian community for over 35 years. We are part of the Presbyterian Church in Canada, committed to biblical teaching, worship, and mission work.\n\nSince 1994, under the leadership of Senior Pastor Hunseung Park, we have been dedicated to preaching the Gospel, making the church truly the church, and making worship truly worship. We strive to be salt and light in the world, witnessing the Gospel and serving our community with love.",
                ko: "서부장로교회는 캐나다 온타리오주 미시사가에 위치하고 있으며, 1987년에 창립되었습니다. 35년이 넘는 기간 동안 한인 커뮤니티를 섬겨왔습니다. 본 교회는 캐나다장로교(Presbyterian Church in Canada)에 소속되어 있으며, 성경적 가르침과 예배, 그리고 선교에 힘쓰고 있습니다.\n\n1994년부터 담임목사 박헌승 목사님과 더불어, 오직 복음을 선포하여 교회를 교회되게 하고, 예배를 예배되게 하는 교회입니다. 그리고 온 세상에 빛과 소금이 되어 사랑으로 지역사회를 섬기며 복음을 증거하는 교회입니다.",
            },
        },
        history: {
            title: { en: "Our History", ko: "발자취" },
            timeline: [
                { year: "1987", event: { en: "Westside Presbyterian Church founded", ko: "서부장로교회 창립" } },
                { year: "1994", event: { en: "Rev. Hunseung Park begins serving as Senior Pastor", ko: "박헌승 목사님 담임목사로 부임" } },
                { year: "2000s", event: { en: "Expansion of ministry programs and community outreach", ko: "사역 프로그램 확장 및 지역 사회 봉사 활동 강화" } },
                { year: "2010s", event: { en: "Launch of English Ministry (EM) and youth programs", ko: "영어권 예배(EM) 및 청소년 프로그램 시작" } },
                { year: "Present", event: { en: "Continuing to serve the community with God's love", ko: "하나님의 사랑으로 지역사회를 계속 섬기고 있습니다" } },
            ],
        },
        pastor: {
            title: { en: "Senior Pastor", ko: "담임 목사" },
            name: { en: "Rev. Hunseung Park", ko: "박헌승 목사" },
            bio: {
                en: "Pastor Hunseung Park has been serving as the Senior Pastor of Westside Presbyterian Church since 1994. He is passionate about preaching the Word of God, shepherding the flock, and equipping believers for ministry. Under his leadership, the church has grown and faithfully served the community for over 30 years.",
                ko: "박헌승 목사님은 1994년부터 서부장로교회의 담임목사로 섬기고 계십니다. 하나님의 말씀을 전하고, 양떼를 목양하며, 성도들을 사역으로 준비시키는 일에 열정을 가지고 계십니다. 목사님의 지도 아래 교회는 30년 이상 성장하며 지역사회를 충실히 섬겨왔습니다.",
            },
        },
        staff: {
            title: { en: "Our Staff", ko: "섬기는 이들" },
            verse: {
                en: '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." (Colossians 3:23-24)',
                ko: '"무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라. 이는 기업의 상을 주께 받을 줄 아나니 너희는 주 그리스도를 섬기느니라." (골로새서 3장 23~24절)',
            },
            members: [
                // 목사
                {
                    name: { en: "Rev. Hunseung Park", ko: "박헌승 목사" },
                    role: { en: "Senior Pastor", ko: "담임목사" },
                    email: "kidschu@gmail.com"
                },
                {
                    name: { en: "Rev. Kwangil Lee", ko: "이광일 목사" },
                    role: { en: "Co-Senior Pastor", ko: "공동 담임목사" },
                    email: ""
                },
                // 부목사
                {
                    name: { en: "Rev. Steven Yoon (For Jesus Yoon)", ko: "윤상훈 목사" },
                    role: { en: "Associate Pastor - EM", ko: "부목사 - EM 담당" },
                    email: "Forstepssonyoon@gmail.com"
                },
                // 전도사
                {
                    name: { en: "Rev. Taeyoung Shin", ko: "신태양 전도사" },
                    role: { en: "Associate Pastor", ko: "전도사" },
                    email: "lytell114@gmail.com"
                },
                {
                    name: { en: "Minister Yerim Jeong", ko: "정예림 전도사" },
                    role: { en: "Children's Ministry", ko: "유아·초등부 담당" },
                    email: "svfaith1@hotmail.com"
                },
                {
                    name: { en: "Minister Sunwoo Lee", ko: "이선우 전도사" },
                    role: { en: "Middle School Ministry", ko: "중학부 담당" },
                    email: "yesunwoo@hotmail.net"
                },
                {
                    name: { en: "Minister Sunyoung Yoon", ko: "윤선영 전도사" },
                    role: { en: "Children's Ministry", ko: "유아·초등부 담당" },
                    email: "Surayun30@hotmail.com"
                },
                {
                    name: { en: "Minister Jeongrae Lee", ko: "이정례 전도사" },
                    role: { en: "Worship & Youth Ministry", ko: "공동예배와 시점부 담당" },
                    email: "jesuslove.lee0125@gmail.com"
                },
                {
                    name: { en: "Minister Jinsim Park", ko: "박진심 전도사" },
                    role: { en: "Education Ministry", ko: "교육 전도사" },
                    email: "jinleemy@gmail.com"
                },
            ],
            elders: {
                title: { en: "Elders", ko: "시무장로" },
                members: [
                    { name: { en: "Elder Wonchul Lee", ko: "이원철" } },
                    { name: { en: "Elder Duyong Jang", ko: "장두용" } },
                    { name: { en: "Elder Kinam Kim", ko: "김기남" } },
                    { name: { en: "Elder Dosun Kim", ko: "김도선" } },
                    { name: { en: "Elder Yujin Lee", ko: "이유진" } },
                    { name: { en: "Elder Kiwoong Jang", ko: "장기웅" } },
                    { name: { en: "Elder Wonsu Ko", ko: "고원수" } },
                    { name: { en: "Elder Cheolyoung Yoon", ko: "윤철영" } },
                    { name: { en: "Elder Byungoh Kim", ko: "김병오" } },
                ],
            },
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
                        { time: { en: "2:30 PM", ko: "오후 2:30" }, name: { en: "Youth Service", ko: "청년예배" } },
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
            title: { en: "Contact & Location", ko: "Contact" },
            address: {
                en: "3637 Grand Park Dr, Mississauga, ON L5B 4L6",
                ko: "3637 Grand Park Dr, Mississauga, ON L5B 4L6",
            },
            phone: "(905) 803-8800",
            email: "westside3637@gmail.com",
            directions: {
                en: "First-time visitors, please turn on your hazard lights when entering the parking lot, and our volunteers will guide you. We offer parking assistance for families with young children, expectant mothers, and seniors.",
                ko: "처음 오시는 분은 비상등을 켜고 들어오시면 안내해 드립니다. 새가족과 어린아이를 동반한 부모님, 임산부, 노약자를 위한 주차 안내를 제공합니다.",
            },
        },
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-banner" style={{ backgroundImage: "url('/images/hero-about.jpg')" }}>
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className="container">
                <div className="quick-nav">
                    <a href="#vision" className="quick-nav-item">
                        {lang === "en" ? "Vision" : "교회비전"}
                    </a>
                    <a href="#about" className="quick-nav-item">
                        {lang === "en" ? "About" : "교회소개"}
                    </a>
                    <a href="#staff" className="quick-nav-item">
                        {lang === "en" ? "Staff" : "섬기는 이들"}
                    </a>
                    <a href="#service-times" className="quick-nav-item">
                        {lang === "en" ? "Service Times" : "예배시간"}
                    </a>
                    <a href="#location" className="quick-nav-item">
                        {lang === "en" ? "Location" : "찾아오시는 길"}
                    </a>
                    <a href="#history" className="quick-nav-item">
                        {lang === "en" ? "History" : "발자취"}
                    </a>
                </div>
            </section>

            {/* Vision Section */}
            <section id="vision" className="container">
                <h2 className="section-title">{t.vision.title[lang]}</h2>
                <div className="content-wrapper">
                    <div className="card scroll-fade" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <div className="card-content">
                            <h3 className="card-title">{lang === "en" ? "Our Mission" : "우리의 사명"}</h3>
                            <p className="text-lg">{t.vision.mission[lang]}</p>
                        </div>
                    </div>
                    <div className="card-grid card-grid-3 horizontal-scroll-mobile">
                        {t.vision.values.map((value, index) => (
                            <div key={index} className="card scroll-fade">
                                <div className="card-content">
                                    <h3 className="card-title">{value.title[lang]}</h3>
                                    <p className="card-description">{value.description[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="container">
                <h2 className="section-title">{t.about.title[lang]}</h2>
                <div className="content-wrapper">
                    <div className="about-content">
                        {t.about.content[lang].split("\n\n").map((paragraph, index) => (
                            <p key={index} className="text-lg mb-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pastor Section */}
            <section className="container bg-light" style={{ marginBottom: 'var(--space-3xl)' }}>
                <div className="content-wrapper">
                    <div className="card scroll-fade">
                        <div className="card-content">
                            <h3 className="staff-name" style={{ marginBottom: 'var(--space-xs)' }}>{t.pastor.name[lang]}</h3>
                            <div className="card-meta">{t.pastor.title[lang]}</div>
                            <p className="card-description">{t.pastor.bio[lang]}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Staff Section */}
            <section id="staff" className="container">
                <h2 className="section-title">{t.staff.title[lang]}</h2>
                <p className="section-subtitle">{t.staff.verse[lang]}</p>

                <div className="card-grid card-grid-3 horizontal-scroll-mobile">
                    {t.staff.members.map((member, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* Profile Image Placeholder */}
                                <div style={{ 
                                    width: '120px', 
                                    height: '120px', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'var(--color-bg-secondary)', 
                                    margin: '0 auto var(--space-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '3px solid var(--color-tertiary)',
                                    flexShrink: 0
                                }}>
                                    {/* TODO: Replace with real images when available: <img src="/images/staff/name.jpg" alt="..." /> */}
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                
                                <h3 className="staff-name" style={{ marginBottom: 'var(--space-xs)' }}>{member.name[lang]}</h3>
                                <div className="card-meta" style={{ marginBottom: member.email ? 'var(--space-xs)' : '0' }}>{member.role[lang]}</div>
                                {member.email && (
                                    <div className="card-description" style={{ fontSize: '0.875rem', marginTop: '0' }}>
                                        <a href={`mailto:${member.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
                                            {member.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Elders Section */}
                <h3 className="section-title" style={{ marginTop: 'var(--space-3xl)' }}>
                    {t.staff.elders.title[lang]}
                </h3>
                <div className="card-grid card-grid-5 horizontal-scroll-mobile">
                    {t.staff.elders.members.map((elder, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* Profile Image Placeholder */}
                                <div style={{ 
                                    width: '80px', 
                                    height: '80px', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'var(--color-bg-secondary)', 
                                    margin: '0 auto var(--space-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '2px solid var(--color-tertiary)',
                                    flexShrink: 0
                                }}>
                                    {/* TODO: Replace with real images when available: <img src="/images/elders/name.jpg" alt="..." /> */}
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                
                                <h4 className="staff-name" style={{ fontSize: 'var(--font-size-base)', margin: 0, marginBottom: 'var(--space-xs)' }}>
                                    {elder.name[lang]}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Service Times */}
            <section id="service-times" className="container">
                <h2 className="section-title">{t.serviceTime.title[lang]}</h2>

                <div className="service-times-grid">
                    {t.serviceTime.services.map((service, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <h3 className="card-title">{service.category[lang]}</h3>
                                <div className="service-list">
                                    {service.items.map((item, idx) => (
                                        <div key={idx} className="service-item">
                                            <div className="service-time">{item.time[lang]}</div>
                                            <div className="service-name">{item.name[lang]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* History Section */}
            <section id="history" className="container">
                <h2 className="section-title">{t.history.title[lang]}</h2>
                <div className="content-wrapper">
                    <div className="timeline">
                        {t.history.timeline.map((item, index) => (
                            <div key={index} className="timeline-item scroll-fade">
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-content">
                                    <p>{item.event[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section id="location" className="container">
                <h2 className="section-title">{t.location.title[lang]}</h2>
                <div className="content-wrapper">
                    <div className="card scroll-fade">
                        <div className="card-content">
                            <h3 className="card-title">{lang === "en" ? "Address" : "주소"}</h3>
                            <p className="text-lg mb-sm">{t.location.address[lang]}</p>
                            
                            <h3 className="card-title" style={{ marginTop: 'var(--space-lg)' }}>{lang === "en" ? "Phone" : "전화번호"}</h3>
                            <p className="text-lg mb-sm">{t.location.phone}</p>
                            
                            <h3 className="card-title" style={{ marginTop: 'var(--space-lg)' }}>{lang === "en" ? "Email" : "이메일"}</h3>
                            <p className="text-lg mb-lg"><a href={`mailto:${t.location.email}`} style={{ color: 'var(--color-accent)' }}>{t.location.email}</a></p>
                            
                            <p className="card-description">{t.location.directions[lang]}</p>
                            <div className="card-footer">
                                <a
                                    href="https://maps.app.goo.gl/jCzp5U8nsKiw3zCS6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    {lang === "en" ? "Open in Google Maps" : "구글 지도로 보기"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Scroll to Top Button for the page */}
            {mounted && createPortal(
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9000,
                        opacity: 0.9,
                        transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
                    title={lang === 'en' ? 'Scroll to top' : '맨 위로'}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 15l-6-6-6 6"/>
                    </svg>
                </button>,
                document.body
            )}

            <style jsx>{`
        .quick-nav {
          display: flex;
          justify-content: center;
          gap: var(--space-lg);
          flex-wrap: wrap;
          padding: var(--space-xl) 0;
          margin-bottom: var(--space-2xl);
        }

        .quick-nav-item {
          padding: var(--space-md) var(--space-xl);
          background-color: white;
          border: 2px solid var(--color-accent);
          border-radius: var(--radius-md);
          color: var(--color-accent);
          font-weight: var(--font-weight-semibold);
          transition: all var(--transition-base);
        }

        .quick-nav-item:hover {
          background-color: var(--color-accent);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .about-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .text-lg {
          font-size: var(--font-size-lg);
          line-height: var(--line-height-relaxed);
        }

        .bg-light {
          background-color: var(--color-bg-secondary);
        }

        .service-times-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
        }

        .service-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .service-item {
          padding: var(--space-md);
          border-left: 3px solid var(--color-accent);
          background-color: var(--color-bg-secondary);
          border-radius: var(--radius-sm);
        }

        .service-time {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-accent);
          margin-bottom: var(--space-xs);
        }

        .service-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin-bottom: var(--space-xs);
        }

        .service-location {
          font-size: var(--font-size-sm);
          color: var(--color-text-light);
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          padding-left: var(--space-2xl);
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--color-accent), var(--color-secondary));
        }

        .timeline-item {
          position: relative;
          padding-bottom: var(--space-2xl);
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: calc(-1 * var(--space-2xl) - 6px);
          top: 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: var(--color-accent);
          border: 3px solid white;
          box-shadow: 0 0 0 3px var(--color-accent);
        }

        .timeline-year {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-accent);
          margin-bottom: var(--space-sm);
        }

        .timeline-content {
          background-color: white;
          padding: var(--space-lg);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }

        .timeline-content p {
          margin: 0;
          line-height: var(--line-height-relaxed);
        }

        @media (max-width: 768px) {
          .quick-nav {
            gap: var(--space-md);
          }

          .quick-nav-item {
            padding: var(--space-sm) var(--space-lg);
            font-size: var(--font-size-sm);
          }

          .timeline {
            padding-left: var(--space-xl);
          }
        }
      `}</style>
        </>
    );
}
