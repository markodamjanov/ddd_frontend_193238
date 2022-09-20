import { Link } from "react-router-dom";
import NavbarCss from "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#52849A" }}>
      <div
        className="container d-flex justify-content-between"
        style={{ height: "80px" }}
      >
        <div className="d-flex align-items-center">
          <div>
            <Link
              className="navbar-brand fw-bold text-white text"
              style={{
                fontSize: "1.7rem",
                padding: "30px 30px",
              }}
              to="/"
            >
              Smartphone Part Shop
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link text-white text"
                  style={{ fontSize: "1.2rem", padding: "34px 30px" }}
                  to="/parts"
                >
                  Parts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white text"
                  style={{ fontSize: "1.2rem", padding: "34px 30px" }}
                  to="/orders"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-white text"
                style={{ fontSize: "1.3rem", padding: "32px 30px" }}
                to="/cart"
              >
                Cart{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
