import React from "react";
import {
	Button,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity
} from "react-native";
import {
	createStackNavigator
} from "react-navigation";

import * as firebase from "firebase";

import Triangle from "react-native-triangle";

if (!firebase.apps.length) {
	firebase.initializeApp(
		{
			apiKey: "AIzaSyAKkeYEno7MYy9nhn4QjYQEVfxGIkp0FcA",
			authDomain: "cookbook-1a91d.firebaseapp.com",
			databaseURL: "https://cookbook-1a91d.firebaseio.com",
			projectId: "cookbook-1a91d",
			storageBucket: "cookbook-1a91d.appspot.com",
			messagingSenderId: "1083763890339"
		}
	);
}

class Test extends React.Component {
	constructor(props) {
		super(props);

		const
			{
				navigation
			} = this.prop;

		this.state = {
			recipe: []
		};
	}

  render() {
		return (
			<View>
			<TouchableOpacity></TouchableOpacity>

			<View
				style={{
					borderBottomColor: "#262626",
					borderBottomWidth: 6,
					margin: 16
				}}
			/>
		</View>
	)
}
}

class DogEar extends React.Component {
	render() {
		return (
			<TouchableOpacity
			onPress={
				() => this.props.navigation.navigate(
					"Recipe",
					{
						i: k
					}
				)
			}
			>
			<Triangle
				width={
					60
				}
				height={
					60
				}
				color={
					"#EAE9EF"
				}
				direction={
					"up-left"
				}
			/>
			<Triangle
				width={
					60
				}
				height={
					60
				}
				color={
					"#EAE9EF"
				}
				direction={
					"down-right"
				}
				style={{
					position: "absolute",

					shadowOffset:{
						width: 1,
						height: 1
					},
					shadowColor: '#222',
					shadowOpacity: 0.16,

					position: "absolute",
					left: 0,
					top: 0,
			}}
			/>
			</TouchableOpacity>
		);
	}
}

class Head extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView>
				<DogEar />

				<View>
					<Text
						style={{
							padding: 8,
							fontFamily: "Times New Roman",
							fontSize: 100,
							textAlign: "center",
							color: "#262626"
						}}
					>
						A
					</Text>
				</View>

				<View
					style={{
						borderBottomColor: "#262626",
						borderBottomWidth: 6,
						margin: 16
					}}
				/>
			</SafeAreaView>
		);
	}
}

class Landing extends React.Component {
constructor() {
	super();

	this.state = {
		ln: [],
		recipe: []
	};
}

componentDidMount() {
	const
		root = firebase.database().ref(),

		ref = root.child("recipe");

	ref.on(
		"value",
		(snap) => {
			this.setState(
				{
					recipe: snap.val()
				}
			);
		}
	);
}

alphabet() {
	var
		c = [],
		i = "a".charCodeAt(0);

	const j = "z".charCodeAt(0);

	for (; i <= j; ++i) {
		c.push(String.fromCharCode(i));
	}

	return c;
}

render() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				borderWidth: 26,
				borderColor: "#262626"
			}}
		>
			<Head />

				<ScrollView>
					{
						this.alphabet().map(
							(c, k) => {
								return (
									<View
										key={k}
										style={{
											padding: 8,
										}}
									>
									<Text
										style={{
											margin: 8,
											fontSize: 60,
											// fontWeight: "bold",
											color: "#262626"
										}}
									>
										{c.toUpperCase()}
									</Text>
									{
										this.state.recipe.map(
											(item, k) => {
												if (item.title[0].toLowerCase() == c) {
													return (
														<TouchableOpacity
															key={k}
															style={{
																margin: 8
															}}
															onPress={
																() => this.props.navigation.navigate(
																	"Recipe",
																	{
																		i: k
																	}
																)
															}
														>
															<Text
																style={{
																	fontSize: 26,
																	color: "#262626"
																}}
															>
																{item.title}
															</Text>
														</TouchableOpacity>
													);
												}
											}
										)
									}
									</View>
								);
							}
						)
					}
				</ScrollView>
      </SafeAreaView>
    );
  }
}

