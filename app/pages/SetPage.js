
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    Switch,
    InteractionManager,
} from 'react-native';

import Common from '../common/common';
import Loading from '../common/Loading';
import HeaderView from '../common/HeaderView';

import {setText,setTitle} from '../actions/setAction';

export default class SetPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			switchValue: false,
			textValue: false
		}

		this.onValueChange = this.onValueChange.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
	}

	componentDidMount() {
		// console.log(this.props)
	}

	onValueChange(bool) {
		const { dispatch } = this.props;
		this.setState({
			switchValue: bool
		})
		dispatch(setTitle(bool));
	}

	onTextChange(bool) {
		const { dispatch } = this.props;

		this.setState({
			textValue: bool
		});

		dispatch(setText(bool));
	}

	render() {
		return (
			<View>
		        <HeaderView
		          titleView= {'设置'}
		          />

		        <View>
		        	<View style={styles.itemContainer}>
						<Text style={{fontSize: 16}}>全局设置标题主题</Text>
						<Switch 
							onValueChange={this.onValueChange}
							value={this.state.switchValue}
						/>
					</View>

					<View style={styles.itemContainer}>
						<Text style={{fontSize: 16}}>设置详情页文字主题</Text>
						<Switch 
							onValueChange={this.onTextChange}
							value={this.state.textValue}
						/>
					</View>
		        </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemContainer:{
		paddingLeft: 20,
		paddingRight: 20,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})