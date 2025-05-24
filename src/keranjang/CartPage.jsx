import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const hapusItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className="cart-page">
      <h1 className="judul">Isi Keranjang</h1>
      <button className="btn-back" onClick={() => navigate("/produk")}>
        Kembali ke Beranda
      </button>

      {cartItems.length === 0 ? (
  <p className="kosong">Keranjang kosong.</p>
) : (
  <>
    <div className="card-container">
      {cartItems.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.image} alt={item.name} className="card-image" />
          <div className="card-details">
            <h2>{item.name}</h2>
            <p>Harga: Rp {Number(item.price || 7000000).toLocaleString()}</p>
            <button
              className="btn-hapus"
              onClick={() => {
                const yakin = window.confirm("Yakin Pengen di Hapus?");
                if (yakin) hapusItem(index);
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="cart-summary">
      <h3>
        Total: Rp{" "}
        {cartItems
          .reduce((total, item) => total + Number(item.price || 7000000), 0)
          .toLocaleString()}
      </h3>
      <button className="btn-checkout" onClick={() => alert("Checkout berhasil!")}>
        Checkout
      </button>
    </div>
  </>
)}

    </div>
  );
};

export default CartPage;
