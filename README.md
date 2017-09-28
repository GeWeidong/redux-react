### Redux学习文档v1.0

**参考链接：**

- [Redux中文文档](http://www.redux.org.cn/)
- [Redux 入门教程-阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [看漫画，学 Redux](https://zhongjie-chen.github.io/blog/2015/09/18/%E7%9C%8B%E6%BC%AB%E7%94%BB-%E5%AD%A6-Redux/)
- [在react-native中使用redux](http://www.jianshu.com/p/2c43860b0532)
- [[React Native]Redux的基本使用方式](http://www.jianshu.com/p/f1a3c7845bb9)
- [Redux管理复杂应用数据逻辑](http://luoxia.me/code/2016/10/04/Redux%E7%AE%A1%E7%90%86%E5%A4%8D%E6%9D%82%E5%BA%94%E7%94%A8%E6%95%B0%E6%8D%AE%E9%80%BB%E8%BE%91/)



#### 1.应用场景

React设计理念之一为单向数据流，这从一方面方便了数据的管理。但是React本身只是view，并没有提供完备的数据管理方案。随着应用的不断复杂化，如果用react构建前端应用的话，就要应对纷繁复杂的数据通信和管理，js需要维护更多的状态（state），这些state可能包括用户信息、缓存数据、全局设置状态、被激活的路由、被选中的标签、是否加载动效或者分页器等等。
   
这时，Flux架构应运而生，Redux是其最优雅的实现，Redux是一个不依赖任何库的框架，但是与react结合的最好，其中react-redux等开源组件便是把react与redux组合起来进行调用开发。

> 备注：

> 1.如果你不知道是否需要 Redux，那就是不需要它

> 2.只有遇到 React 实在解决不了的问题，你才需要 Redux

**Redux使用场景：**

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

> 比如，论坛应用中的夜间设置、回到顶部、userInfo全局共享等场景。redux最终目的就是让状态(state)变化变得可预测.

#### 2.使用的三原则

- 单一数据源
>  整个应用的state，存储在唯一一个object中，同时也只有一个store用于存储这个object.
- 状态是只读的
> 唯一能改变state的方法，就是触发action操作。action是用来描述正在发生的事件的一个对象
- 通过纯函数修改State
> 纯函数的问题，也是来自于函数式编程思想，我们在中学时学的函数就是纯函数，对于同一个输入，必然有相同的输出。这就保证了数据的可控性，这里的纯函数就是reducer

#### 3.redux状态管理的流程


![image](http://upload-images.jianshu.io/upload_images/1400529-59aa52304c232986.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **store**

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。(一个store是一个对象, reducer会改变store中的某些值)

Redux 提供createStore这个函数，用来生成 Store。

```
import { createStore } from 'redux';
const store = createStore(fn);

```

上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。这个fn就是reducer纯函数，通常我们在开发中也会使用中间件，来优化架构，比如最常用的异步操作插件，redux-thunk，如果配合redux-thunk来创建store的话，代码示例：

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReudcer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);

```

redux-thunk的源码及其简单，如下：

```
// 判断action是否是函数，如果是，继续执行递归式的操作。所以在redux中的异步，只能出现在action中，而且还需要有中间件的支持。
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

```

同步action与异步action最大的区别是：

同步只返回一个普通action对象。而异步操作中途会返回一个promise函数。当然在promise函数处理完毕后也会返回一个普通action对象。thunk中间件就是判断如果返回的是函数，则不传导给reducer，直到检测到是普通action对象，才交由reducer处理。

---

Store 有以下职责：

- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

==一般情况下，我们只需要getState()和dispatch()方法即可，即可以解决绝大部分问题。==

**我们可以自定义中间件**

比如我们自定义一个可以打印出当前的触发的action以及出发后的state变化的中间件，代码改动如下：

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReudcer';

let logger = store => next => action => {
    if(typeof action === 'function') {
        console.log('dispatching a function')
    }else{
        console.log('dispatching', action);
    }
    
    let result = next(action);
    // getState() 可以拿到store的状态， 也就是所有数据
    console.log('next state', store.getState());
    return result;
}

let middleWares = {
    logger, 
    thunk
}
// ... 扩展运算符
let createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);

let store = createStoreWithMiddleware(rootReducer);
```

> 补充：我们自定义的中间件，也有对应的开源插件，[redux-logger](https://github.com/evgenyrodionov/redux-logger)，人家的更厉害。

如果，app中涉及到登录问题的时候，可以使用[redux-persist](https://www.npmjs.com/package/redux-persist)第三方插件，这个第三方插件来将store对象存储到本地，以及从本地恢复数据到store中，比如说保存登录信息，下次打开应用可以直接跳过登录界面，因为我们目前的应用属于内嵌程序，不登陆的话也进不来，所以不用它。

- **Action**

Action 是一个对象，描述了触发的动作，仅此而已。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。通常它长一下这个样子：

```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

> 除了 type 字段外，action 对象的结构完全由你自己决定，来看一个复杂点的：

```
{
    type: 'SET_SCREEN_LAST_REFRESH_TIME',
    screenId,
    lastRefreshTime,
    objectId
}
```
通常我们会添加一个新的模块文件来存储这些actions types，比如我们新建一个actionTypes.js来保存：

```
//主页actions
export const FETCH_HOME_LIST = 'FETCH_HOME_LIST';
export const RECEIVE_HOME_LIST = 'RECEIVE_HOME_LIST';
//分类页actions
export const FETCH_CLASS_LIST = 'FETCH_CLASS_LIST';
export const RECEIVE_CLASS_LIST = 'RECEIVE_CLASS_LIST';
//分类详细页actions
export const FETCH_CLASSDITAL_LIST = 'FETCH_CLASSDITAL_LIST';
export const RECEIVE_CLASSDITAL_LIST = 'RECEIVE_CLASSDITAL_LIST';
export const RESET_CLASSDITAL_STATE = 'RESET_CLASSDITAL_STATE'; 
// 设置页actions
export const CHANGE_SET_SWITCH = 'CHANGE_SET_SWITCH';
export const CHANGE_SET_TEXT = 'CHANGE_SET_TEXT';
// 用户信息
export const USER_INFO = 'USER_INFO';

```

引用的时候，可以：

```
import * as types from './actionTypes';
```

- **Action 创建函数(Action Creator)**

Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。在 Redux 中的 action 创建函数只是简单的返回一个 action。

```
import * as types from './actionTypes';
// 设置详情页内容文字主题
let changeText = (theme) => {
	return {
		type: types.CHANGE_SET_TEXT,
		theme
	}
}   

// 函数changeText就是一个简单的action creator。
```

**完整的action文件（setAction.js）**

```
import * as types from './actionTypes';

let setTitle = (value) => {
	return (dispatch, getState) => {
		dispatch(changeValue(value))
	}
}

let setText = (text) => {
	return dispatch => {
		dispatch(changeText(text))
	}
}

// 修改标题颜色主题
let changeValue = (titleTheme) => {
	return {
		type: types.CHANGE_SET_SWITCH,
		titleTheme
	}
}

// 设置详情页内容文字颜色
let changeText = (textColor) => {
	return {
		type: types.CHANGE_SET_TEXT,
		textColor
	}
}

export {
	setText,
	setTitle
};
```

可以看到上述setTitle、setText函数，返回的并不是一个action对象，而是返回了一个函数，这个默认redux是没法处理的，这就需要使用中间件处理了，redux-thunk中间件用于处理返回函数的函数，上面也介绍了redux-thunk的使用基本方式。

- **Reducer**

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

函数签名：

```
(previousState, action) => newState
```
==Reducer必须保持绝对纯净，永远不要在 reducer 里做这些操作：==

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()；

完整的Reducer方法，（setReducer.js）：

```
import * as types from '../actions/actionTypes';

const initialState = {
	titleTheme: false,
	textColor: false
}
// 这里一个技巧是使用 ES6 参数默认值语法 来精简代码
let setReducer = (state = initialState, action) => {

	switch(action.type){
		case types.CHANGE_SET_SWITCH:
			return Object.assign({}, state, {
				titleTheme: action.titleTheme,
			})

		case types.CHANGE_SET_TEXT:
			return Object.assign({}, state, {
				textColor: action.textColor
			})

		default:
			return state;
	}
}

export default setReducer
```

> 注意：

- 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, {
				titleTheme: action.titleTheme,
			})，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。
- 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state

==**关于拆分Reducer**==

这里只是举例了一个简单的功能的reducer，如果有不同的功能，需要设计很多reducer方法，注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。

比如我们这个项目的reducer文件结构：

![image.png](http://upload-images.jianshu.io/upload_images/5339345-22685df9481cad4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其中==rootReducer.js就是一个根reducer文件，使用了Redux 的 combineReducers() 工具类来进行封装整合。==

```
/**
 * rootReducer.js
 * 根reducer
 */
import { combineReducers } from 'redux';
import Home from './homeReducer';
import Class from './classReducer';
import ClassDetial from './classDetialReducer';
import setReducer from './setReducer';
import userReducer from './userReducer';

export default rootReducer = combineReducers({
    Home,
    Class,
    ClassDetial,
    setReducer,
    userReducer,
})
```

这样根据这个根reducer，可以生成store，请看上文store的创建过程。

#### 4.redux如何与组件结合

以上部分介绍了Redux 涉及的基本概念，下面介绍与组件交互的工作流程。

梳理一下Redux的工作流程：

![image](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

1.首先，用户发出 Action。

```
store.dispatch(action);
```
2.Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。

```
let nextState = todoApp(previousState, action);
```
3.state一旦有变化，Store就会调用监听函数，组件可以感知state的变化，更新View。

```
let newState = store.getState();
component.setState(newState);
```

==具体示例1：==

![fsdf.gif](http://upload-images.jianshu.io/upload_images/5339345-925cd030c6313047.gif?imageMogr2/auto-orient/strip)

> 设置页面有个switch按钮，可以全局设置标题栏的主题。

##### 代码拆分：

1.设置按钮所在组件：

```
// SetContainer.js

import React from 'react';
import {connect} from 'react-redux';
import SetPage from '../pages/SetPage';

class SetContainer extends React.Component {
    render() {
        return (
            <SetPage {...this.props} />
        )
    }
}

export default connect((state) => {
    
    const { setReducer } = state;
    return {
        setReducer
    }

})(SetContainer);
```

这是容器组件，将SetPage组件与redux结合起来，其中最重要的方法是connect，这个示例中是将setReducer作为属性传给SetPage组件，关于connect的详解，请移步到[connect()](http://www.redux.org.cn/docs/react-redux/api.html)。

2.SetPage组件

```

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
```

可以只看全局设置标题主题这个方法，设置详情页文字颜色和他同理。这里可以清晰的看到，用户切换主题switch按钮的时候，触发的方法：

```
dispatch(setTitle(bool));
```

3.我们查看一下setTitle这个action的源码：

```
// setAction.js
import * as types from './actionTypes';

let setTitle = (value) => {
	return (dispatch, getState) => {
		dispatch(changeValue(value))
	}
}

let setText = (text) => {
	return dispatch => {
		dispatch(changeText(text))
	}
}

// 修改标题主题
let changeValue = (titleTheme) => {
	return {
		type: types.CHANGE_SET_SWITCH,
		titleTheme
	}
}

// 设置详情页内容文字主题
let changeText = (textColor) => {
	return {
		type: types.CHANGE_SET_TEXT,
		textColor
	}
}

export {
	setText,
	setTitle
};
```

4.action只是负责发送事件，并不会返回一个新的state供页面组件调用，它是在reducer中返回的：

```
// setReducer.js

import * as types from '../actions/actionTypes';

const initialState = {
	titleTheme: false,
	textColor: false
}

let setReducer = (state = initialState, action) => {

	switch(action.type){
		case types.CHANGE_SET_SWITCH:
			return Object.assign({}, state, {
				titleTheme: action.titleTheme,
			})

		case types.CHANGE_SET_TEXT:
			return Object.assign({}, state, {
				textColor: action.textColor
			})

		default:
			return state;
	}
}

export default setReducer
```

最简单的reducer，就是根据初始值和action对象，返回一个新的state，提供给store，这样，页面里可以从store中获取到这些全局的state，用于更新组件。

==我们只是写了怎样发送action和接收action发出newState的，下面来看这个标题组件是怎样和redux结合的。==

5.HeaderView组件

```
/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/common';
import {connect} from 'react-redux';

class HeaderView extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        // 这里，在这里
        const { titleTheme } = this.props.setReducer;
        let NavigationBar = [];

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                    >
                    <Icon color="black" size={30} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={styles.title}>{this.props.title}</Text>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;

            NavigationBar.push(
                <Text key={'titleView'} style={[styles.titleView, {color: titleTheme ? '#FFF' : '#000'}]}>{this.props.titleView}</Text>
            )
        }


        return (
            <View style={[styles.navigationBarContainer, {backgroundColor: titleTheme ? 'blue' : '#fff'}]}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
        marginTop: 20,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white'
    },

    title: {
        fontSize: 15,
        marginLeft: 15,
    },
    titleView: {
        fontSize: 15,
    },
    leftIcon: {
       left: -Common.window.width/2+40,
    },
})


export default connect((state) => {
    
    const { setReducer } = state;
    return {
        setReducer
    }

})(HeaderView);
```

==这个组件同样利用connect方法绑定了redux，变成了容器组件（container component）。==

connect真的很关键，请详细查看官方文档，上面有链接。

其他不相关的内容忽略，核心代码是：

```
// 拿到全局的state 当有变化的时候，会马上修改
const { titleTheme } = this.props.setReducer;
```

==具体示例2：==

![image.png](http://upload-images.jianshu.io/upload_images/5339345-c22fb919ad328684.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

利用redux来请求数据、下拉刷新、上拉加载更多。

1.首先，封装action。

```
import * as types from './actionTypes';
import Util from '../common/utils'; 
// action创建函数，此处是渲染首页的各种图片
export let home = (tag, offest, limit, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
    if (limit) URL += limit;
    offest ? URL += '&max=' + offest : URL += '&max=';
    tag ? URL += '&tag=' + encode_utf8(tag) : URL += '&tag='
    
    return dispatch => {
        // 分发事件  不修改状态   action是 store 数据的唯一来源。
        dispatch(feachHomeList(isLoadMore, isRefreshing, isLoading));
        return Util.get(URL, (response) => {
            // 请求数据成功后
            dispatch(receiveHomeList(response.pins))
        }, (error) => {
            // 请求失败
            dispatch(receiveHomeList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

// 我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
let feachHomeList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_HOME_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveHomeList = (homeList) => {
    return {
        type: types.RECEIVE_HOME_LIST,
        homeList: homeList,
    }
}
```
- feachHomeList表示正在请求数据的动作；
- receiveHomeList表示请求数据完后的动作；
- dispatch(feachHomeList(isLoadMore, isRefreshing, isLoading));表示分发请求数据的动作；

2.封装reducer函数

```
import * as types from '../actions/actionTypes';
// 设置初始状态
const initialState = {
    HomeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let homeReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.FETCH_HOME_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
            
        case types.RECEIVE_HOME_LIST:
            // 如果请求成功后，返回状态给组件更新数据
            return Object.assign({}, state, {
            // 如果是正在加载更多，那么合并数据
                HomeList: state.isLoadMore ? state.HomeList.concat(action.homeList) : action.homeList,
                isRefreshing: false,
                isLoading: false,
            })

        case types.RESET_STATE: // 清除数据
            return Object.assign({},state,{
                HomeList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default homeReducer;
```

- 这里并没有处理没有更多数据的情况。

3.容器组件

```
import React from 'react';
import {connect} from 'react-redux';
import Home from '../pages/Home';

class HomeContainer extends React.Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Home } = state;
    return {
        Home
    }
})(HomeContainer);
```
- 这里主要是利用connect函数将Home  state绑定到Home组件中，并作为它的props；

4.UI组件

- 组件挂载请求数据

```
...
let limit = 21;
let offest = '';
let tag = '';
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
...
componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props;
      // 触发action 请求数据
      dispatch(home(tag, offest, limit, isLoadMore, isRefreshing, isLoading));
    })
}
...
```
- 下拉刷新
```
// 下拉刷新
  _onRefresh() {
    if (isLoadMore) {
      const {dispatch, Home} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(home('', '', limit, isLoadMore, isRefreshing, isLoading));
    }
  }
```
- 上拉加载更多

```
// 上拉加载
  _onEndReach() {

    InteractionManager.runAfterInteractions(() => {
      const {dispatch, Home} = this.props;
      let homeList = Home.HomeList;
      isLoadMore = true;
      isLoading = false;
      isRefreshing = false;
      offest = homeList[homeList.length - 1].seq
      dispatch(home(tag, offest, limit, isLoadMore, isRefreshing, isLoading));
    })

  }
```

- render方法

```
render() {
    // 这里可以拿到Home状态
    const { Home,rowDate } = this.props;
     tag = rowDate;
    
    let homeList = Home.HomeList;
    let titleName = '最新';
    return (
      <View>
        <HeaderView
          titleView= {titleName}
          leftIcon={tag ? 'angle-left' : null}
          />
        {Home.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(homeList) }
            renderRow={this._renderRow}
            contentContainerStyle={styles.list}
            enableEmptySections={true}
            initialListSize= {10}
            onScroll={this._onScroll}
            onEndReached={this._onEndReach.bind(this) }
            onEndReachedThreshold={10}
            renderFooter={this._renderFooter.bind(this) }
            style={styles.listView}
            refreshControl={
              <RefreshControl
                refreshing={Home.isRefreshing}
                onRefresh={this._onRefresh.bind(this) }
                title="正在加载中……"
                color="#ccc"
                />
            }
            />
        }
      </View>

    );

  }
```

**至此，一个简单的Reducer程序完成了，我们稍微总结一下：**

- 整个应用只有一个store，用来保存所有的状态，视图不需要自己维护状态。
- 视图通过connect函数绑定到store，当store状态变化后，store会通知视图刷新。
- 触发一个action之后，会经过可能N个reducers处理，最后根reducer会将所有reducers处理之后的状态合并，然后交给store，store再通知视图刷新。

**本文的源码地址：** [案例](http://pan.baidu.com/s/1pLTyU9t)，提取码： lt1x