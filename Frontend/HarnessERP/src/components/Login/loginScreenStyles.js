import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../themes/Metrics';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    top: 0,
    height: width < 600 ? hp('100') : hp('85'),
    width: '100%',
    zIndex: 10,
  },
  footer: {
    // position: 'absolute',
    bottom: 0,
    zIndex: 1,
    height:width < 600 ? 40 : 80,
    width:'100%',
  }, 
  footerContainer:{
    // flex:1
    marginTop:width > 600 && 210 
  },
  foot: {
    // flex:1,
    // justifyContent:'flex-end',
    // marginTop:verticalScale(29),

    marginTop: width < 600 ? hp('18.3%') : hp('20%'),
  },
  version: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    color:'white',
    zIndex: 10,
  },
  version1: {
    position: 'absolute',
    bottom: 9,
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 10,
  },
  headText: {
    textAlign: 'center',
    top: 45,
    fontSize: 20,
    color: 'white',
  },
  subHeadText: {
    textAlign: 'center',
    top: 45,
    fontSize: 20,
    color: 'black',
  },
  headLogo: {
    // position: 'absolute',
    top: 60,
    alignSelf: 'center',
    zIndex: 10,
    width: 100,
    height: 100,
  },

  headLogoBg: {
    // position: 'absolute',
    width: width < 600 ? wp('15%') : wp('9%'),
    height: width < 600 ? hp('7%') : hp('5.5%'),
    borderRadius: wp('10%'),
    backgroundColor: 'rgba(255, 255, 255, 255)',
    // position: 'absolute',
    top: hp('5%'), // 2% of screen height
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
  },
  footerLogoBg: {
    // position: 'absolute',
    width: width < 600 ? wp('15%') : wp('10%'),
    height: width < 600 ? hp('7%') : hp('6%'),
    borderRadius: wp('10%'),
    borderWidth: 1,
    borderColor: '#3788E5',
    marginBottom: 10,
    // backgroundColor: 'rgba(55, 136, 229, 0.74)',
    // position: 'absolute',
    // top: hp('5%'), // 2% of screen height
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',

    // top:90
  },
  logincontainer: {
    // position: 'absolute',
    // left:0,
    // right:0,
    // top:250,
    top: 100,
    bottom: 0,
  },
  subcontainer2: {
    alignItems: 'center',
    marginTop:60
  },
  input: {
    width: wp('80%'),
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginVertical: hp('2%'),
    opacity: 1,
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: hp('2%'),
    right: wp('32%'),
  },
  checkbox: {
    left: width < 600 ? wp('8%') : wp('2%'),
  },
  checkboxtext: {
    color: '#8E98A8',
    fontSize: moderateScale(12),
    left: horizontalScale(12),
  },
  loginbutton: {
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#3788E5',
    bottom: hp('2%'),
    width: wp('80%'),
    paddingVertical: 10,
    height: verticalScale(49),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbuttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat_700Bold',
  },
  resetpassword: {
    color: '#3788E5',
    bottom: hp('1.2%'), // 2% of screen height
    alignSelf: 'center',
    marginBottom: 35,
  },
  loginFooterText: {
    color: 'black',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    position:'relative'
    // resizeMode: 'cover', 
    // width:800,
    // height:900,
    // justifyContent: 'center',
  },
});

{/* <ImageBackground
source={require('../../images/Group74.png')} // Replace with your image URL or local asset
style={styles.backgroundImage}>
{/* <Image
  style={styles.body}
  source={require('../../images/Group74.png')}
/> */}

// </ImageBackground> */}
// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   subcontainer1: {
//     flex: 1,
//   },
//   companylogo: {
//     width: width < 600 ?  wp('15%') :  wp('10%'),
//     height: width < 600 ?  hp('7%') :  hp('6%'),
//     borderRadius: wp('10%'),
//     backgroundColor: 'rgba(255, 255, 255, 255)',
//     position: 'absolute',
//     top: hp('5%'), // 2% of screen height
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   companylogocircle: {
//     width: '70%',
//     height: '70%',
//     resizeMode: 'contain',
//     position: 'absolute',
//   },
//   companyname: {
//     color: 'white',
//     fontSize: wp('3%'),
//     fontSize: width < 600 ?  wp('5%') :  wp('3%'),
//     top: hp('12%'),
//   },
//   logincontainer :{
//     position: 'absolute',
//     // flex: 1,
//   },
//   subcontainer2: {
//     // justifyContent: 'center',
//     alignItems: 'center',
//     // top:30,
//   },
//   input: {
//     width: wp('80%'),
//     borderRadius: 3,
//     marginVertical: hp('2%'),
//     opacity:1,
//     backgroundColor: 'white',
//     padding: 1,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     bottom: hp('2%'),
//     right: wp('32%'),
//   },
//   checkbox: {
//     left: width < 600 ?  wp('8%') :  wp('2%'),
//   },
//   checkboxtext: {
//     color: 'white',
//     fontSize: width < 600 ?  wp('3%') :  wp('2%'),
//     left: width < 600 ?  wp('4%') :  wp('0%'),
//   },
//   loginbutton: {
//     backgroundColor: 'white',
//     borderRadius: wp('7%'),
//     bottom: hp('2%'),
//     width: wp('40%'),
//     height: hp('3%'),
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginbuttonText: {
//     color: 'skyblue',
//     fontWeight: 'bold',
//     fontSize: wp('3%'),
//   },
//   resetpassword: {
//     color: 'white',
//     bottom: hp('1.5%'), // 2% of screen height
//     alignSelf: 'center',
//   },
//   harnessimage: {
//     width: '70%',
//     height: '70%',
//     resizeMode: 'contain',
//     position: 'absolute',
//   },
//   harnessdetailscon :{
//     flex: 1,
//   },
//   harnessimagecircle: {
//     position: 'absolute',
//     width: width < 600 ?  wp('15%') :  wp('10%'),
//     height: width < 600 ?  hp('7%') :  hp('6%'),
//     borderRadius: wp('10%'),
//     backgroundColor: 'rgba(255, 255, 255, 255)',
//     top: width < 600 ?  hp('15%') :  hp('10%'),
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   harnessdetailscontainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     // top: hp('8%'), // 8% of screen height
//     width: wp('90%'), // 90% of screen width
//   },
//   harnessdetails: {
//     color: 'white',
//     fontSize: width < 600 ?  wp('4%') :  wp('2%'),
//     top: width < 600 ?  wp('49%') :  wp('27%'),
//   },
//   loadingContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

// });

export default styles;
