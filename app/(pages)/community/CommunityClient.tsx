/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChurchAlbum, Devotional, Banner, Bulletin } from "../../lib/notion";

export default function CommunityClient({ banners, albums, devotionals, bulletins = [] }: { banners: Banner[]; albums: ChurchAlbum[]; devotionals?: Devotional[]; bulletins?: Bulletin[] }) {
    const { lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<"bulletin" | "events" | "gallery" | "devotionals">("bulletin");

    // Modal state for Gallery Carousel
    const [viewingAlbum, setViewingAlbum] = useState<ChurchAlbum | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<ChurchAlbum | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Modal state for Devotionals
    const [viewingDevotional, setViewingDevotional] = useState<Devotional | null>(null);
    const [devotionalContent, setDevotionalContent] = useState<string | null>(null);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Modal state for Events
    const [viewingEvent, setViewingEvent] = useState<Banner | null>(null);

    // Carousel State for Top 3 Banners
    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitionStyle, setTransitionStyle] = useState({ clipPath: 'circle(150% at 50% 50%)', transform: 'scale(1)', filter: 'blur(0px)' });
    const topBanners = banners.slice(0, 3);
    const totalSlides = topBanners.length;

    const effects = [
        { clipPath: 'circle(0% at 50% 50%)', transform: 'scale(1.1)', filter: 'blur(5px)' },
        { clipPath: 'inset(0 100% 0 0)', transform: 'scale(1)', filter: 'blur(0px)' },
        { clipPath: 'inset(0 0 0 100%)', transform: 'scale(1)', filter: 'blur(0px)' },
        { clipPath: 'inset(0 0 100% 0)', transform: 'scale(0.9)', filter: 'blur(10px)' },
        { clipPath: 'inset(100% 0 0 0)', transform: 'scale(1)', filter: 'blur(0px)' },
        { clipPath: 'inset(0 0 0 0)', transform: 'scale(1.2)', filter: 'blur(15px)' }
    ];

    const pickRandomEffect = () => {
        setTransitionStyle(effects[Math.floor(Math.random() * effects.length)]);
    };

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            if (tabParam === 'bulletin' || tabParam === 'events' || tabParam === 'gallery' || tabParam === 'devotionals') {
                setActiveTab(tabParam as "bulletin" | "events" | "gallery" | "devotionals");
            }
        }
    }, []);

    useEffect(() => {
        if (totalSlides <= 1) return;
        const interval = setInterval(() => {
            pickRandomEffect();
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 8000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToPrevSlide = () => {
        pickRandomEffect();
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNextSlide = () => {
        pickRandomEffect();
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

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
        <div style={{ paddingTop: 0 }}>
            {/* Page Header Removed as requested */}

            <section className="container">
                {/* Top Carousel for Advertisements */}
                {topBanners.length > 0 && (
                    <div className="news-carousel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', marginBottom: 'var(--space-3xl)' }}>
                        <div className="carousel-container">
                            {topBanners.map((banner, index) => (
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
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            ))}
                        </div>
                        {totalSlides > 1 && (
                            <>
                                <button className="carousel-nav carousel-prev" onClick={goToPrevSlide} aria-label="Previous slide">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="carousel-nav carousel-next" onClick={goToNextSlide} aria-label="Next slide">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                                <div className="carousel-indicators">
                                    {topBanners.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`indicator ${index === currentSlide ? "active" : ""}`}
                                            onClick={() => { pickRandomEffect(); setCurrentSlide(index); }}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-3xl)' }}>
                    <button 
                        onClick={() => setActiveTab("bulletin")}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'var(--font-weight-medium)',
                            background: activeTab === "bulletin" ? 'var(--color-accent)' : 'var(--color-secondary)',
                            color: activeTab === "bulletin" ? 'white' : 'var(--color-text-primary)',
                            boxShadow: activeTab === "bulletin" ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {lang === 'en' ? 'Bulletin' : '주보'}
                    </button>
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
                {activeTab === "bulletin" && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {bulletins && bulletins.length > 0 ? bulletins.map((bulletin) => (
                            <a key={bulletin.id} href={bulletin.fileUrl} target="_blank" rel="noopener noreferrer" 
                                className="scroll-fade"
                                style={{ 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', 
                                    padding: '20px 16px', backgroundColor: 'var(--color-secondary)', 
                                    borderRadius: '12px', textDecoration: 'none', color: 'var(--color-text-primary)',
                                    transition: 'transform 0.2s, background-color 0.2s',
                                    border: '1px solid var(--color-border)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = 'var(--color-border)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                                    {bulletin.date}
                                </div>
                            </a>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-light)' }}>
                                {lang === 'en' ? 'No bulletins available at the moment.' : '등록된 주보가 없습니다.'}
                            </div>
                        )}
                    </div>
                )}

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
                    <div className="events-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
                        {banners.length > 0 ? banners.map((banner) => (
                            <div key={banner.id} className="event-list-item scroll-fade" onClick={() => setViewingEvent(banner)}>
                                <div className="event-list-date">
                                    <div className="event-date-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </div>
                                    <span className="event-date-text">{banner.date || (lang === 'en' ? 'Upcoming' : '예정된 행사')}</span>
                                </div>
                                <div className="event-list-content">
                                    <h3 className="event-list-title">{banner.title}</h3>
                                </div>
                                <div className="event-list-arrow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-light)' }}>
                                {lang === 'en' ? 'No events available at the moment.' : '등록된 행사가 없습니다.'}
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

            {/* Event Details Popup */}
            {mounted && viewingEvent && createPortal((
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    {/* Backdrop */}
                    <div 
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }} 
                        onClick={() => setViewingEvent(null)}
                    />

                    {/* Popup Box */}
                    <div 
                        style={{ 
                            position: 'relative', 
                            width: '100%', 
                            maxWidth: '600px', 
                            maxHeight: '85vh', 
                            backgroundColor: 'white', 
                            borderRadius: '20px', 
                            boxShadow: '0 10px 40px rgba(0,0,0,0.2)', 
                            display: 'flex', 
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-secondary)' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {lang === 'en' ? 'Event Details' : '행사 상세 안내'}
                            </h3>
                            <button 
                                onClick={() => setViewingEvent(null)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                        </div>

                        {/* Content Scroll Area */}
                        <div style={{ padding: '24px', overflowY: 'auto', overscrollBehavior: 'contain' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                                {viewingEvent.title}
                            </h2>
                            <div style={{ fontSize: '1rem', color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '24px' }}>
                                {viewingEvent.date ? viewingEvent.date : ''}
                            </div>

                            {viewingEvent.imageUrl && (
                                <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                                    <img src={viewingEvent.imageUrl} alt={viewingEvent.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                </div>
                            )}

                            {viewingEvent.description ? (
                                <div className="prose" style={{ lineHeight: '1.6', fontSize: '1.05rem', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap' }}>
                                    {viewingEvent.description}
                                </div>
                            ) : (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-light)', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                                    {lang === 'en' ? 'No additional details provided.' : '상세 내용이 없습니다.'}
                                </div>
                            )}
                        </div>
                    </div>
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
