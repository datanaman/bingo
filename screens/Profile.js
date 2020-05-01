import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme , Input , Button} from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, BingoTicket } from '../components';
import { Images, materialTheme , MasterData } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { connect } from 'react-redux';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  state = {
    gameStatus: 'Not Started',
    gameId: null,
    calledNumbers: ['Refresh','To','Check','Called Out Numbers'],
    txtInputGameId : null,
  }
  componentDidMount() {
    //this.setState({ gameId: 5140 });
  }

  startGame()
  {
    this.setState({ gameId: this.state.txtInputGameId });
    this.setState({ gameStatus:'ON' });
  }

  changeCalledNumbers(item)
  {
    this.setState({calledNumbers: item});
    console.log(this.state.calledNumbers);
  }

  renderNumbers = () => {
    if(this.state.gameId)
    return (
      <View style={styles.container}>
      <ScrollView>
         
        {/*Loop of JS which is like foreach loop*/}
        {this.state.calledNumbers.map((item, key) => (
          //key is the index of the array 
          //item is the single item of the array
          <View key={key}>
            <Text color={theme.COLORS.MUTED} size={32} muted style={styles.seller}>{item}</Text>
            
          </View>
        ))}
      </ScrollView>
    </View>
    )
    else
    return;
  }

  onChangeText(text)
  {
    this.setState({txtInputGameId: text});
  }

  renderGameStart = () => {
    if(!this.state.gameId)
    return (
      <View style={styles.container}>
         <Input
         //label= "Please EnterEnter Game"
         type= "number-pad"
        right
        color="black"
        style={styles.search}
        placeholder="Enter Game ID"
        onChangeText={text => this.onChangeText(text)}
        //onFocus={() => navigation.navigate('Pro')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" 
        family="entypo"/>}
      />
    <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => this.startGame()}>
                Start Game
              </Button>
    </View>
    )
  }

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: Images.Profile}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex row style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>GAME</Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">{this.state.gameStatus}</Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>ID</Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                    {this.state.gameId} <Icon name="shape-star" family="GalioExtra" size={14} />
                    </Text>
                  </Block>
                </Block>  
              </Block>
              <Block style={styles.profileTexts}> 
            
               {this.renderGameStart()}
               {this.renderNumbers()}
                   
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />        
            </Block>
           
          </ImageBackground>
        </Block>
       
        <Block flex style={styles.options}>
        <BingoTicket game={this.state.gameId} 
          data={ {calledNumbers: this.state.calledNumbers,
             changeCalledNumbers: this.changeCalledNumbers.bind(this)
          }}></BingoTicket>
          <ScrollView showsVerticalScrollIndicator={false}>
         
           </ScrollView>
        </Block>
      </Block>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //paddingTop: 40,
    //justifyContent: 'flex-end',
    alignSelf: 'flex-end'

  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
    width: '50%',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE -20,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  item_separator:
  {
    height: 1,
    width: '100%',
    backgroundColor: '#263238',
  },
});

const mapStateToProps = (state) => {
  const { games } = state
  return { games }
};


export default connect(mapStateToProps)(Profile);