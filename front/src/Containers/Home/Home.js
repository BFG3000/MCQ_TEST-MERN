import "./Home.css";
import React from "react";

const Home = () => {
  return (
    <div className="row align-items-center text-white banner">
      <div className="left col-md-6">
        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
        <p className="lh-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque amet
          mollitia unde fugiat ratione porro quos eos odio autem repellendus
          dignissimos reiciendis, dolor blanditiis quo incidunt, doloribus,
          earum odit! Id.
        </p>
      </div>
      <div className="right col-md-6 text-end">
        <div className="imgContainer">
          <img
            src="/pic.png"
            alt="exam illustration"    
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
