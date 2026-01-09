import { useState, useEffect } from 'react';
import Header from '../components/Header';
import GalleryGrid from '../components/GalleryGrid';
import ImageModal from '../components/ImageModal';
import Footer from '../components/Footer';
import { images } from '../data/images';
import '../styles/home.css';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageRect, setSelectedImageRect] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const imageId = params.get('image');
        if (imageId) {
            const foundImage = images.find(img => img.id === parseInt(imageId));
            if (foundImage) {
                setSelectedImage(foundImage);
                setSelectedImageRect(null);
            }
        }
    }, []);

    const handleImageSelect = (image, rect) => {
        setSelectedImage(image);
        setSelectedImageRect(rect);
    };

    const handleClose = () => {
        setSelectedImage(null);
        setSelectedImageRect(null);
    };

    return (
        <div className="page">
            <Header />

            <GalleryGrid
                images={images}
                onImageClick={handleImageSelect}
            />

            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    initialRect={selectedImageRect}
                    onClose={handleClose}
                />
            )}

            <Footer />
        </div>
    );
}
