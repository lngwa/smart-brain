import React, { Component, Fragment } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Face from "./components/Face/Face";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";
import "./App.css";

const particleOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true,
			},
		},
		size: {
			value: 10,
		},
	},
};

const initialState = {
			input: "",
			imgUrl: "",
			faceBox: [],
			route: 'signout',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	calculateFaceLocation = (data) => {
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);

		const regions = data.outputs[0].data.regions.map((region) => {
			const clarifaiFace = region.region_info.bounding_box;
			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: width - clarifaiFace.right_col * width,
				bottomRow: height - clarifaiFace.bottom_row * height,
			};
		});
		return regions;
	};

	displayFaceBox = (boxes) => {
		this.setState((state, props) => {
			return { ...state, faceBox: boxes };
		});
	};

	onButtonClick = () => {
		// Predict the contents of an image by passing in a URL.
		this.setState(
			(state) => {
				return { ...state, imgUrl: this.state.input };
			},
			() => {
				fetch('http://localhost:3001/face', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({imgUrl: this.state.imgUrl})
				})
				.then(response => response.json())
					.then((response) => {
						if(response){
							fetch('http://localhost:3001/image', {
								method: 'put',
								headers: {'Content-Type': 'application/json'},
								body: JSON.stringify({
									id: this.state.user.id
								})
							})
							.then(res => res.json())
							.then(entry => {
								if(entry){
									this.setState({user: {...this.state.user, entries: entry}})
								}
							})
							this.displayFaceBox(
								this.calculateFaceLocation(response)
							)
						}
					})
					.catch((err) => console.log(err));
			}
		);
	};

	onRouteChange = (route) => {
		if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		else if (route === 'signout'){
			this.setState(initialState);
		}
		this.setState({route: route})
	}

	updateProfile = (data) => {
		this.setState({user: data})
	}

	render() {
		const st = this.state.route;
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
								
				{	
					
					(st === 'signout') ?
							<SignIn updateProfile={this.updateProfile} onRouteChange={this.onRouteChange}/>
					: (st === 'register') ? 
							<Register updateProfile={this.updateProfile} onRouteChange={this.onRouteChange}/>
						: <Fragment><Logo />
								<Rank name={this.state.user.name} rank={this.state.user.entries} />
								<ImageLinkForm
									onInputChange={this.onInputChange}
									onButtonClick={this.onButtonClick}
								/>
								<Face regions={this.state.faceBox} imgUrl={this.state.imgUrl} />
							</Fragment>	
				}
			</div>
		);
	}
}

export default App;
