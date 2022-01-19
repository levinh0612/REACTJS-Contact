import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "" || this.state.phone === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "", phone: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Thêm liên hệ mới: </h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Tên</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
            />
          </div>
          <button className="ui button blue">Thêm</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
