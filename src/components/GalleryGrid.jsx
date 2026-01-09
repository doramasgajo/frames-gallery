import '../styles/gallery_grid.css';

export default function GalleryGrid({ images, onImageClick }) {
    return (
        <div className="gallery-container">
            <div className="gallery-grid">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="gallery-item"
                        onClick={(e) => {
                            const rect = e.currentTarget.querySelector('img').getBoundingClientRect();
                            onImageClick(image, rect);
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className="gallery-image"
                            loading="lazy"
                        />
                        <div className="gallery-item-overlay">
                            <h3 className="item-title">{image.title}</h3>
                            <p className="item-game">{image.game}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
