import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email, phone } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
      phone,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === ""|| this.state.phone === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "", phone: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Chỉnh sửa liên hệ:</h2>
        <form className="ui form" onSubmit={this.update}>
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
          <button className="ui button black">Chỉnh sửa</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
