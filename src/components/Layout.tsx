import React from 'react';
import './Layout.css';
import { NavLink, Outlet } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Layout: React.FC = () => {
  return (
    <div className='container'>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')} 
              end
            >
              <StorefrontIcon/>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <ShoppingCartIcon/>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/favorite" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FavoriteIcon/>
              Favorite
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/help" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <HelpIcon/>
              Help
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Layout;
