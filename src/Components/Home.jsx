import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import grocery from "../../public/Photos/grocery.jpg";
import dress from "../../public/Photos/dress.jpg";
import furniture from "../../public/Photos/furniture.jpg";
import gadget from "../../public/Photos/gadget.jpg";
function Home() {
  const [username, setusername] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, [username]);
  return (
    <>
      <div
        id="carouselExample"
        className="carousel slide relative"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        {username && (
          <h3
            style={{
              position: "absolute",
              zIndex: 99,
              left: "40%",
              top: "10px",
              color: "#4CAF50",
              fontSize: "24px",
              fontWeight: "bold",
              transition: "transform 0.3s ease, opacity 0.5s ease",
              opacity: 0,
              animation: "fadeIn 1s forwards",
              cursor: "pointer",
              color: "###",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            WELCOME {username.toUpperCase()}
          </h3>
        )}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={furniture}
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "586px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              src={grocery}
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "586px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src={dress}
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "586px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src={gadget}
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "586px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
