import React, { useEffect, useState } from "react";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [newSignUp, setNewSignUp] = useState({
    username: "",
    password: "",
    cPassword: "",
    cart: [],
    wishlist: [],
  });
  const [userData, setUserData] = useState();
  const fetchData = async () => {
    const responseData = await api("get", "http://localhost:3000/users");
    setUserData(responseData);
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let trimValue = value.trim();

    setNewSignUp({
      ...newSignUp,
      [name]: trimValue,
    });

    if (name == "cPassword") {
      if (newSignUp[name] == newSignUp.password) {
        setErrors({
          ...errors,
          name: "",
        });
      }
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let arr = ["username", "password", "cPassword"];
    let msg = {};

    arr.forEach((item) => {
      if (newSignUp[item] == "") {
        msg[item] = `${item} is required`;
      } else if (newSignUp.cPassword != newSignUp.password) {
        msg["cPassword"] = `please match the password`;
      }
    });

    return msg;
  };

  const handleSignup = async () => {
    let validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    let userexistOrNot = userData.some(
      (item) => item.username == newSignUp.username
    );

    if (userexistOrNot) {
      toast.error("user already exist");
    } else {
      const obj = {
        username: newSignUp.username,
        password: newSignUp.password,
        cart: newSignUp.cart,
        wishlist: newSignUp.wishlist,
      };

      await api("post", "http://localhost:3000/users", obj);
      toast.success("success");
      setNewSignUp({
        username: "",
        password: "",
        cPassword: "",
        cart: [],
        wishlist: [],
      });
    }
  };

  return (
    <>
      <h2 className="signupHeading">User Signup Page</h2>
      <div className="signup-container">
        <div>
          <label>Enter Username</label>
          <input
            type="text"
            value={newSignUp.username}
            name="username"
            onChange={handleChange}
          />
          <p>{errors.username && errors.username}</p>
        </div>
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={newSignUp.password}
            name="password"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={newSignUp.cPassword}
            name="cPassword"
            onChange={handleChange}
          />
          <p>{errors.cPassword && errors.cPassword}</p>
        </div>

        <div>
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div>
          <span className="span">already have an account ?</span>{" "}
          <Link to={"/login"}>Log in</Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
