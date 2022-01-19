import React, { useState, useEffect } from "react";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //Truy xuất danh bạ
  const retrieveContacts = async () => {
    const response = await api.get("/contacts"); // api có nghĩa là url của server- api
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(), // random id
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
    window.alert(`Thêm thành công liên hệ [ ${response.data.name} ]`);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(response);
    const { id, name } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
        // callback lại list, nếu có id của contact nào giống thì thay contact đó = data của reponse, Còn k thì giữ nguyên
      })
    );
    window.alert(`Cập nhật thành công liên hệ [ ${name} ]`);
  };


  const removeContactHandler = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này không ?")) {
      const oldContact = contacts.find((contact) => contact.id === id);
      window.alert(`Xóa thành công liên hệ [ ${oldContact.name} ]`);

      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => { // Lọc chạy 1 contact trong list contacts
        return Object.values(contact)
          .join(" ")
          .toLowerCase() // ép các thuộc tính trong 1 contact thành object, chuyển về chuỗi lower.
          .includes(searchTerm.toLowerCase());// Sau đó so tìm các từ khóa tìm kiếm đã lower trong kết quả ở trên vùa mới lower
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
//  Effect sau khi mounted
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  // useEffect(() => {
  //   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header/>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults} // Nếu k có keyword nào thì trả về list contact còn k thì trả về kết quả tìm.
                getContactId= {  removeContactHandler }
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
