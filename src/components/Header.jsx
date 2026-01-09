import { useEffect, useState } from 'react';
import '../styles/header.css';

export default function Header() {
    const [scale, setScale] = useState(1);
    const [blur, setBlur] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition < windowHeight) {
                const newScale = 1 + (scrollPosition * 0.0005);
                setScale(newScale);
                const scrollPercentage = scrollPosition / windowHeight;
                setBlur(scrollPercentage * 20);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header">
            <div
                className="header-bg"
                style={{
                    transform: `scale(${scale})`,
                    filter: `blur(${blur}px)`
                }}
            ></div>
            <div className="header-content">
                <h1 className="main-title">The Frames Gallery</h1>
                <p className="subtitle">A collection of gaming memories, preserving the moments that make every playthrough unforgettable and full of life.</p>
            </div>
        </header>
    );
}
