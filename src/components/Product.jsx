import { useEffect, useState } from "react";
import "./products.css";
const url = "https://course-api.com/react-store-products";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState([]);
  const [slice, setSlice] = useState(2);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const Products = await response.json();
      setProducts(Products.slice(1, slice));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(url);
      const all = await response.json();
      setAll(all);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAllProducts();
  }, [slice]);
  return (
    <>
    <h1 className="pageTitle">Fetching Products with  -Load More- Button </h1>
    <div>
      <div className="container">
        {products?.map((item) => (
          <div className="card " key={item.id}>
            <div className="imageContainer">
              <img src={item.image} className="card-img-top" alt="..." />
            </div>{" "}
            <div className="card-body">
              <div className="text-section">
                <h2 className="card-title ">{item.name}</h2>
                <p className="card-text">
                  {item.description.substring(1, 250)}
                </p>
              </div>
              <div className="cta-section">
                <div className="price">${item.price}</div>
                <a href="#" className="btn">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          className="load"
          disabled={all.length <= slice}
          onClick={() => setSlice(slice + 2)}
        >
          {all.length > slice
            ? loading
              ? "loading ..."
              : "load More"
            : "no more to load"}
        </button>

      </div>
      </div>
      </>
  );
};

export default Product;
