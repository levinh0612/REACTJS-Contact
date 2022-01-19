import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactDetail = (props) => {
  const { name, email,phone } = props.location.state.contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
          <div className="description">{phone}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button black center">
            Trở về danh bạ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
