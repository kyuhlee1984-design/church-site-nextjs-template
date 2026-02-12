"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Events() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "Events", ko: "행사" },
            subtitle: { en: "Connect with others and grow together", ko: "다른 사람들과 연결하고 함께 성장하세요" },
        },
        sectionTitle: { en: "Upcoming Events", ko: "다가오는 행사" },
        events: [
            {
                date: { en: "Friday, February 14, 2026 • 7:00 PM", ko: "2026년 2월 14일 금요일 • 오후 7:00" },
                title: { en: "Valentine's Couples Night", ko: "발렌타인 부부의 밤" },
                description: {
                    en: "An evening of worship, fellowship, and celebration for married couples. Enjoy dinner, worship music, and a special message about love and marriage. Childcare provided with RSVP.",
                    ko: "부부를 위한 예배, 친교, 그리고 축하의 저녁. 저녁 식사, 예배 음악, 그리고 사랑과 결혼에 대한 특별한 메시지를 즐기세요. RSVP 시 탁아 제공.",
                },
                cta: { en: "Register", ko: "등록하기" },
            },
            {
                date: { en: "Saturday, February 22, 2026 • 9:00 AM - 2:00 PM", ko: "2026년 2월 22일 토요일 • 오전 9:00 - 오후 2:00" },
                title: { en: "Community Service Day", ko: "지역 봉사의 날" },
                description: {
                    en: "Join us as we serve our local community through various outreach projects including food distribution, home repairs for seniors, and park cleanup. Lunch provided for all volunteers.",
                    ko: "식량 배급, 노인 가정 수리, 공원 청소를 포함한 다양한 봉사 프로젝트를 통해 지역 사회를 섬기는 데 동참하세요. 모든 자원봉사자에게 점심 제공.",
                },
                cta: { en: "Sign Up", ko: "신청하기" },
            },
            {
                date: { en: "Sunday, March 2, 2026 • 12:00 PM", ko: "2026년 3월 2일 일요일 • 오후 12:00" },
                title: { en: "New Members Class", ko: "새 가족 교실" },
                description: {
                    en: "Interested in joining Grace Community Church? This class covers our beliefs, values, and how you can become an official member. Light lunch will be served.",
                    ko: "은혜 공동체 교회에 가입하고 싶으신가요? 이 수업은 우리의 신념, 가치관, 그리고 정식 회원이 되는 방법을 다룹니다. 가벼운 점심이 제공됩니다.",
                },
                cta: { en: "Register", ko: "등록하기" },
            },
            {
                date: { en: "Friday, March 7-9, 2026", ko: "2026년 3월 7-9일 금요일" },
                title: { en: "Youth Winter Retreat", ko: "청소년 겨울 수련회" },
                description: {
                    en: "A weekend getaway for our youth (grades 6-12) filled with worship, teaching, small groups, and recreational activities. Cost is $150 per person. Early bird discount available until Feb 20.",
                    ko: "예배, 가르침, 소그룹, 그리고 레크리에이션 활동으로 가득 찬 청소년(6-12학년)을 위한 주말 수련회. 1인당 $150. 2월 20일까지 조기 등록 할인 가능.",
                },
                cta: { en: "Register", ko: "등록하기" },
            },
        ],
    };

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-events.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">{t.hero.title[lang]}</h1>
                    <p className="hero-subtitle">{t.hero.subtitle[lang]}</p>
                </div>
            </section>

            <section className="container">
                <h2 className="section-title">{t.sectionTitle[lang]}</h2>

                <div className="card-grid card-grid-2">
                    {t.events.map((event, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <div className="card-meta">{event.date[lang]}</div>
                                <h3 className="card-title">{event.title[lang]}</h3>
                                <p className="card-description">{event.description[lang]}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
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
