import React from "react";
import "./style.css";
import "bulma/css/bulma.css";
import logo from "../../assets/img/logo.png";
import ButtonCard from "../../components/ButtonCard";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="has-text-centered">
        <img src={logo} alt="You Pay Logo"></img>
      </div>
      <div className="buttons has-text-centered d-block">
        <Link to="/signup">
          <ButtonCard
            name="Register"
            image="https://www.flaticon.com/svg/static/icons/svg/901/901423.svg"
          />
        </Link>
        <Link to="/transfer">
          <ButtonCard
            name="Transfer"
            image="https://www.flaticon.com/svg/static/icons/svg/901/901404.svg"
          />
        </Link>
        <Link to="/view">
          <ButtonCard
            name="History"
            image="https://www.flaticon.com/svg/static/icons/svg/902/902838.svg"
          />
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
