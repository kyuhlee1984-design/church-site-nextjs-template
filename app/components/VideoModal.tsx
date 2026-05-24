"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useModalBackButton } from "../hooks/useModalBackButton";

function getYoutubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    const liveMatch = url.match(/youtube\.com\/live\/([^?&#]+)/);
    if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}?autoplay=1&rel=0`;
    const watchMatch = url.match(/[?&]v=([^&#]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
    const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
    return null;
}

interface VideoModalProps {
    url: string | null;
    title?: string;
    onClose: () => void;
}

export default function VideoModal({ url, title, onClose }: VideoModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(onClose, 250);
    }, [onClose]);

    // Handle mobile back button
    useModalBackButton(!!url, handleClose);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (url) {
            // Small delay for the CSS transition
            requestAnimationFrame(() => setIsVisible(true));
            // Prevent body scroll
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [url]);


    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleClose]);

    if (!mounted || !url) return null;

    const embedUrl = getYoutubeEmbedUrl(url);
    if (!embedUrl) return null;

    const modalContent = (
        <div
            onClick={handleClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isVisible ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0)",
                backdropFilter: isVisible ? "blur(8px)" : "none",
                transition: "all 0.25s ease",
                cursor: "pointer",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    width: "min(90vw, 960px)",
                    maxHeight: "90vh",
                    transform: isVisible ? "scale(1)" : "scale(0.85)",
                    opacity: isVisible ? 1 : 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "default",
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: "absolute",
                        top: "-44px",
                        right: "0",
                        background: "rgba(255,255,255,0.15)",
                        border: "none",
                        color: "white",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        backdropFilter: "blur(4px)",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Title */}
                {title && (
                    <div style={{ color: "white", marginBottom: "12px", fontSize: "1.1rem", fontWeight: 600 }}>
                        {title}
                    </div>
                )}

                {/* Video */}
                <div style={{
                    position: "relative",
                    paddingBottom: "56.25%", /* 16:9 */
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                }}>
                    <iframe
                        src={embedUrl}
                        title={title || "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
