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

import Head from "./src/comp/head";

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

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

class LandingComp extends React.Component {
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

  static navigationOptions = {
    headerTitle: "A"
  };

  render() {
    return (
      <View
        style={{
          borderWidth: 16,
          borderColor: "#222"
        }}
			>
				<Head />

				<ScrollView>
					{
						this.alphabet().map(
							(c) => {
								return (
									<View
										style={{
											padding: 8

										}}
									>
									<Text
										style={{
											fontSize: 60,
											margin: 8
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
																	fontSize: 26
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

        <Button
          title="Recipe"
          onPress={
						() => this.props.navigation.navigate("Recipe")
					}
        />
      </View>
    );
  }
}

class RecipeComp extends React.Component {
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

  static navigationOptions = {
    headerTitle: "Recipe"
  };

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
					borderWidth: 16,
					borderColor: "#222"
				}}>
			>

			<Head />

			<View id="head">
				<Text
					id="title"
					style={{
						margin: 8,
						padding: 8,
						fontSize: 26
					}}
				>
					{this.state.recipe[itemId] != undefined ? this.state.recipe[itemId].title : "..."}
				</Text>
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
									style={{
										margin: 8
									}}
								>
									<Text
										style={{
											margin: 8,
											padding: 8,
											fontSize: 26
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
								function(item) {
									return (
										<Text>
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
									fontSize: 40
								}}
							>
								{(k + 1)}
							</Text>

							<View>
							<Text
								style={{
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
    RouteNameOne: LandingComp,
    Recipe: RecipeComp
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
