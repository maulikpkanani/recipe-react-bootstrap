import React, { Component } from 'react';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

class App extends Component {
	state = {
		recipes: recipes,
		url:
			'https://www.food2fork.com/api/search?key=b2e2cb39502a698109c469fb20469159',
		base_url:
			'https://www.food2fork.com/api/search?key=b2e2cb39502a698109c469fb20469159',

		details_id: 35380,
		pageIndex: 1,
		search: '',
		query: '&q=',
		error: ''
	};

	//use async await method to get recipes
	async getRecipes() {
		try {
			const data = await fetch(this.state.url);
			const jsonData = await data.json();

			if (jsonData.recipes.length === 0) {
				this.setState({
					error: 'Sorry!!, your search result did not match the specifications'
				});
			} else {
				this.setState({
					recipes: jsonData.recipes
				});
				console.log(jsonData);
			}
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.getRecipes();
	}

	displayPage = index => {
		console.log(index);
		switch (index) {
			default:
			case 1:
				return (
					<RecipeList
						recipes={this.state.recipes}
						handleDetails={this.handleDetails}
						value={this.state.search}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						error={this.state.error}
					/>
				);
			case 0:
				return (
					<RecipeDetails
						id={this.state.details_id}
						handleIndex={this.handleIndex}
					/>
				);
		}
	};

	handleIndex = index => {
		this.setState({
			pageIndex: index
		});
	};
	handleDetails = (index, id) => {
		console.log(index, id);
		this.setState({
			pageIndex: index,
			details_id: id
		});
		console.log(this.state.pageIndex);
	};

	handleChange = e => {
		this.setState({
			search: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { base_url, query, search } = this.state;
		this.setState(
			() => {
				return { url: `${base_url}${query}${search}`, search: '' };
			},
			() => {
				this.getRecipes();
			}
		);
	};

	render() {
		console.log(this.state.error);
		return (
			<React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
		);
	}
}

export default App;
