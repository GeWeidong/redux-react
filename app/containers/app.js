/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import {connect} from 'react-redux';
import {userAction} from '../actions/userAction';
import {bindActionCreators} from 'redux'
import TabBarView from '../containers/TabBarView';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {

        let user = {
            id: 123,
            pwd: 123456,
        }
        console.log(this.props)
        // const {dispatch} = this.props;
        // dispatch(userAction(user));

        const {userAction} = this.props;
        userAction(user)
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'TabBarView', component: TabBarView }}

                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                    />
            </View>
        )
    }
}

function mapStateToProps (state) {
    
    const { userReducer } = state;
    return {
        userReducer
    }
}
// 将action的所有方法绑定到props上
function mapDispatchToProps (dispatch) {
  return bindActionCreators({userAction} ,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);