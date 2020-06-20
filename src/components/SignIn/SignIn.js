import React, { Component } from "react";

class SignIn extends Component {
	constructor(props){
		super(props);
		this.state = {
			emailField: '',
			passwordField: '',
			error: ''
		}

	}

	onEmailFieldChange = (event) => {
		this.setState({emailField: event.target.value})
	}

	onPasswordFieldChange = (event) => {
		this.setState({passwordField: event.target.value})
	}

	onSignIn = () => {
		fetch("http://localhost:3001/signin", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': this.state.emailField,
				'password': this.state.passwordField
			})
		})
		.then(response => response.json())
		.then(data => {
				if(data.id){
					this.setState({error: ''})
					this.props.updateProfile(data);
					this.props.onRouteChange('home');
				}
				else{
					this.setState({error: 'Wrong credentials'})
				}
			}
		);
	}


	render(){
		const {onRouteChange} = this.props;
		return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center">
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset
						id="sign_up"
						className="ba b--transparent ph0 mh0"
					>
						<legend className="f4 fw6 ph0 mh0">Sign In</legend>
						<div className="mt3">
							<label
								className="db fw6 lh-copy f6"
								htmlFor="email-address"
							>
								Email
							</label>
							<input
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={this.onEmailFieldChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
								onChange={this.onPasswordFieldChange}
							/>
						</div>
					<em style={{color: 'red'}}>{this.state.error}</em>
					</fieldset>
					<div className="">
						<input
							onClick={this.onSignIn}
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Sign in"
						/>
					</div>
					<div className="lh-copy mt3">
						<p href="#0" className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>
							Register
						</p>
					</div>
				</div>
			</main>
		</article>
	);

	}
	
};

export default SignIn;
