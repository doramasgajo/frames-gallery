import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                All images are released into the <strong>public domain</strong> under the&nbsp;
                <em><a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a></em>
                &nbsp;license. They can be used for any purpose, with&nbsp;
                <strong>no attribution required</strong>.
            </p>
            <div className="footer-links">
                <a href="https://github.com/doramasgajo/frames-gallery" target="_blank" rel="noopener noreferrer">Repository</a>
                <a href="https://github.com/doramasgajo" target="_blank" rel="noopener noreferrer">Author</a>
                <a href="mailto:contact@doramasgajo.com">Contact</a>
            </div>
        </footer>
    );
}
