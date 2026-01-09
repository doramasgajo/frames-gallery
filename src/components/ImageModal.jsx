import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../styles/image_modal.css';

export default function ImageModal({ image, initialRect, onClose }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const imageContainerRef = useRef(null);
    const imgRef = useRef(null);
    const [transformOrigin, setTransformOrigin] = useState("center center");

    const [isAnimating, setIsAnimating] = useState(!!initialRect);
    const [animStyle, setAnimStyle] = useState(null);

    useLayoutEffect(() => {
        if (initialRect && imgRef.current) {
            setAnimStyle({
                position: 'fixed',
                top: initialRect.top,
                left: initialRect.left,
                width: initialRect.width,
                height: initialRect.height,
                objectFit: 'cover',
                zIndex: 1001,
                transition: 'all 0s',
                borderRadius: '12px',
            });

            requestAnimationFrame(() => {
                if (imgRef.current) {
                    const finalRect = imgRef.current.getBoundingClientRect();
                    setAnimStyle({
                        position: 'fixed',
                        top: finalRect.top,
                        left: finalRect.left,
                        width: finalRect.width,
                        height: finalRect.height,
                        objectFit: 'contain',
                        zIndex: 1001,
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        borderRadius: '16px 0 0 16px',
                    });

                    setTimeout(() => {
                        setIsAnimating(false);
                        setAnimStyle(null);
                    }, 400);
                }
            });
        }
    }, [initialRect]);

    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const originalPaddingRight = document.body.style.paddingRight;
        const originalOverflow = document.body.style.overflow;

        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.paddingRight = originalPaddingRight;
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleImageClick = (e) => {
        if (!isZoomed) {
            updateTransformOrigin(e);
        }
        setIsZoomed(!isZoomed);
    };

    const handleMouseMove = (e) => {
        if (isZoomed) {
            updateTransformOrigin(e);
        }
    };

    const updateTransformOrigin = (e) => {
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(image.url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `TheFrames_${image.title.replace(/\s+/g, '_')}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(image.url, '_blank');
        }
    };

    const handleCopyLink = () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}?image=${image.id}`;
        navigator.clipboard.writeText(shareUrl);
        // TODO: show a toast here
    };

    const handleOpenFullscreen = () => {
        window.open(image.url, '_blank');
    };

    if (!image) return null;

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            style={{
                animation: 'fadeIn 0.3s ease'
            }}
        >
            {isAnimating && animStyle && (
                <img
                    src={image.url}
                    alt="transition"
                    style={animStyle}
                />
            )}

            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: isAnimating ? 'transparent' : undefined,
                    boxShadow: isAnimating ? 'none' : undefined,
                    borderColor: isAnimating ? 'transparent' : undefined,
                    transition: 'background-color 0.3s ease 0.1s, box-shadow 0.3s ease 0.1s, border-color 0.3s ease 0.1s'
                }}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                    style={{
                        opacity: isAnimating ? 0 : 1,
                        transition: 'opacity 0.3s ease 0.2s'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div
                    className={`modal-image-container ${isZoomed ? 'zoomed' : ''}`}
                    ref={imageContainerRef}
                    onClick={handleImageClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isZoomed && setIsZoomed(false)}
                >
                    <img
                        ref={imgRef}
                        src={image.url}
                        alt={image.title}
                        className="modal-image"
                        style={{
                            transformOrigin: transformOrigin,
                            transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                            opacity: isAnimating ? 0 : 1
                        }}
                    />
                </div>

                <div
                    className="modal-info"
                    style={{
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
                        transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s'
                    }}
                >
                    <div className="info-header">
                        <h2 className="info-title">{image.title}</h2>
                        <div className="info-game">{image.game}</div>
                        <div className="info-date">{image.date}</div>
                    </div>

                    <p className="info-description">
                        {image.description}
                    </p>

                    {image.tagged && image.tagged.length > 0 && (
                        <div className="tagged-section">
                            <div className="tagged-label">Tagged People</div>
                            <div className="tags">
                                {image.tagged.map((tag, index) => {
                                    const isObject = typeof tag === 'object';
                                    const label = isObject ? tag.name : tag;
                                    const url = isObject ? tag.url : null;

                                    if (url) {
                                        return (
                                            <a
                                                key={index}
                                                href={url}
                                                className="tag"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {label}
                                            </a>
                                        );
                                    }
                                    return <span key={index} className="tag">{label}</span>;
                                })}
                            </div>
                        </div>
                    )}

                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleDownload}>
                            Download Image
                        </button>
                        <button className="btn btn-secondary" onClick={handleCopyLink}>
                            Copy Link
                        </button>
                        <button className="btn btn-secondary" onClick={handleOpenFullscreen}>
                            Open Fullscreen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
