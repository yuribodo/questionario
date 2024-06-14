import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { motion } from 'framer-motion';


interface NavbarProps {
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div 
      className='h-[10vh] w-full bg-gray-800 shadow-lg fixed top-0 left-0 z-50'
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
                Criar questionario
              </motion.button>
            </Link>
            <Link to="/createproject" className='hover:text-blue-500 transition-colors'>
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
          <div className='md:hidden flex items-center'>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
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
          <Link to="/createquestionario" className='block px-4 py-2 hover:text-blue-500 transition-colors'>
            Criar questionairo
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