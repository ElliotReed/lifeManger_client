import { Component } from "react";
import { InputEmail, InputText, InputPassword } from "components/common/Input";
import "./Register.module.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Becky Reed",
      email: "becky@elliotreed.net",
      password: "3lli3",
    };
  }

  // addItem = event => {
  // 	event.preventDefault();
  // 	const name = event.target.name.value;
  // 	axios
  // 		.post('/user_account/', {
  // 			name: name,
  // 		})
  // 		.then(response => {
  // 			this.getItem();
  // 		})
  // 		.catch(error => {
  // 			console.log(error);
  // 		});
  // };

  // getItem = id => {
  // 	if (!id) {
  // 		return;
  // 	}
  // 	axios
  // 		.get(`/user_account/${id}`)
  // 		.then(res => {
  // 			this.setState({
  // 				name: res.data.name,
  // 			});
  // 		})
  // 		.catch(error => {
  // 			console.log(error);
  // 		});
  // };

  // updateItem = event => {
  // 	event.preventDefault();
  // 	const id = this.state.id;
  // 	axios
  // 		.put(`/user_account/${id}`, {
  // 			name: this.state.name,
  // 		})
  // 		.then(res => {
  // 			console.log(res);
  // 		});
  // };

  // deleteItem = event => {
  // 	const id = this.state.id;
  // 	axios.delete(`/user_account/${id}`).then(res => {
  // 		this.setState({
  // 			name: 'Deleted',
  // 			id: null,
  // 		});
  // 	});
  // };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  // handleFormSubmit = event => {
  // 	event.preventDefault();
  // 	console.log(`${this.state.email}`);
  // 	axios.post('/register', {
  // 		name: this.state.name,
  // 		email: this.state.email,
  // 		password: this.state.password
  // 	})
  // 		.then(res => console.log(res.data));
  // };

  render() {
    return (
      <form id="Form" value="Register" onSubmit={this.handleFormSubmit}>
        <h1>Create new account</h1>
        <InputText
          name="name"
          labelText="User Name"
          placeholderText="User Name"
          errorMessage="You must enter a username"
          onChange={this.handleInputChange}
        />
        <InputEmail
          name="email"
          labelText="Email"
          placeholderText="Email"
          errorMessage="You must enter an email address"
          onChange={this.handleInputChange}
        />
        <div id="user__password">
          <InputPassword
            name="password"
            labelText="Password"
            placeholderText="Password"
            errorMessage="You must enter a password"
          />
          <InputPassword
            name="confirm-password"
            labelText="Confirm Password"
            placeholderText="Confirm Password"
            errorMessage="You must confirm the password"
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
