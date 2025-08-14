import React from "react";
import "./BlackHeader.css";

function BlackHeader() {
  return (
    <header className="header-area">
      <div className="header-inner">
        <div className="button-area">
          <ul className="menu-list">
            <li>
              <a href="#" className="link">
                이웃블로그
              </a>
              <img
                src="https://blogimgs.pstatic.net/nblog/spc.gif"
                className="bar"
              ></img>
            </li>
            <li>
              <a
                href="https://section.blog.naver.com"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                블로그 홈
              </a>
              <img
                src="https://blogimgs.pstatic.net/nblog/spc.gif"
                className="bar"
              ></img>
            </li>
            <li>
              <a href="#" className="link">
                내 메뉴
              </a>
            </li>
          </ul>

          {/* <span style={{ marginRight: "20px" }}>내블로그</span>
        <span style={{ marginRight: "20px" }}>이웃블로그</span>
        <span style={{ marginRight: "20px" }}>블로그홈</span>
        <span style={{ marginLeft: "0px" }}>이혜빈</span> */}
        </div>
      </div>
    </header>
  );
}

export default BlackHeader;
