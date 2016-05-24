/**
 * Pass Token
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';

var Md5 = require('./lib/md5');
md5Util = new Md5();

class PassToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        password: ''
    };

    this.tags = [
        {key: 'baidu', text: '百度'},
        {key:'163com', text: '163.com'},
        {key:'alipay', text: '支付宝'},
        {key:'163com', text: '163.com'},
        {key:'QQ', text: 'QQ'},
        {key:'weixin', text: '微信'},
        {key:'taobao', text: '淘宝'},
        {key:'vip', text: '唯品会'},
        {key:'weibo', text: '微博'}
    ];

  }

  viewPassword(siteKey, e) {
    if(siteKey != null) {
        this.state.siteKey = siteKey;
        // this.setState({siteKey: siteKey})
        //为啥使用setState下次点击才能看到上次siteKey的值
    }

    var siteKey = this.state.siteKey || '';
    var sign = 'nknowdgp';
    var token = this.state.text || '';

    var password = this.computePassword(sign, token, siteKey) + '';
    password = md5Util.md5(password);
    password = this.slice(password);
    this.setState({password: password});
  }

  slice(str) {
    return str.slice(0,10);
  }

  code(str) {
    return str.split('').map(function(c) {return c.charCodeAt(0);});
  }

  revert(str) {
    var charList = str.split('');
    var length = charList.length;
    for (var i = 0, j = length - 1; i < j; i++, j--) {
        var bridge = charList[i];
        charList[i] = charList[j];
        charList[j] = bridge;
    }
    return charList.join('');
  }

  computePassword(sign, token, siteKey) {
    /*
       js如何实现对称加密
       js如何实现base64
       js如何实现md5加密
     */

    var tokenCode = this.code(this.revert(token));

    var password = this.code(this.revert(sign + token + siteKey));
    return password;
  }

  render() {
    var that = this;
    
    /**
      * onPress如何绑定事件
      *   onPress={() => this.viewPassword()},
      *   not onPress={this.viewPassword}
      */

    /**
      * 使用Touchable组件如何实现一个按钮
      * 如何TouchableHighlight
      */

    /**
        如何实现输入框为密码框
        TextInput secureTextEntry为false
        如何给参数传bool型，{true}
      */
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
            <Text style={styles.title}>密码宝</Text>
            <View style={styles.descWrapper}>
                <Text style={styles.desc}>Pass Token</Text>
                <Text style={styles.desc}>只需要记住一个密码</Text>
                <Text style={styles.desc}>不再为忘记密码而发愁</Text>
                <Text style={styles.desc}>不再担心网站被脱库、撞库</Text>
            </View>
        </View>
        <View style={styles.tokenInput}>
          <TextInput style={{height: 40}}
            placeholder="输入你的token"
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => {
                    that.setState({text: text});
                }
            }
            value={this.state.text}
          />
        </View>

        <View style={styles.tagWrap}>
            <Text style={styles.tagTitle}>选择网站：</Text>
            {
                (function (that) {
                    var tagList = [];
                    that.tags.map(function (item, index) {
                       var tag = (
                            <TouchableHighlight style={styles.tag} key={index} onPress={that.viewPassword.bind(that, item.key)}>
                                <Text style={styles.tagText}>{item.text}</Text>
                            </TouchableHighlight>
                        );

                        tagList.push(tag);

                    });

                    var rowList = [];
                    return tagList.map(function(item, index) {
                        var retTag = item;
                        rowList.push(item);
                        if (index % 3 === 2) {

                            retTag = (
                                <View style={styles.tagWrapper} key={index}>
                                    {rowList[0]}
                                    {rowList[1]}
                                    {rowList[2]}
                                </View>
                            );

                            rowList = [];
                            return retTag;
                        }

                    });

                })(this)
            }
        </View>


        <View style={styles.passwordWrapper}>
            <Text style={styles.passwordText}>您的密码:{this.state.password}</Text>
        </View>

        <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.button} onPress={() => that.viewPassword()}>
                <Text style={styles.whiteColor}>查看密码</Text>
            </TouchableHighlight>
        </View>

      </ScrollView>
    );
  }
}

/*
    如何实现flex布局？
    flex：1即可,不必像web一样在父元素加display:flex

    如何居中？
    alignItems:center

    justifyContent: center
    
    
 */
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 50,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  descWrapper: {
    marginBottom: 20,
  },
  desc: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    color: '#999'
  },
  tokenInput: {
    paddingLeft:10,
    marginBottom:10,
    paddingRight:10,
    backgroundColor: '#fff'
  },
  tagWrap: {
    backgroundColor: '#fff',
    marginBottom: 10
  },
  tagTitle: {
    color: '#333',
    fontSize: 14,
    padding: 10
  },
  tagWrapper: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  tag: {
    margin: 10,
    width: 80,
    padding:6,
    paddingLeft: 12,
    paddingRight:12,
    borderRadius: 5,
    justifyContent:'center',
    backgroundColor: '#ddd',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center'
  },


  buttonWrapper: {
    alignItems: 'center'
  },
  button: {
    padding:6,
    paddingLeft: 12,
    paddingRight:12,
    borderRadius: 5,
    justifyContent:'center',
    backgroundColor: '#337ab7',
    backgroundColor: '#26b064',
  },
  whiteColor: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  passwordWrapper: {
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  passwordText: {
    paddingTop:18,
    paddingLeft: 10,
    height: 60,
  }
});

AppRegistry.registerComponent('PassToken', () => PassToken);
