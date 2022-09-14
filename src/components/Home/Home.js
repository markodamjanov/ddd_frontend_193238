import { Link } from "react-router-dom";
import HomeCss from "./Home.css";

const Home = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        width: "100%",
        minHeight: "86.7vh",
        backgroundImage:
          "url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=2000')",
        backgroundSize: "cover",
        color: "black",
      }}
    >
      <div
        className="row justify-content-around"
        style={{ width: "100%", height: "auto" }}
      >
        <div className="col-md-5">
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Welcome to Smartphone Part Shop
          </h1>
          <p>
            We offer you the largest stock with lowest prices of original phone
            parts for smartphones.
          </p>
          <h3 className="mt-4 start">
            <Link className="nav-link " to="/parts">
              Start shopping
            </Link>
          </h3>
        </div>
        <div className="col-md-4">
          <img
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            src="https://img.myloview.com/stickers/a-mobile-phone-repair-service-or-perhaps-plumber-or-mechanic-app-cartoon-character-mascot-holding-spanner-and-giving-a-thumbs-up-700-205435717.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
