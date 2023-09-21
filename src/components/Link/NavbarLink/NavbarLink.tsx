import { useLocation, NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  title: string;
  pathname: string;
};

export const NavbarLink: React.FC<Props> = ({ title, pathname }) => {
  const { search } = useLocation();

  return (
    <NavLink
      to={{
        pathname,
        search,
      }}
      aria-current="page"
      className={({ isActive }) => classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )}
    >
      {title}
    </NavLink>
  );
};
