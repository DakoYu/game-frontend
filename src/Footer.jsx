import './Footer.css';

const Footer = () => {
    return (
        <footer >
            <h1>Gamers.com</h1>
            <div className='social'>
                <ul>
                    <li><i className="uil uil-facebook"></i></li>
                    <li><i className="uil uil-instagram-alt"></i></li>
                    <li><i className="uil uil-twitter"></i></li>
                    <li><i className="uil uil-youtube"></i></li>
                </ul>
            </div>
            <div className='rules'>
                <ul>
                    <li>License</li>
                    <li>Rules & Policies</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;