class Recipe extends React.Component {
	constructor(props) {
		super(props);

		const
			{
				navigation
			} = this.props,
    	itemId = navigation.getParam(
				"i",
				"NO-ID"
			);

		this.state = {
			recipe: []
		};
	}

	componentDidMount() {
		const
			root = firebase.database().ref(),

			ref = root.child("recipe");

		ref.on(
			"value",
			(snap) => {
				this.setState({
					recipe: snap.val()
				});

				const
					{
						navigation
					} = this.props,
					itemId = navigation.getParam(
						"i",
						"NO-ID"
					);

				this.setState({
					curr: this.state.recipe[itemId]
				});
			}
		);
	}

  render() {
		const
			{
				navigation
			} = this.props,
    	itemId = navigation.getParam(
				"i",
				"NO-ID"
			);

    return (
			<SafeAreaView
				style={{
					flex: 1,
					borderWidth: 26,
					borderColor: "#262626"
				}}>
			>

			<Head />

			<View
				style={{
					padding: 8
				}}
			>
				<View
					style={{
						flexDirection: "column",
						padding: 8
					}}
				>
					<View
						style={{
							padding: 8
						}}
					>
						<Text
							style={{
								fontSize: 26,
							}}
						>
							{this.state.recipe[itemId] != undefined ? this.state.recipe[itemId].title : "..."}
						</Text>

						<Text
							style={{
								fontSize: 16
							}}
						>
							{this.state.recipe[itemId] != undefined ? this.state.recipe[itemId].author : "..."}
						</Text>
					</View>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row"
				}}
			>
			<ScrollView
				id="side"
				style={{
					minWidth: 100,
					padding: 8,
					flexGrow: 1
				}}
			>
				{
					this.state.recipe[itemId] ? this.state.recipe[itemId].step.map(
						(item, k) => {
							return (
								<Text
									key={k}
									style={{
										margin: 8,
										padding: 8
									}}
								>
									<Text
										style={{
											margin: 8,
											padding: 8,
											fontSize: 26,
											flex: 1,
											flexDirection: "row"
										}}
									>
										{k + 1}
									</Text>

									<Text
										style={{
											margin: 8
										}}
									>
										{item.title}
									</Text>
								</Text>
							);
						}
					) : <Text>...</Text>
				}
			</ScrollView>

			<ScrollView
				style={{
					padding: 8,
					flexGrow: 1
				}}
			>
			{
				<View
					style={{
						padding: 8
					}}
				>
					<Text
						style={{
							padding: 8,
							fontSize: 26
						}}
					>
						Ingredients
					</Text>

					<View
						style={{
							padding: 8,
							flex: 1,
							flexDirection: "column"
						}}
					>
						{
							this.state.recipe[itemId] != undefined ? this.state.recipe[itemId].ingredient.map(
								function(item, k) {
									return (
										<Text
											key={k}
										>
											{item}
										</Text>
									);
								}
							) : <Text>...</Text>
						}
					</View>
				</View>
			}
			<View
				style={{
					padding: 8
				}}
			>
			<Text
				style={{
					padding: 8,
					fontSize: 26
				}}
			>
				Steps
			</Text>
			{
				this.state.recipe[itemId] != undefined ? this.state.recipe[itemId].step.map(
					(step, k) => {
						return (
							<View
								id={(k + 1)}
								key={k}
								style={{
									padding: 8
								}}
							>
								<View
									style={{
										margin: 8,
									}}
								>
									<View
										style={{
											flex: 1,
											flexDirection: "row",
										}}
									>
										<Text
											style={{
												fontSize: 40,
											}}
										>
											{(k + 1)}
										</Text>

									<View>
										<Text
											style={{
												padding: 8,
												fontSize: 26
											}}
										>
											{step.title}
									</Text>
								</View>
							</View>

									<Text>
										{step.desc}
									</Text>
								</View>
							</View>
						);
					}
				) : <Text>...</Text>
			}
			</View>
			</ScrollView>
			</View>
			</SafeAreaView>
    );
  }
}

const Nav = createStackNavigator(
  {
    Landing: Landing,
    Recipe: Recipe
  }, {
  }
);

export default class App extends React.Component {
  render() {
    return (
			<Nav />
		);
  }
}
