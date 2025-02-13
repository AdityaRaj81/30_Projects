import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="datetime">
          <p>Date: {format(currentTime, 'MMMM dd, yyyy')}</p>
          <p>Time: {format(currentTime, 'HH:mm:ss')}</p>
        </div>
        <div className="social-links">
          <a href="https://github.com/AdityaRaj81" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/AdityaRaj81" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://twitter.com/AdityaRaj_81" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instragram.com/AdityaRaj_81" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://facebook.com/AdityaRaj812" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
        <div className="footer-info">
          <p>Code brewed with ❤️ by Aditya</p>
          <p>© 2024 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;