import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/Sidebar.css';
import SidebarItem from '../components/SidebarItem';

const Sidebar = ({ showSidebar }) => {
  const links = [
    { name: 'Home', to: '/', id: 1 },
    { name: 'Login', to: '/login', id: 2 },
    { name: 'Register', to: '/register', id: 3 },
    { name: 'Profile', to: '/profile', id: 4 },
  ];

  const sideVariants = {
    closed: {
      width: 0,
      transition: {
        delay: 0.7,
        duration: 0.3,
      },
    },
    open: {
      width: 300,
      transition: {
        delay: 0.7,
        duration: 0.3,
      },
    },
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && !event.target.closest('.sidebar1')) {
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.aside
          className="sidebar1"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sideVariants}
        >
          <div className="container" ref={sidebarRef}>
            {links.map(({ name, to, id }) => (
              <SidebarItem key={id} name={name} to={to} />
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;