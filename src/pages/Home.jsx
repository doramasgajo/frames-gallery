import '../styles/home.css';

function Home() {
    return (
        <div className="page">
            <header className="header">
                <div className="content-wrapper">
                    <h1 className="main-title">The Frames Gallery</h1>
                    <div className="accent-line"></div>
                    <p className="text">
                        A media gallery for hosting videogames
                        screen shots and video captures.
                    </p>
                    <div className="status-container">
                        <span className="text">
                            Building
                            <span className="loading-dots"></span>
                        </span>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Home;
