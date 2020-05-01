import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import { Icon, Product , BingoGrid } from "../components/";
import * as Progress from "react-native-progress";

const { width } = Dimensions.get("screen");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      gameData: [],
      lastCalledNumber: null,
      btnCallNumber: true,
      isLoading: false,
    };
    let data = [];
    this.setState({ gameData: data });
  }

  componentDidMount() {
    let newgameId = Math.floor(1000 + Math.random() * 9000);
    this.setState({ gameId: newgameId });
  }

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
              Game ID : {this.state.gameId}
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
              Last Call {this.state.lastCalledNumber}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  updateLastcall(lastcall)
  {
    this.setState({lastCalledNumber: lastcall});
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderTabs()}
        <BingoGrid game={this.state.gameId} 
        data={{ updateLastcall: this.updateLastcall.bind(this)}}
        showGenerateBtn="true"></BingoGrid>
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
    paddingVertical: theme.SIZES.BASE * 3,
  },
});
