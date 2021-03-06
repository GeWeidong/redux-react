


import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeContainer from '../containers/HomeContainer';
import ClassContainer from '../containers/ClassContainer';
import SetContainer from '../containers/SetContainer';

const tabBarItems = [
    { title: '最新', icon: () => <Image style={{ width: 30, height: 30 }} source={require('./imgs/home.png') }/>, component: HomeContainer },
    { title: '文章', icon: () => <Image style={{ width: 30, height: 30 }} source={require('./imgs/class.png') }/>, component: ClassContainer },
    { title: '设置', icon: () => <Image style={{ width: 30, height: 30 }} source={require('./imgs/huarache.png') }/>, component: SetContainer },
]

export default class TarBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render() {
        return (
            <TabNavigator tabBarStyle={{ height: 60 }}>
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;
                        return (
                            <TabNavigator.Item
                                key= {i}
                                selected={this.state.selectedTab === controller.title}
                                title={controller.title}
                                renderIcon={controller.icon}
                                onPress={() => this.setState({ selectedTab: controller.title }) }>
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator >

        );
    }


}