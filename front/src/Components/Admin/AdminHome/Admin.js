import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div class="card2 card3 p-3">
      <div class="hello d-flex justify-content-end align-items-center mt-3">
        <span>Hi,Frank Jack</span>
      </div>
      <div class="d-flex flex-row justify-content-around flex-wrap">
        <div class="card cardchild mt-3  px-3 py-3">
          <div class="d-flex flex-column mt-2 justify-content-cener rounded">
            <span class="fw-bold">Your Exams</span>
            <span class="number">5</span>
          </div>
        </div>
        <div class="card cardchild mt-3 px-3 py-3">
          <div class="d-flex mt-2 justify-content-between rounded">
            <div class="d-flex flex-column">
              <span class="fw-bold">Active Exams</span>
              <span class="number">3</span>
            </div>
          </div>
        </div>
        <div class="card cardchild mt-3 px-3 py-3">
          <div class="d-flex mt-2 justify-content-between rounded">
            <div class="d-flex flex-column">
              <span class="fw-bold">Exams Finished</span>
              <span class="number">25</span>
            </div>
          </div>
        </div>
        <div class="card cardchild mt-3 px-3 py-3">
          <div class="d-flex mt-2 justify-content-between rounded">
            <div class="d-flex flex-column">
              <span class="fw-bold">Student passed</span>
              <span class="number">5</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card4 flex-row flex-wrap">
        <div className="mb-5">
          <div class="card cardchildchild">
            <div class="profile1">
              <img src="https://i.imgur.com/NI5b1NX.jpg" height="90" width="90" class="rounded-circle" />
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center mt-5">
              <span class="name">Bess Wills</span>
              <span class="mt-1 braceletid">Bracelet ID:SFG 38393</span>
              <span class="dummytext mt-3 p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Text elit more smtit.Kimto lee.
              </span>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-3">
              <button class="btn3">Next Appoinment</button>
            </div>
            <div class="icons d-flex flex-row justify-content-center gap-3 mt-4">
              <span>
                <i class="fa fa-google"></i>
              </span>
              <span>
                <i class="fa fa-facebook"></i>
              </span>
              <span>
                <i class="fa fa-twitter"></i>
              </span>
              <span>
                <i class="fa fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div class="card cardchildchild p-2">
            <div class="profile1">
              <img src="https://i.imgur.com/YyoCGsa.jpg" height="90" width="90" class="rounded-circle" />
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center mt-5">
              <span class="name">Bess Wills</span>
              <span class="mt-1 braceletid">Bracelet ID:SFG 38393</span>
              <span class="dummytext mt-3 p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Text elit more smtit.Kimto lee.
              </span>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-3">
              <button class="btn2">Next Appoinment</button>
            </div>
            <div class="icons d-flex flex-row justify-content-center gap-3 mt-4">
              <span>
                <i class="fa fa-google"></i>
              </span>
              <span>
                <i class="fa fa-facebook"></i>
              </span>
              <span>
                <i class="fa fa-twitter"></i>
              </span>
              <span>
                <i class="fa fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
