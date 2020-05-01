import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { withNavigation } from '@react-navigation/compat';
import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import * as Progress from "react-native-progress";
import { FlatList } from "react-native-gesture-handler";
const { width } = Dimensions.get('screen');

class BingoGrid extends React.Component {

  state = {
    gameData: [],
    lastCalledNumber: null,
  }

  render() {
    return this.renderBingoGrid(this.props.showGenerateBtn);
  
  }

   componentDidMount() {
    let data = [];
    for (let i = 1; i <= 90; i++) {
      let item = { key: i.toString(), selected: false };
      data.push(item);
    }
    this.setState({ gameData: data });
  }

  renderBingoGrid = (withGenerateBtn) => {
    const numcolumns = 10;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block>
          <FlatList
            data={this.state.gameData}
            renderItem={this.renderCells}
            numColumns={numcolumns}
            extraData={this.state.gameData}
            keyExtractor={(item) => item.key}
          ></FlatList>
          {this.renderElement(withGenerateBtn)}
        </Block>
      </ScrollView>
    );
  }

  renderElement(withGenerateBtn) {
    if (withGenerateBtn)
      return (<Block center>
        <Progress.Bar indeterminate={this.state.isLoading} />
        <Button
          enabled={!this.state.isLoading}
          shadowless
          style={styles.button}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => this.generateNumber()}
        >
          Call a Number
        </Button>
      </Block>);
  }

  renderCells = ({ item, index }) => {
    let colorbutton = item.selected
      ? materialTheme.COLORS.SUCCESS
      : materialTheme.COLORS.BUTTON_COLOR;
    return (
      <ScrollView>
        <Block center>
          <Button shadowless style={styles.button} color={colorbutton}>
            {item.key}
          </Button>
        </Block>
      </ScrollView>
    );
  }

  generateNumber() {
    var game = this.props.game;
    if(game)
    {
    var url = `https://virtual-bingo.herokuapp.com/game/${game}/generate`;
    this.makeNetworkCall(url);
    }
  }

  makeNetworkCall(url)
  {
    this.setState({ isLoading: true });
    //const gennum = Math.floor(Math.random() * 100) + 1;
    
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson && responseJson.length>0)
        {
        this.setNewNumbersInState(responseJson);
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  setNewNumbersInState(calledNumbers) {
    if (this.state && this.state.gameData) {
      let newCalledOutNumbers = this.state.gameData.filter(
        (item) =>
          calledNumbers.includes(parseInt(item.key)) && item.selected == false
      );
      if (newCalledOutNumbers) {
        for (let i = 0; i < newCalledOutNumbers.length; i++) {
          newCalledOutNumbers[i].selected = true;
          this.setState({ lastCalledNumber: newCalledOutNumbers[i].key });
        }
      }
      this.props.data.updateLastcall(this.state.lastCalledNumber);
      this.setState({ gameData: this.state.gameData });
    }
  }

}

export default withNavigation(BingoGrid);

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
      paddingVertical: theme.SIZES.BASE * 3,
    },
  });