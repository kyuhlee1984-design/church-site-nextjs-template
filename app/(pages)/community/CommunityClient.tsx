/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChurchEvent, ChurchAlbum, Devotional } from "../../lib/notion";

export default function CommunityClient({ events, albums, devotionals }: { events: ChurchEvent[]; albums: ChurchAlbum[]; devotionals?: Devotional[] }) {
    const { lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<"events" | "gallery" | "devotionals">("gallery");

    // Modal state for Gallery Carousel
    const [viewingAlbum, setViewingAlbum] = useState<ChurchAlbum | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<ChurchAlbum | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Modal state for Devotionals
    const [viewingDevotional, setViewingDevotional] = useState<Devotional | null>(null);
    const [devotionalContent, setDevotionalContent] = useState<string | null>(null);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // The body overflow: hidden useEffect was removed because it breaks internal scrolling on iOS Safari.
    // Instead, we use overscrollBehavior: 'contain' on the modal containers.

    const openDevotional = async (devotional: Devotional) => {
        setViewingDevotional(devotional);
        setDevotionalContent(null);
        setIsLoadingContent(true);
        try {
            const res = await fetch(`/api/devotionals/${devotional.id}`);
            if (res.ok) {
                const data = await res.json();
                setDevotionalContent(data.content);
            } else {
                setDevotionalContent("Failed to load content.");
            }
        } catch (e) {
            setDevotionalContent("Error loading content.");
        } finally {
            setIsLoadingContent(false);
        }
    };

    const openAlbum = (album: ChurchAlbum) => {
        if (album.gallery && album.gallery.length > 0) {
            setViewingAlbum(album);
        }
    };

    const nextImage = () => {
        if (selectedAlbum && selectedAlbum.gallery.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedAlbum.gallery.length);
        }
    };

    const prevImage = () => {
        if (selectedAlbum && selectedAlbum.gallery.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedAlbum.gallery.length) % selectedAlbum.gallery.length);
        }
    };

    // Group albums by year
    const albumsByYear = albums.reduce((acc, album) => {
        const year = album.date ? album.date.substring(0, 4) : 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year].push(album);
        return acc;
    }, {} as Record<string, ChurchAlbum[]>);

    const years = Object.keys(albumsByYear).sort((a, b) => b.localeCompare(a)); // Descending order

    return (
        <div style={{ paddingTop: 'var(--space-2xl)' }}>
            {/* Page Header */}
            <div className="page-header" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <div className="container">
                    <h1 className="page-title">{lang === 'en' ? 'Community' : '서부광장'}</h1>
                    <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
                        {lang === 'en' 
                            ? 'Stay updated with our latest events and memories.'
                            : '서부장로교회의 다가올 행사와 아름다운 은혜의 발자취를 나눕니다.'}
                    </p>
                </div>
            </div>

            <section className="container">
                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-3xl)' }}>
                    <button 
                        onClick={() => setActiveTab("events")}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'var(--font-weight-medium)',
                            background: activeTab === "events" ? 'var(--color-accent)' : 'var(--color-secondary)',
                            color: activeTab === "events" ? 'white' : 'var(--color-text-primary)',
                            boxShadow: activeTab === "events" ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {lang === 'en' ? 'Upcoming Events' : '다가올 행사'}
                    </button>
                    <button 
                        onClick={() => setActiveTab("gallery")}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'var(--font-weight-medium)',
                            background: activeTab === "gallery" ? 'var(--color-accent)' : 'var(--color-secondary)',
                            color: activeTab === "gallery" ? 'white' : 'var(--color-text-primary)',
                            boxShadow: activeTab === "gallery" ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {lang === 'en' ? 'Westside Gallery' : '서부 갤러리'}
                    </button>
                    <button 
                        onClick={() => setActiveTab("devotionals")}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'var(--font-weight-medium)',
                            background: activeTab === "devotionals" ? 'var(--color-accent)' : 'var(--color-secondary)',
                            color: activeTab === "devotionals" ? 'white' : 'var(--color-text-primary)',
                            boxShadow: activeTab === "devotionals" ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {lang === 'en' ? "Devotionals" : '푸른초장'}
                    </button>
                </div>

                {/* Content */}
                {activeTab === "devotionals" && (
                    <div className="card-grid card-grid-2">
                        {devotionals && devotionals.length > 0 ? devotionals.map((devotional) => (
                            <div key={devotional.id} className="card scroll-fade" style={{ cursor: 'pointer', padding: 'var(--space-xl)', borderTop: '3px solid var(--color-accent)' }} onClick={() => openDevotional(devotional)}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                                    {devotional.date ? new Date(devotional.date).toLocaleDateString() : ''}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
                                    {devotional.title}
                                </h3>
                                {devotional.summary && (
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                        {devotional.summary}
                                    </p>
                                )}
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-light)' }}>
                                {lang === 'en' ? 'No devotionals available at the moment.' : '등록된 글이 없습니다.'}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "events" && (
                    <div className="card-grid card-grid-3">
                        {events.length > 0 ? events.map((event) => (
                            <div key={event.id} className="card scroll-fade" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
                                <div className="skeleton-loading" style={{ aspectRatio: '1/1', position: 'relative' }}>
                                    {event.imageUrl ? (
                                        <img 
                                            src={event.imageUrl} 
                                            alt={event.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}>
                                            No Image
                                        </div>
                                    )}
                                    {event.category && (
                                        <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {event.category}
                                        </span>
                                    )}
                                </div>
                                <div className="card-content" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    {event.date && (
                                        <div style={{ fontSize: '0.9rem', color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '8px' }}>
                                            {event.date}
                                        </div>
                                    )}
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{event.title}</h3>
                                    {event.description && (
                                        <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            {event.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', color: 'var(--color-text-secondary)' }}>
                                {lang === 'en' ? 'No upcoming events.' : '예정된 행사가 없습니다.'}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "gallery" && (
                    <div id="gallery-top" style={{ scrollMarginTop: '100px' }}>
                        {albums.length > 0 ? (
                            <>
                                {/* Year Tabs */}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                                    {years.map(year => (
                                        <a key={year} href={`#gallery-year-${year}`} style={{ 
                                            padding: '8px 24px', 
                                            background: 'var(--color-secondary)', 
                                            borderRadius: '20px', 
                                            textDecoration: 'none', 
                                            color: 'var(--color-text-primary)',
                                            fontWeight: 'bold',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-secondary)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                                        >
                                            {year}
                                        </a>
                                    ))}
                                </div>

                                {/* Grouped Sections */}
                                {years.map(year => (
                                    <div key={year} id={`gallery-year-${year}`} style={{ marginBottom: '64px', paddingTop: '32px', scrollMarginTop: '100px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                                            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                                            <h3 style={{ margin: '0 24px', fontSize: '1.8rem', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>{year}</h3>
                                            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                                        </div>
                                        
                                        <div className="card-grid gallery-grid-mobile">
                                            {albumsByYear[year].map(album => (
                                                <div 
                                                    key={album.id} 
                                                    className="card scroll-fade" 
                                                    style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                                                    onClick={() => openAlbum(album)}
                                                >
                                                    <div className="skeleton-loading" style={{ aspectRatio: '4/3', position: 'relative' }}>
                                                        {album.coverImage ? (
                                                            <img 
                                                                src={album.coverImage} 
                                                                alt={album.title} 
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                            />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}>
                                                                No Cover Image
                                                            </div>
                                                        )}
                                                        {album.gallery && album.gallery.length > 0 && (
                                                            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                                                    <polyline points="21 15 16 10 5 21"/>
                                                                </svg>
                                                                {album.gallery.length}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="card-content" style={{ padding: '16px' }}>
                                                        <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>{album.title}</h3>
                                                        {album.date && (
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                                {album.date}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '64px', color: 'var(--color-text-secondary)' }}>
                                {lang === 'en' ? 'No albums available.' : '등록된 앨범이 없습니다.'}
                            </div>
                        )}
                    </div>
                )}

                {mounted && viewingAlbum && createPortal((
                    <div 
                        onClick={() => setViewingAlbum(null)}
                        style={{ 
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(245, 241, 235, 0.85)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        zIndex: 9998,
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'fadeIn 0.3s ease',
                        overflowY: 'auto',
                        overscrollBehavior: 'contain',
                        WebkitOverflowScrolling: 'touch',
                        padding: 'var(--space-2xl) 0',
                    }}>
                        <div 
                            className="container" 
                            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}
                        >
                            <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                                <button 
                                    onClick={() => setViewingAlbum(null)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        background: 'var(--color-secondary)', border: 'none', cursor: 'pointer',
                                        color: 'var(--color-text-primary)', fontSize: '1rem',
                                        padding: '12px 24px', fontWeight: 'bold', borderRadius: '30px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    {lang === 'en' ? 'Close Album' : '앨범 닫기'}
                                </button>
                            </div>
                            
                            <h2 onClick={(e) => e.stopPropagation()} style={{ fontSize: '2.4rem', marginBottom: 'var(--space-2xl)', textAlign: 'center', fontWeight: 'bold' }}>
                                {viewingAlbum.title}
                            </h2>

                            <div className="card-grid gallery-grid-mobile">
                            {viewingAlbum.gallery.map((img, index) => (
                                <div 
                                    key={index} 
                                    className="card scroll-fade" 
                                    style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedAlbum(viewingAlbum);
                                        setCurrentImageIndex(index);
                                    }}
                                >
                                    <div className="skeleton-loading" style={{ aspectRatio: '1/1', position: 'relative' }}>
                                        <img 
                                            src={img} 
                                            alt={`${viewingAlbum.title} thumbnail ${index + 1}`} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                            background: 'rgba(0,0,0,0)', transition: 'background 0.3s ease',
                                        }} className="thumbnail-overlay" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                ), document.body)}
            </section>

            {/* Gallery Modal Carousel */}
            {mounted && selectedAlbum && createPortal((
                <div 
                    onClick={() => setSelectedAlbum(null)}
                    style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    overscrollBehavior: 'none',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Close Button */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedAlbum(null); }}
                        style={{
                            position: 'absolute',
                            top: '24px', right: '24px',
                            background: 'none', border: 'none', color: 'white',
                            cursor: 'pointer', zIndex: 10
                        }}
                        aria-label="Close"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Image Counter */}
                    <div style={{
                        position: 'absolute',
                        top: '24px', left: '24px',
                        color: 'white', fontSize: '1.2rem', fontWeight: 'bold'
                    }}>
                        {currentImageIndex + 1} / {selectedAlbum.gallery.length}
                    </div>

                    {/* Album Title */}
                    <div style={{
                        position: 'absolute',
                        bottom: '24px', left: '0', right: '0',
                        color: 'white', textAlign: 'center', fontSize: '1.2rem'
                    }}>
                        {selectedAlbum.title}
                    </div>

                    {/* Current Image Wrapper with Instagram-style click areas */}
                    <div 
                        style={{ position: 'relative', display: 'flex', maxWidth: '95vw', maxHeight: '90vh' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedAlbum.gallery[currentImageIndex]} 
                            alt={`${selectedAlbum.title} image ${currentImageIndex + 1}`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }}
                        />
                        
                        {/* Left invisible click area (Previous) */}
                        {selectedAlbum.gallery.length > 1 && (
                            <div 
                                onClick={prevImage}
                                style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', cursor: 'pointer' }}
                                title={lang === 'en' ? 'Previous image' : '이전 사진'}
                            />
                        )}
                        
                        {/* Right invisible click area (Next) */}
                        {selectedAlbum.gallery.length > 1 && (
                            <div 
                                onClick={nextImage}
                                style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', cursor: 'pointer' }}
                                title={lang === 'en' ? 'Next image' : '다음 사진'}
                            />
                        )}
                    </div>
                </div>
            ), document.body)}
            {/* Devotional Modal */}
            {/* Devotional Modal */}
            {mounted && viewingDevotional && createPortal((
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
                    {/* Backdrop */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(245, 241, 235, 0.95)', backdropFilter: 'blur(12px)' }} />

                    {/* Scrollable Area */}
                    <div 
                        id="devotional-scroll-container"
                        onClick={() => setViewingDevotional(null)}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                    >
                        <div 
                            className="container" 
                            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '40px 24px', backgroundColor: 'white', minHeight: '100vh', boxShadow: '0 0 40px rgba(0,0,0,0.05)', position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
                                <button 
                                    onClick={() => setViewingDevotional(null)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        color: 'var(--color-text-secondary)', fontSize: '1rem', fontWeight: '500'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                                    {lang === 'en' ? 'Back' : '목록으로'}
                                </button>
                            </div>
                            
                            <h2 style={{ fontSize: '2rem', marginBottom: '12px', fontWeight: 'bold' }}>
                                {viewingDevotional.title}
                            </h2>
                            <div style={{ fontSize: '1rem', color: 'var(--color-text-light)', marginBottom: '32px' }}>
                                {viewingDevotional.date ? new Date(viewingDevotional.date).toLocaleDateString() : ''}
                            </div>

                            <div className="prose" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                                {isLoadingContent ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                                        {lang === 'en' ? 'Loading content...' : '본문을 불러오는 중입니다...'}
                                    </div>
                                ) : (
                                    <ReactMarkdown>{devotionalContent || ""}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('devotional-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
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
                            zIndex: 10001,
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
                    </button>
                </div>
            ), document.body)}

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
        </div>
    );
}
