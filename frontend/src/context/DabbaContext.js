import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DabbaContext = createContext();

export const DabbaProvider = ({ children }) => {

   const [isLoggedInD, setIsLoggedInD] = useState(false);
   const [dabbaa, setDabbaa] = useState({});

   const checkDabbaLoggedIn = async () => {
      try {
         // This includes cookies in the request
         const response = await axios.get('http://localhost:8800/api/auth2/dabbawala', {
            withCredentials: true,
            credentials: "include",
         });

         console.log(response.data);
         if (response.data.status) {
            setIsLoggedInD(true);
            setDabbaa(response.data.user);
            console.log(response.data.user);

         }
         else {
            setIsLoggedInD(false);
            setDabbaa({});

         }
      } catch (error) {
         console.error('Error checking user login status:', error);
      }
   };


   const handleLogout2 = async () => {
      try {
         const response = await axios.get('http://localhost:8800/api/auth2/logout', {
            withCredentials: true,
            credentials: "include",
         });
         console.log(response.data);
         setIsLoggedInD(false);
         setDabbaa({});

         console.log(dabbaa, "user delted");

      } catch (error) {
         console.error('Error during logout:', error);
      }
   };


   useEffect(() => {
      checkDabbaLoggedIn();
   }, []);

   return (
      <DabbaContext.Provider value={{ isLoggedInD, dabbaa, setDabbaa, checkDabbaLoggedIn, handleLogout2 }}>
         {children}
      </DabbaContext.Provider>
   );
};
