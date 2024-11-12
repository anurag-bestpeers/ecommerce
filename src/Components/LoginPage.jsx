import React, { useContext, useEffect, useState } from "react";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
const LoginPage = () => {
  const { newLogin, setNewLogin } = useContext(ProductContext);

  const [userData, setUserData] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const createRandomString = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let trimValue = value.trim();
    setNewLogin({
      ...newLogin,
      [name]: trimValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let arr = ["username", "password"];
    let msg = {};

    arr.forEach((item) => {
      if (newLogin[item] == "") {
        msg[item] = `${item} is required`;
      }
    });

    return msg;
  };

  const handleLogin = () => {
    let validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    let loginSuccessful = false;
    userData.forEach((element) => {
      if (
        element.username == newLogin.username &&
        element.password == newLogin.password
      ) {
        loginSuccessful = true;
      }
    });

    if (loginSuccessful) {
      const randomString = createRandomString();
      localStorage.setItem("token", randomString);
      localStorage.setItem("username", newLogin.username);
      navigate("/");

      
      setNewLogin({
        username: "",
        password: "",
      });
    } else {
      toast.error("invalid Credentials");
    }
  };

  const fetchData = async () => {
    const responseData = await api("get", "http://localhost:3000/users");
    setUserData(responseData);
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <>
      <h2 className="loginHeading">User Login Page</h2>
      <div className="login-container">
        <div>
          <label>Enter Username</label>
          <input
            type="text"
            value={newLogin.username}
            name="username"
            onChange={handleChange}
          />
          <p>{errors.username && errors.username}</p>
        </div>
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={newLogin.password}
            name="password"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <span className="span">Don't have any account ?</span>{" "}
          <Link to={"/signup"}>Sign in</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
