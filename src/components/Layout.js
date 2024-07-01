'use client'
import Nav from "./Nav";

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Layout({children}) {
    const { data: session, status } = useSession();
  
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (!session) {
      return (
        <div className='bg-blue-900 w-screen h-screen flex items-center'>
          <div className='text-center w-full'>
            <button onClick={() => signIn('google')} className='bg-white text-black px-4 py-2 rounded'>
              Login with Google
            </button>
          </div>
        </div>
      );
    }
  
    return (
        <div className='bg-blue-900 min-h-screen flex'>
          <Nav/>
          <div className='bg-white flex-grow mt-2 mr-2 rounded-lg p-4 text-black mb-2'>
         {children}
          </div>
  
        </div>
      // </div>
    );
  }
  