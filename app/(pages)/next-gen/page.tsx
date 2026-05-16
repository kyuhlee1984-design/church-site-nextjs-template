"use client";

import { useLanguage } from "../../contexts/LanguageContext";

export default function NextGen() {
    const { lang } = useLanguage();

    const t = {
        title: { en: "Next Generation", ko: "다음세대" },
        subtitle: { en: "Page Under Construction", ko: "페이지를 준비 중입니다" },
        description: { 
            en: "We are currently working on this page to bring you better content. Please check back later!", 
            ko: "더 나은 콘텐츠를 제공하기 위해 페이지를 준비하고 있습니다. 나중에 다시 방문해 주세요!" 
        }
    };

    return (
        <div style={{ 
            minHeight: '60vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--space-xl)'
        }}>
            <div style={{
                marginBottom: 'var(--space-lg)',
                padding: 'var(--space-xl)',
                backgroundColor: 'var(--color-background-alt)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)'
            }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 4-3 3"/>
                    <path d="m14 10 3-3"/>
                    <path d="m20 10-6 6-4-4 6-6Z"/>
                    <path d="m2 22 8-8"/>
                </svg>
            </div>
            <h1 style={{ 
                fontSize: 'var(--font-size-4xl)', 
                marginBottom: 'var(--space-md)',
                fontFamily: 'var(--font-family-heading)'
            }}>
                {t.title[lang]}
            </h1>
            <h2 style={{ 
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-secondary)', 
                marginBottom: 'var(--space-lg)',
                fontWeight: 'var(--font-weight-medium)'
            }}>
                {t.subtitle[lang]}
            </h2>
            <p style={{ 
                maxWidth: '600px', 
                color: 'var(--color-text-tertiary)', 
                lineHeight: 1.6,
                fontSize: 'var(--font-size-lg)'
            }}>
                {t.description[lang]}
            </p>
        </div>
    );
}
