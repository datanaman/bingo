import React from "react";
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from "../constants/Theme";
import * as Progress from "react-native-progress";
import { FlatList } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addFriend from '../GameReducer';


let count =0;
var baseArrayNew = new Array(0,9,19,29,39,49,59,69,79,90);
var baseArrayStart = new Array(0,1,10,20,30,40,50,60,70,80);
var number = 0;               
var base = 0;
var j =0 ;
var newNo=0; 
var arr = [];
var arrKeyValuePair=[];


class BingoTicket extends React.Component {
  state = {
    gameData: [],
    isLoading: false,
    lastCalledNumber:null,
  };



  render() {
    return this.renderBingoGrid(this.props.showGenerateBtn);
   
  }

  componentDidMount() {
   
    this.generateNewTicket();
    //this.timer = setInterval(()=> this.displayNumbers(), 5000)

  
  }

 

  generateNewTicket()
  {
    let newTicketNumbers = this.generateNewTicketNumbers();
    let data = [];
    for (let row = 0; row <= 2; row++) {
      for (let colmn = 1; colmn <= 9; colmn++) {

        var pos = (row*10)+colmn;
        let cellvalue = '';
        let cell = newTicketNumbers.find(x=>x.split(':')[0]==pos);
        if(cell)
        {
          cellvalue =  cell.split(':')[1];
        }
        let item = { pos: pos.toString(), selected: false , value:cellvalue };
        data.push(item);
      }
    }
    //console.log(newTicketNumbers);
    this.setState({ gameData: data });

  }

  generateNewTicketNumbers() {
    arrKeyValuePair=[];
    arr=[];

    //let arrNew = []; 
    count =0;
    number = 0; 
    base = 0; 
    //selectRow=0 ;  
    j =0 ;
    newNo=0;
    //countArray =0;

    arr = this.getRandomColumn();
    console.log(arr);
    arr.sort(function (a, b) {
      return a - b;
    });
    for(var i = 0; i<arr.length; i++)
    {
      var num = this.getRandomNum(arr[i]);
      if (this.checkUniqueNess(num, arrKeyValuePair) == false) {
        while (this.checkUniqueNess(num, arrKeyValuePair) == false) {
          var num = this.getRandomNum(arr[i]);
        }
        //console.log(" true ");
      }
      this.pushToAry(arr[i], num);
      this.sortArray(arrKeyValuePair, arr[i], num);
    }
    return arrKeyValuePair;
  }

