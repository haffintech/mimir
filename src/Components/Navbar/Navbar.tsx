import React from 'react';
import classNames from 'classnames';
import { useState } from 'react';

import { ReactComponent as Logo } from '../../assets/images/mimir.svg';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

import './Navbar.scss';

type props = {
  content: {
    home: string;
    about: string;
    contact: string;
    logout: string;
  };
};

const Navbar = (props: props) => {
  const [isNavbarContainerActive, setIsNavbarContainerActive] = useState<Boolean>(false);

  const navContainerClass = classNames({
    'navbar__nav-container': true,
    'navbar__nav-container--active': isNavbarContainerActive,
  });

  const toggleMobileNav = () => {
    setIsNavbarContainerActive(!isNavbarContainerActive);
  };

  return (
    <div className='navbar'>
      <Menu className='navbar__menu' onClick={toggleMobileNav} />
      <Logo className='navbar__logo' />
      <div className={navContainerClass}>
        <div className='navbar__mobile-active-header'>
          <Logo className='navbar__logo' />
          <Close className='navbar__close' onClick={toggleMobileNav} />
        </div>
        <ul className='navbar__nav'>
          <li className='navbar__nav-item'>{props.content.home}</li>
          <li className='navbar__nav-item'>{props.content.about}</li>
          <li className='navbar__nav-item'>{props.content.contact}</li>
          <li className='navbar__nav-item'>
            <button className='navbar__logout'>{props.content.logout}</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
