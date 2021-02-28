import React from 'react';

const Footer = (props) => {
  const { loggedIn } = props;
  return (
    loggedIn === true && (
      <footer className="footer">
        <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>
    )
  );
};
export default Footer;
