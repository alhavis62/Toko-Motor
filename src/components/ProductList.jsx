import React, { useState } from "react";
import dataProduk from "../data_produk";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]); // State untuk Read More

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const tambahKeKeranjang = (produk) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(produk);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${produk.name} ditambahkan ke keranjang!`);
  };

  const toggleReadMore = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const filteredProduk = dataProduk.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout-container">
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigate('/produk')}>Beranda</li>
          <li onClick={() => navigate('/keranjang')}>Keranjang</li>
          <li
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.href = "/";
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      <div className="product-page">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {sidebarOpen ? "✖ Tutup Menu" : "☰ Menu"}
        </button>

        <h1 className="product-title">MOTOR INDONESIA EMAS</h1>

        <div className="button-container">
          <input
            type="text"
            placeholder="Cari produk..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="product-container">
          {filteredProduk.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="product-details">
                <h2>{item.name}</h2>
                <p>
                  {expandedIds.includes(item.id)
                    ? item.description
                    : item.description.slice(0, 100) + "..."}
                </p>
                <button
                  className="read-more-btn"
                  onClick={() => toggleReadMore(item.id)}
                >
                  {expandedIds.includes(item.id) ? "Tampilkan Lebih Sedikit" : "Read More"}
                </button>
              </div>
              <div>
                <button className="add-to-cart" onClick={() => tambahKeKeranjang(item)}>
                  Masukkan ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