  getRandomColumn() {
    while (arr.length < 15) {
      var randomnumber = Math.ceil(Math.random() * 9);
      var found = false;
      if (count >= 5 && count < 10) {
        randomnumber = randomnumber + 10;
      } else if (count >= 10) {
        randomnumber = randomnumber + 20;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == randomnumber) {
          found = true;
          break;
        }
      }
      if (!found) {
        arr[arr.length] = randomnumber;
        count++;
      }
    }
    return arr;
  }

  getRandomNum(i) {
    var start = 0;
    if (i > 10) {
      // convert number to a string, then extract the first digit
      var one = String(i).charAt(1);
      // convert the first digit back to an integer
      newNo = Number(one);
      j = newNo;
    } else {
      j = i;
    }
    base = baseArrayNew[j];
    start = baseArrayStart[j];
    //return Math.floor(Math.random() * (max - min + 1)) + min;

    number = Math.floor(Math.random() * (base - start + 1)) + start;

    //number = base + Math.floor(Math.random()*9)+1;
    return number;
  }
  //check for uniqueness
  checkUniqueNess(number, arrNew) {
    var res = 0;
    var value = 0;
    var found = false;

    for (var i = 0; i < arrNew.length; i++) {
      res = arrNew[i].split(":");
      value = res[1];
      if (value == number) {
        found = true;
        return false;
        break;
      }
    }
    if (!found) {
      // arrNew[arrNew.length]=number;
      return true;
    }
  }

  //sort the array
  sortArray(arr, keySort, num) {
    var res = 0;
    var key = [];
    var value = [];
    var arySort = [];
    var sort = false;
    value[value.length] = num;
    for (var i = 0; i < arr.length; i++) {
      res = arr[i].split(":");
      //console.log("RES : "+ res);
      key = res[0];
      if (
        keySort + 10 == key ||
        keySort + 20 == key ||
        keySort - 10 == key ||
        keySort - 20 == key
      ) {
        //console.log("key : "+ key);
        value[value.length] = res[1];
        sort = true;
      }
    }

    if (sort) {
      value.sort(function (a, b) {
        return a - b;
      });
      this.arrangeSort(arr, key, value);
    }
  }
  // arrange the array
  arrangeSort(arr, keyOld, val) {
    var str;
    var j = 0;
    for (var i = 0; i < arr.length; i++) {
      let res = arr[i].split(":");
      //  console.log("RES : "+ res);
      let key = res[0];
      if (
        keyOld + 10 == key ||
        keyOld + 20 == key ||
        keyOld == key ||
        keyOld - 10 == key ||
        keyOld - 20 == key
      ) {
        //console.log("key : "+ key);
        str = key + ":" + val[j];
        //  console.log("str : "+ str);
        arr[i] = str;
        j++;
      }
    }
  }
  // add to arr random no. with random columns
  pushToAry(name, val) {
    arrKeyValuePair.push(name + ":" + val);
    return arrKeyValuePair;
  }

  renderBingoGrid = (withGenerateBtn) => {
    const numcolumns = 9;
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
            posExtractor={(item) => item.pos}
          ></FlatList>
          {this.renderElement(withGenerateBtn) }
        </Block>
      </ScrollView>
    );
  };

 

  
  renderElement(withGenerateBtn) {
    withGenerateBtn = true;
    if (withGenerateBtn)
      return (
        <Block center>
          <Progress.Bar indeterminate={this.state.isLoading} />
          <Button
            enabled={!this.state.isLoading}
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => this.displayNumbers()}
          >
            Refresh
          </Button>
        </Block>
      );
  }

  renderNumbers = () => {

    return (
      <View style={styles.container}>
      <ScrollView>
        {/*Loop of JS which is like foreach loop*/}
        {this.items.map((item, key) => (
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={styles.item}>
            <Text style={styles.text}>{key}. {item}</Text>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
    )
  }

  renderCells = ({ item, index }) => {
    let colorbutton = item.selected
      ? materialTheme.COLORS.SUCCESS
      : materialTheme.COLORS.BUTTON_COLOR;
    return (
      <ScrollView style={styles.ScrollView}>
        <Block center style={styles.Block}>
          <Button style={styles.button} color={colorbutton}>
           <Text color={theme.COLORS.WHITE}> {item.value}</Text>
          </Button>
        </Block>
        </ScrollView>
    );
  };

  displayNumbers() {
    console.log('called props');
    //this.props.addFriend('Naman');
    var game = this.props.game;
    //console.log(game);
    if (game) {
      var url = `https://virtual-bingo.herokuapp.com/game/${game}`;
      //console.log(url);
      this.makeNetworkCall(url);
    }
   
   
  }

  generateNumber() {
    var game = this.props.game;
    if (game) {
      var url = `https://virtual-bingo.herokuapp.com/game/${game}/generate`;
      this.makeNetworkCall(url);
    }
  }

  makeNetworkCall(url) {
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
        if (responseJson && responseJson.length > 0) {
          console.log(responseJson);
          this.refreshNumbersOnTicket(responseJson);
          this.props.data.changeCalledNumbers(responseJson);

        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  refreshNumbersOnTicket(calledNumbers)
  {
    console.log(calledNumbers);
    if (this.state && this.state.gameData) {
      let newCalledOutNumbers = this.state.gameData.filter(
        (item) =>
          calledNumbers.includes(parseInt(item.value)) && item.selected == false
      );
      console.log(newCalledOutNumbers);
      if (newCalledOutNumbers) {
        for (let i = 0; i < newCalledOutNumbers.length; i++) {
          newCalledOutNumbers[i].selected = true;
          this.setState({ lastCalledNumber: newCalledOutNumbers[i].value });
        }
      }
      this.setState({ gameData: this.state.gameData });
        }
  }

  setNewNumbersInState(calledNumbers) {
    if (this.state && this.state.gameData) {
      let newCalledOutNumbers = this.state.gameData.filter(
        (item) =>
          calledNumbers.includes(parseInt(item.pos)) && item.selected == false
      );
      if (newCalledOutNumbers) {
        for (let i = 0; i < newCalledOutNumbers.length; i++) {
          newCalledOutNumbers[i].selected = true;
          this.setState({ lastCalledNumber: newCalledOutNumbers[i].pos });
        }
      }
      this.setState({ gameData: this.state.gameData });
    }
  }
}


const mapStateToProps = (state) => {
  const { games } = state
  return { games }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFriend,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BingoTicket));


const styles = StyleSheet.create({
  ScrollView: {
    borderColor: theme.COLORS.WHITE,
    borderWidth : 1,
  },
  button: {
    borderColor: theme.COLORS.WHITE,
    borderWidth : 1,
  },
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
