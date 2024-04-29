import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/Sidebar.css';
import SidebarItem from '../components/SidebarItem';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const links = [
    { name: 'Home', to: '/', id: 1 },
    { name: 'Login', to: '/login', id: 2 },
    { name: 'Register', to: '/register', id: 3 },
    { name: 'Profile', to: '/profile', id: 4 },
  ];

  const sideVariants = {
    closed: {
      x: '100%', // Start from the right edge
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    open: {
      x: 0, // Move to show the sidebar
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle if sidebar is visible and the click is outside the sidebar container
      if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar, toggleSidebar]);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.aside
          className="sidebar1"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sideVariants}
          ref={sidebarRef} // Apply the ref to the motion component
        >
          <div className="container">
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