import React from "react";
import {
	Button,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity
} from "react-native";

export default class Head extends React.Component {
	render() {
		return (
			<View>
				<TouchableOpacity>
					<Text
						style={{
							padding: 8,
							fontSize: 100,
							fontFamily: "Times New Roman",
							textAlign: "center"
						}}
					>
						A
					</Text>
				</TouchableOpacity>

				<View
					style={{
						borderBottomColor: "black",
						borderBottomWidth: 6,
						margin: 16
					}}
				/>
			</View>
		);
	}
}
