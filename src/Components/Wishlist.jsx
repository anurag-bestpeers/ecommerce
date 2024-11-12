import React, { useContext, useEffect, useState } from "react";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
const Wishlist = () => {
  const [username, setusername] = useState("");
  const [users, setUsers] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [users]);

  const fetchData = async () => {
    try {
      const res = await api("get", "http://localhost:3000/users");
      setUsers(res);

      users.forEach((item) => {
        if (item.wishlist.length >= 0 && item.username == username) {
          setUserWishlist(item.wishlist);
        }
      });
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  const handleDelete = async (id) => {
    const foundUser = users.find((element) => element.username === username);

    const filteredData = foundUser.wishlist.filter((item) => item.id != id);

    try {
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        wishlist: filteredData,
      });
      toast.error("Item removed from wishlist");
      setUserWishlist(filteredData);
    } catch (error) {
      console.error("Error updating the cart:", error);
    }
  };

  return (
    <div className="cart_container">
      <h2> Wishlist</h2>
      {userWishlist.length > 0 ? (
        <div className="cart_items">
          {userWishlist.map((item, index) => {
            return (
              <div key={index} className="item">
                <img src={item.image}/>
                <h3>{item.title.slice(0, 20)}</h3>
                <p>${item.price}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <hr />
          <p>No Items In The Wishlist</p>
          <hr />
        </>
      )}
    </div>
  );
};

export default Wishlist;
