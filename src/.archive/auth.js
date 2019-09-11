import axios from 'axios';

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    axios.get(`/user_account/logout`)
		.then((res) => {
			console.log(`client logout status: ${res.status}`);
				if (res.status === 200) {
          this.authenticated = false;
				}
			})
			.catch(error => {
				console.log(error);
			});
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isLoggedIn() {
    this.authenticated = true;
  }
}

export default new Auth();