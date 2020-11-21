
import './App.css';
import React, { Component } from 'react';
import { ReactComponent as Logo } from './logo.svg';
require('dotenv').config();


console.log(process.env);


class App extends Component {
  constructor(props) {
    super(props)

    this.formSubmit = this.formSubmit.bind(this);

    this.state = {
      city: '',
      weatherData: [],
      loading: true
    }
  }

  async componentDidUpdate(prevProps, prevState) {

    if (prevState.city !== this.state.city) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=68d74c3ee59d84ff3b7bee2e9c0e5977`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState(() => {
        return {
          weatherData: data,
          loading: false
        }
      });
    }

  }

  formSubmit(e) {
    e.preventDefault();
    const cityName = e.target.elements.city.value;

    if (cityName) {
      this.setState({ city: cityName })
      e.target.elements.city.value = '';
    }
  }


  render() {
    return (
      <div className="App">

        <div className='App-header'> <h1>wheahter finder</h1>

          <form onSubmit={this.formSubmit}>
            <input type='text' name='city' placeholder='ex: delhi,in' />
            <button>Submit</button>
          </form>
          {this.state.loading ? <h1>enter to know weather</h1>
            : <h1>temparature of ({this.state.city}) is {Math.round(this.state.weatherData.main.temp) - 273} deg celcius</h1>}


          <Logo className='App-logo' />

        </div>




      </div>
    );
  }
}

export default App;
