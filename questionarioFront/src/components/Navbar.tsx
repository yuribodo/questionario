import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedOut, SignInButton, SignUpButton, UserButton, SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

interface NavbarProps {
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { user } = useUser();

  useEffect(() => {
    const checkUserInDatabase = async (userId: string) => {
      try {
        const response = await axios.get(`/api/checkUser/${userId}`);
        if (response.data.exists) {
          console.log('User exists in database');
        } else {
          console.log('User does not exist in database');
        }
      } catch (error) {
        console.error('Error checking user in database:', error);
      }
    };

    if (user) {
      checkUserInDatabase(user.id);
    }
  }, [user]);

  const line1Variants = {
    open: { rotate: 45, y: 10 },
    closed: { rotate: 0, y: 0 },
  };

  const line2Variants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };

  const line3Variants = {
    open: { rotate: -45, y: -6 },
    closed: { rotate: 0, y: 0 },
  };

  return (
    <motion.div 
      className='h-[10vh] w-full bg-gray-800 shadow-lg top-0 left-0 z-10'
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between items-center h-full px-4 md:px-6'>
        <motion.div 
          className='flex items-center space-x-2 md:space-x-6 text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input 
            type="text" 
            className='p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-48' 
            placeholder="Buscar..." 
            onChange={onSearchChange}
          />
          <div className='hidden md:flex space-x-6'>
            <Link to="/" className='hover:text-blue-500 transition-colors'>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Início
              </motion.button>
            </Link>
            <Link to="/createquestionario" className='hover:text-blue-500 transition-colors'>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Criar questionário
              </motion.button>
            </Link>
            <Link to="/dashboard" className='hover:text-blue-500 transition-colors'>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Dashboard
              </motion.button>
            </Link>
            <Link to="/sobre" className='hover:text-blue-500 transition-colors'>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Sobre
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <div className='flex items-center'>
          <SignedOut>
            <div className='hidden md:flex space-x-4 p-4 text-white'>
              <SignInButton />
              <SignUpButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className='flex mr-2 text-white space-x-6'>
              { !isMobile && (
                <>
                  <SignOutButton />
                </>
              )}
              <UserButton />
            </div>
          </SignedIn>
          <div className='md:hidden flex items-center'>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <motion.div className="relative w-6 h-6">
                <motion.div 
                  className="absolute w-full h-0.5 bg-white"
                  variants={line1Variants}
                  initial="closed"
                  animate={menuOpen ? "open" : "closed"}
                />
                <motion.div 
                  className="absolute w-full h-0.5 bg-white mt-2"
                  variants={line2Variants}
                  initial="closed"
                  animate={menuOpen ? "open" : "closed"}
                />
                <motion.div 
                  className="absolute w-full h-0.5 bg-white mt-4"
                  variants={line3Variants}
                  initial="closed"
                  animate={menuOpen ? "open" : "closed"}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <motion.div 
          className='md:hidden bg-gray-800 text-white w-full absolute top-[10vh] left-0 z-40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className='block px-4 py-2 hover:text-blue-500 transition-colors'>
            Início
          </Link>
          <Link to="/createquestionario" className='block px-4 py-2 hover:text-blue-500 transition-colors'>
            Criar questionário
          </Link>
          <Link to="/dashboard" className='block px-4 py-2 hover:text-blue-500 transition-colors'>
            Dashboard
          </Link>
          <Link to="/sobre" className='block px-4 py-2 hover:text-blue-500 transition-colors'>
            Sobre
          </Link>
          <SignedOut>
            <div className='flex flex-col space-y-2 px-4 py-2'>
              <SignInButton />
              <SignUpButton />
            </div>
          </SignedOut>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
