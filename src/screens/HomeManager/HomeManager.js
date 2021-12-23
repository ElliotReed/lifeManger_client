import React, { Component } from 'react';

class HomeManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      name: '',
      created: '',
    }
  }

  // addMeal = event => {
  //   event.preventDefault();
  //   const name = event.target.name.value;
  //   axios.post('/meal', {
  //     name: name
  //   })
  //   .then((response) => {
  //     this.getMeals();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  // getMeals = () => {
  //   axios.get('/meal')
  //   .then((res) => {
  //     this.setState({
  //       meals: res.data
  //     });
  //   });
  // }
  
  // componentDidMount() {
  //   this.getMeals();
  // }

  render() {
   
    return (
      <div>
        <h1>Home Maintenance</h1>
        <h3>Finished Wood</h3>
        <p>Clean with water and cloth</p>
        <p>Polish as needed with polish mixture</p>
        <p>Polish mixture - 1 part white vinager, 3 parts olive oil</p>
      </div>
    )
  }
}

export default HomeManager;
