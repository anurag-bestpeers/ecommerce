import { useEffect, useState } from "react";
import logo from "../../public/Photos/logo.png";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import api from "../Services/commonApi";
const Navbar = () => {
  let token = localStorage.getItem("token");
  const [cart, setCart] = useState();
  const [wishlist, setWishList] = useState();
  const [users, setUsers] = useState([]);

  const [username, setusername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const fetchUsers = async () => {
    await api("get", "http://localhost:3000/users").then((res) =>
      setUsers(res)
    );

    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }

    users.forEach((item) => {
      if (item.username == username && item.cart) {
        setCart(item.cart.length);
      }
    });

    users.forEach((item) => {
      if (item.username == username && item.wishlist) {
        setWishList(item.wishlist.length);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center gap-2">
            <img src={logo} width={50} height={50} alt="" />
            <Link
              className="navbar-brand fw-bold text-uppercase text-light"
              to={"/"}
            >
              LuxeMart
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {token ? (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex justify-content-center gap-3 align-items-center">
                <li className="nav-item me-3 d-flex align-items-center position-relative">
                  <Link to="/cart">
                    <BsCart3 className="text-light fs-2" />
                    <span
                      className="badge bg-light text-dark position-absolute"
                      style={{ top: "-0.5rem", right: "-0.5rem" }}
                    >
                      {cart}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/wishlist">
                    <IoIosHeart
                      style={{ fill: "red" }}
                      className="text-light fs-2"
                    />
                    <span
                      className="badge bg-light text-dark position-absolute"
                      style={{ top: "10px", right: "220px" }}
                    >
                      {wishlist}
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/product"}>
                    <button type="button" className="btn btn-outline-light m-2">
                      Products
                    </button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/"}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="btn btn-outline-light"
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <Link to={"/login"}>
                  <li className="nav-item">
                    <button type="button" className="btn btn-outline-light">
                      Login
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
