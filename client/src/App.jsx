import React from "react";
import "./App.css";
import Signup from "./Component/Signup";
import Header from "./Layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Contact from "./Component/Contact/Contact";
import Service from "./Component/Service/Service";
import About from "./Component/About/About";
import Login from "./Component/Login/Login";
import { AuthProvider } from './context/AuthContext';
import Profile from './Component/Profile/Profile';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from 'antd';

const { Content } = Layout;

const ThemedApp = () => {

  return (
      <Layout className="site-layout">
        <Header />
        <Content className="content-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>
      </Layout>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ThemedApp />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
