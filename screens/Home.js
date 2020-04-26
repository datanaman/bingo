import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from '../constants/Theme';
import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");
import products from "../constants/products";
import { FlatList } from "react-native-gesture-handler";

let data = [];

export default class Home extends React.Component {

 

  constructor(props) {
    super(props);
    this.state = {
      gameData : []
    }
  }

  componentDidMount()
  {
    data = [];
    for(let i=1;i<=100;i++)
    {
      let item = { key: i.toString() , selected: false }
      data.push(item);
    } 
    this.setState({gameData:data});
  }


  // renderSearch = () => {
  //   const { navigation } = this.props;
  //   const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

  //   return (
  //     <Input
  //       right
  //       color="black"
  //       style={styles.search}
  //       iconContent={iconCamera}
  //       placeholder="What are you looking for?"
  //       onFocus={() => navigation.navigate('Pro')}
  //     />
  //   )
  // }

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              name="play-circle"
              family="feather"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              Game ID
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="hash"
              family="feather"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              12876
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };



  renderItems = ({ item, index }) => {
    console.log(item.selected);
    let colorbutton = item.selected ? materialTheme.COLORS.SUCCESS : materialTheme.COLORS.BUTTON_COLOR;
    console.log(colorbutton);
    return (
      <ScrollView>

            <Block center>
              <Button
                shadowless
                style={styles.button}      
                color={colorbutton}>
                {item.key}
              </Button>
            </Block>
      </ScrollView>
    );
  };

  renderProducts = () => {  

   
    console.log(this.state.gameData);
   
  const numcolumns = 10;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>


          <FlatList 
          data={this.state.gameData} 
          renderItem={this.renderItems} 
          numColumns={numcolumns}
          extraData={this.state.gameData}
          keyExtractor={(item) => item.key} 
          >
          
          </FlatList>

        </Block>
        <Block center>
        <Button
                shadowless
                style={styles.button} 
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => this.generateNumber()}>
                Call a Number
              </Button>
              </Block>
        

      </ScrollView>
    );
  };

  generateNumber()
  {
    const gennum =Math.floor(Math.random() * 100) + 1;
    console.log('Number Generated:'+gennum);
    if( this.state &&  this.state.gameData)
    {
    let  found = this.state.gameData.find(item => item.key == gennum.toString())
    if(found)
    {
      found.selected = true;
      console.log('F:'+found.key);
      console.log('F:'+found.selected);
    }
    this.setState({gameData:this.state.gameData});
  }

  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderTabs()}
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
