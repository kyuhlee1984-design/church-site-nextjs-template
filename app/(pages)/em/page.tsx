"use client";

import Link from "next/link";
import { useLanguage } from "../../contexts/LanguageContext";

export default function EM() {
    const { lang } = useLanguage();

    const t = {
        hero: {
            title: { en: "LIGHTHOUSE FELLOWSHIP", ko: "LIGHTHOUSE FELLOWSHIP" },
            subtitle: { en: "Love, Grow and Live to make disciples of Jesus Christ!", ko: "예수 그리스도의 제자를 삼기 위해 사랑하고, 성장하며, 실천합니다!" },
        },
        mission: {
            title: { en: "Mission Statement", ko: "비전 선언문" },
            statement: { en: "Love, Grow and Live to make disciples of Jesus Christ!", ko: "예수 그리스도의 제자를 삼기 위해 사랑하고, 성장하며, 실천합니다!" },
            verse: { en: "Matthew 28:18-20", ko: "마태복음 28:18-20" },
            scripture: { 
                en: "“18 Then Jesus came to them and said, “All authority in heaven and on earth has been given to me. 19 Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, 20 and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.”", 
                ko: "“18 예수께서 나아와 말씀하여 이르시되 하늘과 땅의 모든 권세를 내게 주셨으니 19 그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 세례를 베풀고 20 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라 하시니라”" 
            }
        },
        coreValues: {
            love: {
                title: { en: "Love", ko: "Love" },
                desc: { en: "Loving God and people.", ko: "하나님과 사람을 사랑합니다." },
                verses: [
                    {
                        text: {
                            en: "“29 The most important one,” answered Jesus, “is this: ‘Hear, O Israel: The Lord our God, the Lord is one. 30 Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.’ 31 The second is this: ‘Love your neighbor as yourself.’ There is no commandment greater than these.”",
                            ko: "29 예수께서 대답하시되 첫째는 이것이니 이스라엘아 들으라 주 곧 우리 하나님은 유일한 주시라 30 네 마음을 다하고 목숨을 다하고 뜻을 다하고 힘을 다하여 주 너의 하나님을 사랑하라 하신 것이요 31 둘째는 이것이니 네 이웃을 네 자신과 같이 사랑하라 하신 것이라 이보다 더 큰 계명이 없느니라"
                        },
                        ref: { en: "Mark 12:29-31", ko: "마가복음 12:29-31" }
                    },
                    {
                        text: {
                            en: "“34 A new command I give you: Love one another. As I have loved you, so you must love one another. 35 By this all men will know that you are my disciples, if you love one another.”",
                            ko: "34 새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 35 너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라"
                        },
                        ref: { en: "John 13:34-35", ko: "요한복음 13:34-35" }
                    }
                ]
            },
            grow: {
                title: { en: "Grow", ko: "Grow" },
                desc: { en: "Growing in the word of God, commune with Him through prayer and have fellowship with one another.", ko: "말씀 안에서 성장하고, 기도로 교제하며 서로 친교를 나눕니다." },
                verses: [
                    {
                        text: {
                            en: "“42 They devoted themselves to the apostles’ teaching and to fellowship, to the breaking of bread and to prayer.”",
                            ko: "42 그들이 사도의 가르침을 받아 서로 교제하고 떡을 떼며 오로지 기도하기를 힘쓰니라"
                        },
                        ref: { en: "Acts 2:42", ko: "사도행전 2:42" }
                    },
                    {
                        text: {
                            en: "“16 All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, 17 so that the servant of God may be thoroughly equipped for every good work.”",
                            ko: "16 모든 성경은 하나님의 감동으로 된 것으로 교훈과 책망과 바르게 함과 의로 교육하기에 유익하니 17 이는 하나님의 사람으로 온전하게 하며 모든 선한 일을 행할 능력을 갖추게 하려 함이라"
                        },
                        ref: { en: "2 Timothy 3:16-17", ko: "디모데후서 3:16-17" }
                    }
                ]
            },
            live: {
                title: { en: "Live", ko: "Live" },
                desc: { en: "Live to fulfill God’s will and desire to expand the kingdom of God.", ko: "하나님의 뜻을 이루고 하나님 나라 확장을 위해 살아갑니다." },
                verses: [
                    {
                        text: {
                            en: "“44 All the believers were together and had everything in common. 45 They sold property and possessions to give to anyone who had need. 46 Every day they continued to meet together in the temple courts. They broke bread in their homes and ate together with glad and sincere hearts, 47 praising God and enjoying the favour of all the people. And the Lord added to their number daily those who were being saved.”",
                            ko: "44 믿는 사람이 다 함께 있어 모든 물건을 서로 통용하고 45 또 재산과 소유를 팔아 각 사람의 필요를 따라 나눠 주며 46 날마다 마음을 같이하여 성전에 모이기를 힘쓰고 집에서 떡을 떼며 기쁨과 순전한 마음으로 음식을 먹고 47 하나님을 찬미하며 또 온 백성에게 칭송을 받으니 주께서 구원 받는 사람을 날마다 더하게 하시니라"
                        },
                        ref: { en: "Acts 2:44-47", ko: "사도행전 2:44-47" }
                    }
                ]
            }
        },
        events: {
            title: { en: "Events", ko: "모임 안내" },
            items: [
                {
                    title: { en: "Friday Bible Study", ko: "금요 성경공부" },
                    time: { en: "Fridays 10 pm on Zoom", ko: "금요일 밤 10시 (Zoom)" },
                    desc: { en: "(Contact Pastor Steven for Zoom Link)", ko: "(Zoom 링크는 담당 목회자에게 문의)" }
                }
            ]
        },
        schedule: {
            title: { en: "Sunday Schedule", ko: "주일 주요일정" },
            items: [
                { name: { en: "Sunday Service", ko: "주일 예배" }, time: "9:40 AM – 11:00 AM" },
                { name: { en: "Small Group", ko: "소그룹 모임" }, time: "11:00 AM – 11:30 AM" },
                { name: { en: "Bible Study", ko: "성경 공부" }, time: "11:30 AM – 12:30 PM" },
                { name: { en: "Prayer Meeting", ko: "기도회" }, time: "1:00 PM – 1:40 PM" }
            ]
        },
        contact: {
            title: { en: "Contact", ko: "문의 및 오시는 길" },
            addressTitle: { en: "Address:", ko: "주소:" },
            address: "3637 Grand Park Dr, Mississauga, ON L5B 4L6",
            officeTitle: { en: "Church Office:", ko: "교회 사무실:" },
            office: "(905) 803-8800",
            emailTitle: { en: "Email:", ko: "이메일:" },
            email: "westsidelighthouse@gmail.com"
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-banner" style={{ backgroundImage: "url('/images/hero-em.jpg')" }}>
                <div className="hero-content" style={{ textAlign: "center", width: "100%", maxWidth: "1200px", padding: "var(--space-2xl)", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: "1rem", fontWeight: "800", letterSpacing: "0.05em" }}>
                        {t.hero.title[lang]}
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: "500", letterSpacing: "0.05em", color: "rgba(255, 255, 255, 0.95)" }}>
                        {t.hero.subtitle[lang]}
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section style={{ padding: "var(--section-padding-y) 0", backgroundColor: "var(--color-bg-main)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                    <h2 className="section-title" style={{ marginBottom: "var(--space-xl)" }}>{t.mission.title[lang]}</h2>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--color-primary)", marginBottom: "var(--space-lg)", lineHeight: "1.6" }}>
                        {t.mission.statement[lang]}
                    </p>
                    <div style={{ backgroundColor: "var(--color-bg-secondary)", padding: "var(--space-xl)", borderRadius: "var(--radius-lg)", marginTop: "var(--space-lg)" }}>
                        <p style={{ fontStyle: "italic", lineHeight: "1.8", fontSize: "1.1rem", marginBottom: "var(--space-md)", color: "var(--color-text-primary)" }}>
                            {t.mission.scripture[lang]}
                        </p>
                        <p style={{ fontWeight: "bold", color: "var(--color-accent)", textAlign: "right" }}>
                            - {t.mission.verse[lang]} -
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values - 3 Cards Layout */}
            <section style={{ 
                padding: "var(--space-4xl) 0",
                backgroundColor: "#1e1b4b",
                backgroundImage: "radial-gradient(circle at 0% 0%, #1d4ed8 0%, transparent 50%), radial-gradient(circle at 100% 0%, #171e36 0%, transparent 50%), radial-gradient(circle at 0% 100%, #831843 0%, transparent 50%), radial-gradient(circle at 100% 100%, #ea580c 0%, transparent 50%)",
            }}>
                <div className="container" style={{ padding: "0 var(--space-md)" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "var(--space-xl)",
                        alignItems: "stretch"
                    }}>
                        
                        {/* Love Card */}
                        <div className="card scroll-fade" style={{ 
                            background: "rgba(255, 255, 255, 0.05)", 
                            backdropFilter: "blur(12px)", 
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)", 
                            borderRadius: "var(--radius-2xl)", 
                            padding: "var(--space-2xl)", 
                            color: "white",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <h3 style={{ fontSize: "2.5rem", color: "#fca5a5", marginBottom: "var(--space-md)", fontWeight: "800", letterSpacing: "1px", textAlign: "center" }}>
                                {t.coreValues.love.title[lang]}
                            </h3>
                            <p style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "var(--space-xl)", color: "rgba(255,255,255,0.9)", textAlign: "center", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                                {t.coreValues.love.desc[lang]}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: "auto" }}>
                                {t.coreValues.love.verses.map((v, i) => (
                                    <div key={i}>
                                        <p style={{ fontStyle: "italic", fontSize: "1rem", lineHeight: "1.6", marginBottom: "var(--space-xs)", color: "rgba(255,255,255,0.85)", wordBreak: "keep-all" }}>
                                            {v.text[lang]}
                                        </p>
                                        <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textAlign: "right" }}>
                                            - {v.ref[lang]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grow Card */}
                        <div className="card scroll-fade" style={{ 
                            background: "rgba(255, 255, 255, 0.05)", 
                            backdropFilter: "blur(12px)", 
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)", 
                            borderRadius: "var(--radius-2xl)", 
                            padding: "var(--space-2xl)", 
                            color: "white",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                            display: "flex",
                            flexDirection: "column",
                            transitionDelay: "0.1s"
                        }}>
                            <h3 style={{ fontSize: "2.5rem", color: "#fcd34d", marginBottom: "var(--space-md)", fontWeight: "800", letterSpacing: "1px", textAlign: "center" }}>
                                {t.coreValues.grow.title[lang]}
                            </h3>
                            <p style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "var(--space-xl)", color: "rgba(255,255,255,0.9)", textAlign: "center", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                                {t.coreValues.grow.desc[lang]}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: "auto" }}>
                                {t.coreValues.grow.verses.map((v, i) => (
                                    <div key={i}>
                                        <p style={{ fontStyle: "italic", fontSize: "1rem", lineHeight: "1.6", marginBottom: "var(--space-xs)", color: "rgba(255,255,255,0.85)", wordBreak: "keep-all" }}>
                                            {v.text[lang]}
                                        </p>
                                        <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textAlign: "right" }}>
                                            - {v.ref[lang]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Live Card */}
                        <div className="card scroll-fade" style={{ 
                            background: "rgba(255, 255, 255, 0.05)", 
                            backdropFilter: "blur(12px)", 
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)", 
                            borderRadius: "var(--radius-2xl)", 
                            padding: "var(--space-2xl)", 
                            color: "white",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                            display: "flex",
                            flexDirection: "column",
                            transitionDelay: "0.2s"
                        }}>
                            <h3 style={{ fontSize: "2.5rem", color: "#fdba74", marginBottom: "var(--space-md)", fontWeight: "800", letterSpacing: "1px", textAlign: "center" }}>
                                {t.coreValues.live.title[lang]}
                            </h3>
                            <p style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "var(--space-xl)", color: "rgba(255,255,255,0.9)", textAlign: "center", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                                {t.coreValues.live.desc[lang]}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: "auto" }}>
                                {t.coreValues.live.verses.map((v, i) => (
                                    <div key={i}>
                                        <p style={{ fontStyle: "italic", fontSize: "1rem", lineHeight: "1.6", marginBottom: "var(--space-xs)", color: "rgba(255,255,255,0.85)", wordBreak: "keep-all" }}>
                                            {t.coreValues.live.verses[i].text[lang]}
                                        </p>
                                        <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", textAlign: "right" }}>
                                            - {t.coreValues.live.verses[i].ref[lang]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Schedule & Events */}
            <section style={{ padding: "var(--section-padding-y) 0", backgroundColor: "var(--color-bg-main)", position: "relative", zIndex: 10 }}>
                <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        color: "white", 
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        boxShadow: "var(--shadow-lg)",
                        position: "relative"
                    }} className="scroll-fade">
                        {/* Blurred Background Image */}
                        <div style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: "url('/images/schedule-bg.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(6px) brightness(0.4)",
                            transform: "scale(1.05)", // prevent blurry edges showing white
                            zIndex: 0
                        }} />

                        {/* Sunday Schedule */}
                        <div style={{ padding: "var(--space-2xl)", position: "relative", zIndex: 1 }}>
                            <h2 className="section-title" style={{ textAlign: "left", color: "white", marginTop: 0, marginBottom: "var(--space-xl)", display: "block" }}>{t.schedule.title[lang]}</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                                {t.schedule.items.map((item, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "var(--space-sm)" }}>
                                        <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>{item.name[lang]}</span>
                                        <span style={{ fontSize: "1.1rem", color: "#fcd34d", fontWeight: "bold" }}>{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Events */}
                        <div style={{ padding: "var(--space-2xl)", backgroundColor: "rgba(0,0,0,0.3)", position: "relative", zIndex: 1 }}>
                            <h2 className="section-title" style={{ textAlign: "left", color: "white", marginTop: 0, marginBottom: "var(--space-xl)", display: "block" }}>{t.events.title[lang]}</h2>
                            {t.events.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: "var(--space-lg)" }}>
                                    <h3 style={{ fontSize: "1.4rem", color: "#fcd34d", marginBottom: "var(--space-xs)", fontWeight: "bold" }}>
                                        {item.title[lang]}
                                    </h3>
                                    <p style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>
                                        {item.time[lang]}
                                    </p>
                                    <p style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                                        {item.desc[lang]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section style={{ padding: "var(--section-padding-y) 0", backgroundColor: "var(--color-bg-secondary)", position: "relative", zIndex: 10 }}>
                <div className="container" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
                    <h2 className="section-title" style={{ marginBottom: "var(--space-xl)" }}>{t.contact.title[lang]}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", fontSize: "1.1rem" }}>
                        <div>
                            <span style={{ fontWeight: "bold", color: "var(--color-primary)", marginRight: "8px" }}>{t.contact.addressTitle[lang]}</span>
                            <span>{t.contact.address}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: "bold", color: "var(--color-primary)", marginRight: "8px" }}>{t.contact.officeTitle[lang]}</span>
                            <span>{t.contact.office}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: "bold", color: "var(--color-primary)", marginRight: "8px" }}>{t.contact.emailTitle[lang]}</span>
                            <a href={`mailto:${t.contact.email}`} style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: "bold" }}>{t.contact.email}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
