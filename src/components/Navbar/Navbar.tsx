import React from 'react';
import { NavbarLink } from '../Link/NavbarLink/NavbarLink';
import { NavbarLink as NavLink } from '../../enums/NavbarLink';

export const Navbar: React.FC = React.memo(
  () => {
    return (
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            {Object.entries(NavLink).map(([key, value]) => (
              <NavbarLink
                title={key}
                pathname={value}
              />
            ))}
          </div>
        </div>
      </nav>
    );
  },
);
