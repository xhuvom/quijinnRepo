//Comment.js
import React, {Component} from 'react';
import axios from 'axios';

import RestaurantBox from './RestaurantBox';

export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            region: '',
            zipCode: '',
            cuisine: '',
            rating: '',
            logo: '',
            image: '',
            restaurants: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handlezipCodeChange = this.handlezipCodeChange.bind(this);
        this.handleCuisineChange = this.handleCuisineChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleRestaurantSubmit = this.handleRestaurantSubmit.bind(this);
        this.handleRestaurantDelete = this.handleRestaurantDelete.bind(this);
        this.loadRestaurants = this.loadRestaurants.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleLocationChange(e) {
        this.setState({location: e.target.value});
    }
    handleRegionChange(e) {
        this.setState({region: e.target.value});
    }
    handlezipCodeChange(e) {
        this.setState({zipCode: e.target.value});
    }
    handleCuisineChange(e) {
        this.setState({cuisine: e.target.value});
    }
    handleRatingChange(e) {
        this.setState({rating: e.target.value});
    }


    componentDidMount() {
        axios.get('/api/restaurants')
            .then(response => {
                this.setState({restaurants: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    loadRestaurants() {
        axios.get('/api/restaurants')
            .then(response => {
                this.setState({restaurants: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleRestaurantSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let location = this.state.location.trim();
        let region = this.state.region.trim();
        let zip = this.state.zipCode.trim();
        let cuisine = this.state.cuisine.trim();
        let rating = this.state.rating.trim();
        if (!name || !location) {
            return;
        }
        let restaurants = this.state.restaurants;
        let restaurant = {_id: name, name: name, location: location, region: region,
                            zip: zip, cuisine: cuisine, rating: rating};

        let newRestaurants = restaurants.concat([restaurant]);
        this.setState({restaurants: newRestaurants}, function () {
            console.log(this.state.restaurants);
        });

        axios.post('/api/restaurants', restaurant)
            .catch(err => {
                console.error(err);
                this.setState({restaurants: restaurants});
            });
    }

    handleRestaurantDelete(id) {
        axios.delete('api/restaurants/' + id)
            .then(res => {
                this.loadRestaurants();
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        let restaurantNodes = this.state.restaurants.map(restaurant => {
            return (
                <div key={restaurant._id}>
                    <RestaurantBox restaurant={restaurant} onRestaurantDelete={this.handleRestaurantDelete}/>
                </div>

            )
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center text-success">
                            WELCOME TO QUIJINN
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {restaurantNodes}
                        <br/><br/>
                        <form onSubmit={this.handleRestaurantSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" value={this.state.name}
                                       onChange={this.handleNameChange} id="name"/>

                                <label htmlFor="location">Location:</label>
                                <input type="text" className="form-control" value={this.state.location}
                                       onChange={this.handleLocationChange} id="location"/>
                            </div>
                            <div>
                                <label htmlFor="region">Region:</label>
                                <input type="text" className="form-control" value={this.state.region}
                                       onChange={this.handleRegionChange} id="region"/>

                                <label htmlFor="zip">ZIP Code</label>
                                <input type="text" className="form-control" value={this.state.zipCode}
                                       onChange={this.handlezipCodeChange}  id="zip"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cuisine">Cuisine</label>
                                <input type="text" className="form-control" value={this.state.cuisine}
                                       onChange={this.handleCuisineChange} id="cuisine"/>

                                <label htmlFor="rating">Rating</label>
                                <input type="text" className="form-control" value={this.state.rating}
                                       onChange={this.handleRatingChange}  id="rating"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="logo">Logo</label>
                                <input type="file" className="form-control" id="logo"/>

                                <label htmlFor="image">Image</label>
                                <input type="file" className="form-control" id="image"/>
                            </div>

                            <input type='submit' className="btn-success" value='ADD'/>
                        </form>

                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        )
    }
}