import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import me from "../images/levinh.jpg";

const ContactList = (props) => {
  const inputEl = useRef("");
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  return (
    <div className="main">
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Tìm kiếm..."
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <h2> Thẻ của tôi</h2>

      <div className="me">
        <img className="img-me" src={me} alt="me" />
        <div className="content">
          <div style={ {color: "black", fontWeight: "bold" } }>Lê Vinh</div>
          <div style={{ color: "blue" }}>nguyenhuulevinh@gmail.com</div>
          <div  style={{ color: "blue" }}>0396556760</div>

        </div>
      </div>

      <h2>
        Danh bạ
        <Link to="/add">
          <button className="ui button black right">Liên hệ mới</button>
        </Link>
      </h2>

      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
