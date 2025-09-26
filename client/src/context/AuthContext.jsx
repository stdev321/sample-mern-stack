import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const updateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        age: userData.age,
        phone: userData.phone,
        address: userData.address,
        bio: userData.bio,
        occupation: userData.occupation
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 