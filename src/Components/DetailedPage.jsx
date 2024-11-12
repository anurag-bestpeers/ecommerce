import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/commonApi";

const DetailedPage = () => {
  const { id } = useParams();

  const [singleData, setSingleData] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      await api("get", `http://localhost:3000/products/${id}`).then((res) =>
        setSingleData(res)
      );
    };

    fetchProduct();
  }, []);

  return (
    <div className="detail_container">
      {singleData && (
        <div className="detailitem1">
          <div className="innerItems1">
            <img
              src={singleData.image && singleData.image}
              width={100}
              alt="Product"
            />
          </div>
          <div className="innerItems2">
            <h4>{singleData.title.toUpperCase().slice(0, 20)}</h4>
            <p>{singleData.description.slice(0, 300) + "..."}</p>
            <div className="price_rating">
              <p>Price - ${Math.round(singleData.price)}</p>
              <p>Rating - {singleData.rating.rate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedPage;
