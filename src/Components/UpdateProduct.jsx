import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import api from "../Services/commonApi";

const UpdateProduct = () => {
  const { id } = useParams();
  const [prevData, setPrevData] = useState({});
  const navigate = useNavigate();
  const { getData } = useContext(ProductContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setPrevData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setPrevData({
        ...prevData,
        [name]: base64,
      });
    } else if (name === "image") {
      setPrevData({
        ...prevData,
        [name]: prevData.image,
      });
    } else if (name === "rate") {
      setPrevData({
        ...prevData,
        rating: {
          ...prevData.rating,
          rate: value,
        },
      });
    } else {
      setPrevData({
        ...prevData,
        [name]: value,
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api("put", `http://localhost:3000/products/${id}`, prevData);
    getData();
    navigate("/product");
  };

  return (
    <div className="addProductContainer">
      <form className="form_container" onSubmit={handleUpdate}>
        <div>
          <label> Title</label>
          <input
            type="text"
            name="title"
            value={prevData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label> Price</label>
          <input
            type="number"
            name="price"
            value={prevData.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label> Description</label>
          <textarea
            name="description"
            value={prevData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label> Category</label>
          <select
            name="category"
            value={prevData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        <div>
          <label> Rating</label>
          <input
            type="number"
            name="rate"
            value={prevData.rating ? prevData.rating.rate : ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image</label>
          {prevData.image && (
            <img
              style={{ width: "50px", height: "50px" }}
              src={prevData.image}
              alt="Product Preview"
            />
          )}
          <input name="image" type="file" onChange={handleChange} />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
