import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../Services/commonApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../RTK/productSlice";

const Products = () => {
  const [users, setUsers] = useState([]);
  const { products, getData } = useContext(ProductContext);
  const [username, setUsername] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const pro = useSelector((state) => state.product.products);
  // console.log(pro)

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api("get", "http://localhost:3000/users");
      setUsers(res);

      const foundUser = res.find((user) => user.username === username);
      if (foundUser) {
        setWishlist(foundUser.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  // useEffect(() => {
  //   getData();
  // }, []); //getData()depen..

  const handleCart = async (item) => {
    const foundUser = users.find((element) => element.username == username);
    const isDuplicate = foundUser.cart.some(
      (cartItem) => cartItem.id === item.id
    );
    if (isDuplicate) {
      toast.error("Item already in the cart");
      return;
    }
    try {
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        cart: [...foundUser.cart, item],
      });
      toast.success("Item added to the cart.");
    } catch (error) {
      console.error("Error updating the cart:", error);
    }
  };

  const handleWishlist = async (item) => {
    const foundUser = users.find((element) => element.username === username);

    if (!foundUser) {
      toast.error("User not found");
      return;
    }

    const isDuplicate = wishlist.some(
      (wishlistItem) => wishlistItem.id === item.id
    );

    try {
      let updatedWishlist;

      if (isDuplicate) {
        updatedWishlist = wishlist.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
        toast.info("Item removed from wishlist");
      } else {
        updatedWishlist = [...wishlist, item];
        toast.success("Item added to wishlist");
      }

      setWishlist(updatedWishlist);
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        wishlist: updatedWishlist,
      });
    } catch (error) {
      console.error("Error updating the wishlist:", error);
    }
  };

  return (
    <div className="product_container">
      {pro && pro.length > 0 ? (
        pro.map((item) => {
          const isInWishlist = wishlist.some(
            (wishlistItem) => wishlistItem.id === item.id
          );
          return (
            <div key={item.id} className="items">
              <Link to={`/detail/${item.id}`}>
                <img src={item.image} alt={item.imageAlt || "Product Image"} />
              </Link>
              <div className="innerItems">
                <h4>
                  {(item.title ? item.title.toUpperCase() : "Untitled").slice(
                    0,
                    40
                  ) + "..."}
                </h4>
                <div className="price_rating">
                  <p>Price - ${Math.round(item.price)}</p>
                  <p>Rating - {item.rating?.rate}</p>
                </div>

                <div className="wishlist">
                  <button
                    onClick={() => handleCart(item)}
                    className="detailBtn"
                  >
                    Add to cart
                  </button>
                  <FaHeart
                    className={`activeWishlist ${
                      isInWishlist ? "in-wishlist" : ""
                    }`}
                    onClick={() => handleWishlist(item)}
                    style={{
                      color: isInWishlist ? "red" : "grey",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
      {pro &&
        pro.map((item, index) => {
          return <h3>{index}</h3>;
        })}
    </div>
  );
};

export default Products;
