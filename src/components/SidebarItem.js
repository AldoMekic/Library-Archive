import React from 'react';
import '../styles/SidebarItem.css';
import { Link } from 'react-router-dom';

const SidebarItem = ({ name, to }) => {
  return (
    <Link to={to} className="sidebar-item">
      {name}
    </Link>
  );
};

export default SidebarItem;