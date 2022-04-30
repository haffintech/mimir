import React from 'react';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/images/mimir.svg';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

import './Navbar.scss';
import useViewportResize from '../../utils/hooks/useViewportResize';
import { breakpoints } from '../../utils/misc/breakpoints';

type props = {
  content: {
    home: string;
    about: string;
    contact: string;
    upcomingSessions: string;
  };
  links: {
    home: string;
    about: string;
    contact: string;
    upcomingSessions: string;
  };
};

const Navbar = ({ content, links }: props) => {
  const [isNavbarContainerActive, setIsNavbarContainerActive] = useState<Boolean>(false);

  const navContainerClass = classNames({
    'navbar__nav-container': true,
    'navbar__nav-container--active': isNavbarContainerActive,
  });

  const toggleMobileNav = () => {
    setIsNavbarContainerActive(!isNavbarContainerActive);
  };

  const { width } = useViewportResize();
  const isMobile = width < breakpoints.md;

  return (
    <div className='navbar'>
      <Menu className='navbar__menu' onClick={toggleMobileNav} />
      <Logo className='navbar__logo' />
      <div className={navContainerClass}>
        <div className='navbar__mobile-active-header'>
          <Logo className='navbar__logo' />
          <Close className='navbar__close' onClick={toggleMobileNav} />
        </div>
        <nav className='navbar__nav'>
          <Link to={links.home} className='navbar__nav-item' onClick={toggleMobileNav}>
            {content.home}
          </Link>
          {isMobile && (
            <Link
              to={links.upcomingSessions}
              className='navbar__nav-item'
              onClick={toggleMobileNav}
            >
              {content.upcomingSessions}
            </Link>
          )}
          <Link to={links.about} className='navbar__nav-item' onClick={toggleMobileNav}>
            {content.about}
          </Link>
          <Link to={links.contact} className='navbar__nav-item' onClick={toggleMobileNav}>
            {content.contact}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
