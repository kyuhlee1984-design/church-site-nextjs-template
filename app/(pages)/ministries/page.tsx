"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";
import { useModalBackButton } from "../../hooks/useModalBackButton";

export default function Ministries() {
    const { lang } = useLanguage();
    const [selectedMinistryId, setSelectedMinistryId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedMinistryId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedMinistryId]);

    // Handle mobile back button for the modal
    useModalBackButton(!!selectedMinistryId, () => setSelectedMinistryId(null));

    const t = {
        hero: {
            title: { en: "Ministries", ko: "사역" },
            subtitle: { en: "Find your place to connect, grow, and serve", ko: "연결하고, 성장하고, 섬길 곳을 찾으세요" },
        },
        ministries: [
            {
                id: "promise-land",
                title: { en: "Promise Land (Children)", ko: "Promise Land (유아·초등부)" },
                description: {
                    en: "Our children's ministry (Promise Land) provides a loving environment for infants through elementary students to learn about God's love through engaging activities, worship, and Bible stories.",
                    ko: "Promise Land는 유아부터 초등학생까지를 위한 사역으로, 재미있는 활동, 예배, 그리고 성경 이야기를 통해 하나님의 사랑을 배우는 사랑이 가득한 환경을 제공합니다.",
                },
            },
            {
                id: "kings-army",
                title: { en: "King's Army (Middle School)", ko: "King's Army (중학부)" },
                description: {
                    en: "King's Army is our middle school ministry where students develop strong faith foundations, build lasting friendships, and learn to serve God with courage and passion.",
                    ko: "King's Army는 중학생들을 위한 사역으로, 학생들이 견고한 믿음의 기초를 다지고, 지속적인 우정을 쌓으며, 용기와 열정으로 하나님을 섬기는 법을 배웁니다.",
                },
            },
            {
                id: "second-chapter",
                title: { en: "Second Chapter (High School)", ko: "Second Chapter (고등부)" },
                description: {
                    en: "Second Chapter is our high school ministry empowering students to write their faith story with purpose, helping them navigate challenges and discover their identity in Christ.",
                    ko: "Second Chapter는 고등학생들을 위한 사역으로, 학생들이 목적을 가지고 자신의 믿음 이야기를 쓰도록 힘을 실어주며, 도전을 헤쳐나가고 그리스도 안에서 정체성을 발견하도록 돕습니다.",
                },
            },
            {
                id: "korean-school",
                title: { en: "Westside Korean Language School", ko: "서부한국어학교" },
                description: {
                    en: "Our Korean Language School helps children and youth learn Korean language and culture in a fun and engaging environment. We offer classes for various age groups and proficiency levels.",
                    ko: "서부한국어학교는 아이들과 청소년들이 재미있고 흥미로운 환경에서 한국어와 문화를 배울 수 있도록 돕습니다. 다양한 연령대와 수준별 클래스를 제공합니다.",
                },
            },
            {
                id: "enoch-university",
                title: { en: "Enoch University Canada", ko: "캐나다 에녹대학" },
                description: {
                    en: "Enoch University Canada offers theological education and ministry training. We partner with this institution to provide opportunities for spiritual growth and leadership development.",
                    ko: "캐나다 에녹대학은 신학 교육과 사역 훈련을 제공합니다. 이 기관과 협력하여 영적 성장과 리더십 개발의 기회를 제공합니다.",
                },
            },
        ],
        learnMore: { en: "Learn More", ko: "자세히 보기" },
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-ministries.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <div className="card-grid card-grid-2">
                    {t.ministries.map((ministry, index) => (
                        <div key={index} id={ministry.id} className="card scroll-fade compact-card-mobile">
                            <div className="card-content">
                                <h3 className="card-title">{ministry.title[lang]}</h3>
                                <p className="card-description">{ministry.description[lang]}</p>
                                <div className="card-footer">
                                    <button 
                                        className="btn btn-primary"
                                        style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (ministry.id === "promise-land" || ministry.id === "kings-army" || ministry.id === "second-chapter") {
                                                setSelectedMinistryId(ministry.id);
                                            } else {
                                                alert(lang === 'en' ? 'Detailed information is being prepared!' : '자세한 정보가 준비 중입니다!');
                                            }
                                        }}
                                    >
                                        {t.learnMore[lang]}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal for Promise Land */}
            {mounted && selectedMinistryId === "promise-land" && createPortal(
                <div className="modal-overlay" onClick={() => setSelectedMinistryId(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedMinistryId(null)}>
                            &times;
                        </button>
                        <div className="modal-body">
                            <h2>{t.ministries.find(m => m.id === "promise-land")?.title[lang]}</h2>
                            
                            <div className="promise-land-details">
                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Worship Time & Place' : '예배 시간 및 장소'}</h3>
                                    <p><strong>{lang === 'en' ? '1st Service:' : '1부:'}</strong> 9:40am</p>
                                    <p><strong>{lang === 'en' ? '2nd Service:' : '2부:'}</strong> 11:40am</p>
                                    <p><strong>{lang === 'en' ? 'Location:' : '장소:'}</strong> {lang === 'en' ? 'Basement Education Hall' : '지하 교육관'}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Staff' : '교육 담당'}</h3>
                                    <p><strong>{lang === 'en' ? 'Infants & Toddlers:' : '영.유아부:'}</strong> {lang === 'en' ? 'Pastor Sara Yun' : '윤선영전도사 (Pastor Sara Yun)'}</p>
                                    <p><strong>{lang === 'en' ? 'Kindergarten:' : '유치부:'}</strong> {lang === 'en' ? 'Pastor Sunny Lee' : '이선우전도사 (Pastor Sunny Lee)'}</p>
                                    <p><strong>{lang === 'en' ? 'Elementary:' : '유,초등부:'}</strong> {lang === 'en' ? 'Pastor Andrea Kim' : '정예림전도사 (Pastor Andrea Kim)'}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Infant, Toddler, Kindergarten - Core Theme & Goals' : '영아부, 유아부, 유치부 핵심 주제 및 목표'}</h3>
                                    <p><strong>{lang === 'en' ? 'Theme: Kingdom of God!' : '주제: 하나님 나라!'}</strong></p>
                                    <p>{lang === 'en' 
                                        ? "We unfold the Bible stories from Genesis to Revelation through characters and events. In the Old Testament, we focus on the stories of central characters, and in the New Testament, we learn about Jesus and His disciples."
                                        : "창세기부터 요한계시록까지의 성경이야기를 인물과 사건으로 풀어가며, 특히 구약에서는 중심이 되는 인물들의 이야기를 배우고, 신약에서는 예수님 이야기를 중심으로 그 제자들의 이야기를 배우게 된다."}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Elementary - Core Theme & Goals' : '유년부, 초등부 핵심 주제 및 목표'}</h3>
                                    <p><strong>Goals:</strong> Doing Life with God in the Picture</p>
                                    <p style={{ fontStyle: 'italic' }}>...a child-targeted children&apos;s ministry where the Bible is creatively taught and expressed, where its truths are presented in relevant ways, where shepherding children is intentional, where kids are safe to be who they are and ask questions, and where discovering God&apos;s truth is fun!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Modal for King's Army */}
            {mounted && selectedMinistryId === "kings-army" && createPortal(
                <div className="modal-overlay" onClick={() => setSelectedMinistryId(null)}>
                    <div className="modal-content kings-army" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedMinistryId(null)}>
                            &times;
                        </button>
                        <div className="modal-body">
                            <h2>{t.ministries.find(m => m.id === "kings-army")?.title[lang]}</h2>
                            
                            <div className="promise-land-details">
                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Worship Time & Place' : '예배 시간 및 장소'}</h3>
                                    <p><strong>{lang === 'en' ? 'Sunday Worship:' : '주일 예배:'}</strong> {lang === 'en' ? 'Every Sunday 11:40am (in English)' : '매주 11:40 (영어 예배)'}</p>
                                    <p><strong>{lang === 'en' ? 'Location:' : '장소:'}</strong> {lang === 'en' ? 'Nazareth Sanctuary' : '나사렛 성전'}</p>
                                    <p><strong>{lang === 'en' ? 'Wednesday Meeting:' : '수요 모임:'}</strong> {lang === 'en' ? 'Online Bible Reading' : '온라인 성경읽기 모임'}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Staff' : '교육 담당'}</h3>
                                    <p><strong>{lang === 'en' ? "King's Army:" : '중등부:'}</strong> {lang === 'en' ? 'Pastor Sunny Shin' : '신태양 전도사 (Pastor Sunny Shin)'}</p>
                                    <p><strong>Email:</strong> <a href="mailto:sunny.ml.shin@gmail.com" style={{ color: 'var(--color-accent)' }}>sunny.ml.shin@gmail.com</a></p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'About Us' : '소개'}</h3>
                                    <p>{lang === 'en'
                                        ? "Westside Presbyterian Church’s middle school ministry (grade 6-8) is called King’s Army. Together with the teachers and staff, we worship and grow as a church community."
                                        : "서부장로교회 중등부(King’s Army)는 6학년-8학년 학생들이 모여 선생님들과 함께 공동체를 이루어갑니다."}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Core Theme: Daniel 1:8' : '핵심 말씀: 다니엘서 1:8'}</h3>
                                    <p style={{ fontStyle: 'italic', marginBottom: '8px', color: 'var(--color-primary)' }}>
                                        {lang === 'en'
                                            ? '"But Daniel resolved not to defile himself with the royal food and wine, and he asked the chief official for permission not to defile himself this way."'
                                            : '"다니엘은 뜻을 정하여 왕의 음식과 그가 마시는 포도주로 자기를 더럽히지 아니하리라 하고 자기를 더럽히지 아니하도록 환관장에게 구하니"'}
                                    </p>
                                    <p>{lang === 'en'
                                        ? "Just like Daniel, we pray that the King’s Army students resolve and learn to live a different life than the world, holy to the Lord."
                                        : "다니엘처럼 이 세대를 본받는 게 아니라 하나님의 백성으로 구별된 삶을 살아가려고 하는 중등부 학생들이 되기를 기도하며 예배합니다."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Modal for Second Chapter */}
            {mounted && selectedMinistryId === "second-chapter" && createPortal(
                <div className="modal-overlay" onClick={() => setSelectedMinistryId(null)}>
                    <div className="modal-content second-chapter" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedMinistryId(null)}>
                            &times;
                        </button>
                        <div className="modal-body">
                            <h2>{t.ministries.find(m => m.id === "second-chapter")?.title[lang]}</h2>
                            
                            <div className="promise-land-details">
                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Worship Time & Place' : '예배 시간 및 장소'}</h3>
                                    <p><strong>{lang === 'en' ? 'Sunday Worship:' : '주일 예배:'}</strong> {lang === 'en' ? 'Every Sunday 11:40am (in English)' : '매주 11:40 (영어 예배)'}</p>
                                    <p><strong>{lang === 'en' ? 'Location:' : '장소:'}</strong> {lang === 'en' ? 'Nazareth Sanctuary' : '나사렛 성전'}</p>
                                    <p><strong>{lang === 'en' ? 'Friday Meeting:' : '금요 모임:'}</strong> {lang === 'en' ? 'Online Bible Reading' : '온라인 성경읽기 모임'}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Staff' : '교육 담당'}</h3>
                                    <p><strong>{lang === 'en' ? "Second Chapter:" : '고등부:'}</strong> {lang === 'en' ? 'Pastor Sunny Shin' : '신태양 전도사 (Pastor Sunny Shin)'}</p>
                                    <p><strong>Email:</strong> <a href="mailto:sunny.ml.shin@gmail.com" style={{ color: 'var(--color-accent)' }}>sunny.ml.shin@gmail.com</a></p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'About Us' : '소개'}</h3>
                                    <p>{lang === 'en'
                                        ? "Westside Presbyterian Church’s high school ministry (grade 9-12) is called Second Chapter. Together with the teachers and staff, we worship and grow as a church community."
                                        : "서부장로교회 고등부(Second Chapter)는 9학년-12학년 학생들이 모여 선생님들과 함께 공동체를 이루어갑니다."}</p>
                                </div>

                                <div className="detail-section">
                                    <h3>{lang === 'en' ? 'Core Theme: Acts 2:42' : '핵심 말씀: 사도행전 2:42'}</h3>
                                    <p style={{ fontStyle: 'italic', marginBottom: '8px', color: 'var(--color-primary)' }}>
                                        {lang === 'en'
                                            ? '"They devoted themselves to the apostles’ teaching and to fellowship, to the breaking of bread and to prayer."'
                                            : '"그들이 사도의 가르침을 받아 서로 교제하고 떡을 떼며 오로지 기도하기를 힘쓰니라"'}
                                    </p>
                                    <p>{lang === 'en'
                                        ? "Following the early church, we pray that the Second Chapter students grow into a true church, living a life set apart as God's people rather than conforming to this world."
                                        : "초대교회를 본받아 이 세대를 본받는 게 아니라 하나님의 백성으로 구별된 삶을 살아 교회다운 교회로 성장하며 살아가려는 고등부 학생들이 되기를 기도하며 예배합니다."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: var(--space-md);
                }
                .modal-content {
                    background: url('/images/promise_land_bg.png') no-repeat center center;
                    background-size: cover;
                    border-radius: var(--radius-lg);
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: var(--shadow-xl);
                    animation: modalFadeIn 0.3s ease-out;
                    border: 8px solid rgba(255, 255, 255, 0.2);
                }
                .modal-content.kings-army {
                    background: url('/images/kings-army-bg.jpg') no-repeat center center;
                    background-size: cover;
                }
                .modal-content.second-chapter {
                    background: linear-gradient(135deg, #2b4162 0%, #fa9c7a 100%);
                }
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .modal-close {
                    position: absolute;
                    top: var(--space-md);
                    right: var(--space-md);
                    background: rgba(0, 0, 0, 0.3);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: white;
                    line-height: 1;
                    transition: all 0.2s;
                    z-index: 10;
                }
                .modal-close:hover {
                    background: rgba(0, 0, 0, 0.6);
                    transform: scale(1.1);
                }
                .modal-body {
                    padding: var(--space-2xl);
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(3px);
                    border-radius: calc(var(--radius-lg) - 4px);
                    margin: var(--space-xl);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }
                @media (max-width: 600px) {
                    .modal-body {
                        margin: var(--space-sm);
                        padding: var(--space-xl);
                    }
                }
                .modal-body h2 {
                    color: var(--color-accent);
                    margin-bottom: var(--space-xl);
                    font-size: var(--font-size-2xl);
                    border-bottom: 2px dashed rgba(232, 139, 45, 0.4);
                    padding-bottom: var(--space-sm);
                    text-align: center;
                    font-family: var(--font-family-cute);
                }
                .promise-land-details {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-xl);
                }
                .detail-section h3 {
                    font-size: var(--font-size-lg);
                    color: var(--color-primary);
                    margin-bottom: var(--space-sm);
                    display: inline-block;
                    background: rgba(232, 139, 45, 0.15);
                    padding: 6px 16px;
                    border-radius: 20px;
                    border-left: 4px solid var(--color-accent);
                }
                .detail-section p {
                    margin-bottom: var(--space-xs);
                    line-height: 1.6;
                    color: #333;
                    font-weight: 500;
                }
            `}</style>
        </>
    );
}
