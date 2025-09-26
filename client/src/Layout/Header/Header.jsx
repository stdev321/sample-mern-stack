import { Avatar, Button, Dropdown, Space, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined, BulbOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import './Header.css';

const Header = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateUser();
    navigate("/login");
  };

  const items = [
    {
      label: (
        <NavLink className="nav-link" to="/profile">
          <h6><UserOutlined /> Profile</h6>
        </NavLink>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        // <div style={{ padding: '8px 12px' }}>
        //   <Space>
        //     <BulbOutlined />
        //     <span>Dark Mode</span>
        //     <Switch 
        //       checked={isDarkMode}
        //       onChange={toggleTheme}
        //       size="small"
        //     />
        //   </Space>
        // </div>
        <h6>Settings</h6>
      ),
      key: "1",
    },
    {
      label: (
        <Button onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </Button>
      ),
      key: "2",
    },
  ];

  return (
    <div className="container-fluid nav_bg">
      <div className="row">
        <div className="col-10 mx-auto">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                Web
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/Contact">
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="navbar-nav ms-auto mb-2 mb-lg-0 ps-5">
                {user ? (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Link className="nav-link" onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar
                          style={{
                            backgroundColor: "#ccc",
                            verticalAlign: "middle",
                          }}
                          size="large"
                        >
                          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </Avatar>
                      </Space>
                    </Link>
                  </Dropdown>
                ) : (
                  <Button type="primary" variant="outlined">
                    <NavLink className="navbar-button" to="/Signup">
                      Sign Up
                    </NavLink>
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
