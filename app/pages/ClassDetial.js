/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ListView,
  TouchableOpacity,
  View,
  InteractionManager,
  RefreshControl,
  Navigator,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';


let tag = '';
class ClassDetial extends Component {

  constructor(props) {
    super(props); 
    this.state = {}
  }

  componentDidMount() {
      // const {dispatch, rowDate} = this.props
      // tag = rowDate;
      // dispatch(classDital(tag, offest, limit, isLoadMore, isRefreshing, isLoading));
  }


  render() {
    const {setReducer} = this.props;
    
    return (
      <View style={{flex:1,backgroundColor: '#fff'}}>
        <HeaderView
          titleView= {'详情'}
          leftIcon={tag ? 'angle-left' : null}
          leftIconAction={() => this.props.navigator.pop() }
          />
        <Text>我要通过设置页，设置文字字体后，在详情页生效，来测试不同组件之间的数据传递</Text>

        <View>
          <ScrollView>
            <Text style={{color: setReducer.textColor ? 'orange' : '#000'}}>现在我们已经确定了 state 对象的结构，就可以开始开发 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

                  (previousState, action) => newState
                  之所以称作 reducer 是因为它将被传递给 Array.prototype.reduce(reducer, ?initialValue) 方法。保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：

                  修改传入参数；
                  执行有副作用的操作，如 API 请求和路由跳转；
                  调用非纯函数，如 Date.now() 或 Math.random()。
                  在高级篇里会介绍如何执行有副作用的操作。现在只需要谨记 reducer 一定要保持纯净。只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

                  明白了这些之后，就可以开始编写 reducer，并让它来处理之前定义过的 action。

                  我们将以指定 state 的初始状态作为开始。Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。

            </Text>
          </ScrollView>
        </View>
      </View>

    );

  }

}


const styles = StyleSheet.create({
  container: {
    width: Common.window.width / 3,
    height: Common.window.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    backgroundColor: '#F5FCFF',
    height: Common.window.height - 44 - 20,
  },
  thumbnail: {
    width: Common.window.width / 3 - 10,
    height: Common.window.width / 2 - 10,

  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
  header: {
    marginTop: 20,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
  },
});

module.exports = ClassDetial;