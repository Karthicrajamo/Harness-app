import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import LoginScreen from './src/components/Login/loginScreen';
import {StyleSheet} from 'react-native';

import HomeScreen from './src/components/HomeScreen/homeScreen';
import ResetPassword from './src/components/ResetPassword/resetPassword';
import AssetListMainScreen from './src/components/AssetList/assetListMainScreen';
import AssetListSort from './src/components/AssetListSort/assetListSort';
import AssetListFilter from './src/components/AssetListFilter/assetListFilter';
import AssetListDetails from './src/components/AssetListDetails/assetListDetails';
import AssetListImage from './src/components/AssetListImage/assetListImage';
import AssetSkel from './src/components/AssetListDetails/AssetListDetailsSkeleton';
import {sharedData} from './src/components/Login/UserId';

import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {TouchableOpacity, BackHandler} from 'react-native';
import {Alert} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomThemeColors} from './src/components/CustomThemeColors';
import {createStackNavigator} from '@react-navigation/stack';
import {useState} from 'react';
import {moderateScale} from './src/components/themes/Metrics';
import {BackgroundImage} from 'react-native-elements/dist/config';
import * as Keychain from 'react-native-keychain';
import {useRoute} from '@react-navigation/native';
import QrScanner from './src/components/common-utils/QrScanner';
import ComponentWithCropFreeIcon from './src/components/commonUtils/ComponentWithCropFreeIcon';
import TestScreen from './src/components/common-utils/TestScreen';
import CustomTable from './src/components/common-utils/CustomTable';
import IssueGroups from './src/components/common-utils/IssueGroups';
import CustomLableValueComp from './src/components/common-utils/CustomLableValueComp';
import TableComponent from './src/components/common-utils/TableComponent';
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const App = () => {
  const navigationRef = React.useRef<any>(null);
  const renderRightHeaderIcon = () => (
    <View style={{marginRight: 15}}>
      {/* Logout icon on the right */}
      <TouchableOpacity>
        {/* <MaterialIcons  name="logout" size={25} color="#fff" /> */}
      </TouchableOpacity>
    </View>
  );
  // const handleMenuLogout = () => {
  //   const navigation = useNavigation();
  //   Alert.alert(
  //     'Confirmation',
  //     'Are you sure you want to logout?',
  //     [
  //       {
  //         text: 'No',
  //         onPress: () => console.log('Logout cancelled'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Yes',
  //         // onPress: () => CustomDrawerContent,
  //            onPress: () => navigation.navigate('LoginScreen'),
  //         // onPress: () => console.log('Logout Success'),

  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  // Handle back button press to prevent going back to LoginScreen from HomeScreen
  React.useEffect(() => {
    const backAction = () => {
      if (navigationRef.current) {
        const currentRoute = navigationRef.current.getCurrentRoute();
        if (currentRoute.name !== 'HomeScreen') {
          // navigationRef.current.navigate('HomeScreen'); // Go back to Homescreen if not on HomeScreen
          navigationRef.current.goBack(); // Go back to Homescreen if not on HomeScreen

          return true;
        } else if (currentRoute.name === 'HomeScreen') {
          // If already on HomeScreen, show exit confirmation
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('Exit Canceled');
                },
                style: 'cancel',
              },
              {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
          return true;
        }
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // const navigationRef = React.useRef(null);

  const CustomDrawerContent = ({navigation}) => {
    async function deleteSavedPrivileges() {
      try {
        await Keychain.resetGenericPassword({service: 'privileges'});
        console.log('Privileges Deleted Successfully!!!');
      } catch (error) {
        console.error('Error deleting privileges:', error);
      }
    }

    // const navigation = useNavigation();
    const handleMenuLogout = () => {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to logout?',
        [
          {
            text: 'No',
            onPress: () => console.log('Logout cancelled'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              await deleteSavedPrivileges();
              navigation.navigate('LoginScreen');
            },
            // onPress: () => console.log('Logout Success'),
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={[
            CustomThemeColors.gradientStart,
            CustomThemeColors.gradientEnd,
          ]}
          // colors={['#264e6d', '#598bb3']}
          style={styles.userDetailsContainer}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 2}}>
          {/* <ImageBackground source={require('../../images/harness_background.png')} style={styles.UserDetailsBackground}> */}
          <View style={styles.UserDetailsSubContainer}>
            <View>
              <View style={styles.UserDetailsIconContainer}>
                {/* <MaterialIcons name="account-circle" size={90} color="#fff"/> */}
                <MaterialIcons name="account-circle" size={90} color="white" />
              </View>
            </View>
            <View>
              <View style={styles.UserDetailsTextSection}>
                <Text style={styles.UserDetailsText}>
                  {sharedData.userName.charAt(0).toUpperCase() +
                    sharedData.userName.slice(1)}
                </Text>
                {/* <Text style={styles.UserDetailsText}>Sr.Manager</Text> */}
                {/* <Text style={styles.UserDetailsText}>Finance</Text> */}
              </View>
            </View>
          </View>
          {/* </ImageBackground> */}
        </LinearGradient>
        <DrawerContentScrollView style={{marginTop: 20}}>
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="home" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="home"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Home"
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="notifications-on" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="notifications-on"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Alerts"
            onPress={() => navigation.navigate('AlertScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="task" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="task"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Tasks"
            onPress={() => navigation.navigate('TaskScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="bar-chart" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="bar-chart"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Notes"
            onPress={() => navigation.navigate('NoteScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="notes" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="notes"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Charts"
            onPress={() => navigation.navigate('ChartScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="approval" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="approval"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Approval"
            onPress={() => navigation.navigate('ApprovalScreen')}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="logout" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="logout"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Logout"
            // onPress={() => navigation.navigate('LogoutScreen')}
            onPress={handleMenuLogout}
          />
          <DrawerItem
            // icon={({ color, size }) => <MaterialIcons name="logout" color={color} size={size} />}
            icon={({size}) => (
              <MaterialIcons
                name="reset"
                color={CustomThemeColors.menuIconColor}
                size={size}
              />
            )}
            label="Reset"
            // onPress={() => navigation.navigate('LogoutScreen')}
            onPress={() => navigation.navigate('ResetPassword')}
          />
          <View>
            <Text></Text>
            <Text style={{left: 20, fontWeight: 'bold'}}>Ver: 1.1.0</Text>
          </View>

          {/* Add more DrawerItem components for other menu items */}
        </DrawerContentScrollView>
      </View>
    );
  };

  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Drawer.Navigator
        initialRouteName="LoginScreen"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'white', // Change this color to your desired background color
            width: 300, // Optional: Specify the width of the drawer
          },
          headerShown: false,
        }}>
        <Drawer.Screen name="HomeDrawer">
          {() => (
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen
                name="CustomLable"
                component={CustomLableValueComp}
                options={{headerShown: false}}
              /> */}
              {/* <Stack.Screen
                name="IssueGroups"
                component={IssueGroups}
                options={{headerShown: false}}
              /> */}
              <Stack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen
                name="TableComponent"
                component={TableComponent}
                options={{headerShown: false}}
              /> */}
              {/* <Stack.Screen
                name="CustomTable"
                component={CustomTable}
                options={{headerShown: false}}
                /> */}
              {/* <Stack.Screen
                name="ResetPassword"  
                component={ResetPassword}
                options={{headerShown: false}}
              />  */}
              {/* <Stack.Screen
                name="AssectSkel"
                component={AssetSkel}
              /> */}
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({navigation}) => ({
                  headerTitle: 'MY DASHBOARD',
                  headerStyle: {
                    backgroundColor: CustomThemeColors.header,
                    height: 30,
                    // backgroundColor: "red",
                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    fontSize: moderateScale(18),
                    color: '#3788E5',
                  },
                  headerRight: () => renderRightHeaderIcon(),
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                      <MaterialIcons
                        name="menu"
                        size={moderateScale(24)}
                        color={CustomThemeColors.humBurgerIconColor}
                        style={{marginLeft: 15}}
                      />
                    </TouchableOpacity>
                  ),
                  headerTitleAlign: 'center',
                })}
              />

              {/* <Stack.Screen 
                name="ResetPassword" 
                component={ResetPassword} 
                options={{ headerShown: false }} 
              /> */}
              {/* <Stack.Screen 
                name="AssetListMainScreen" 
                component={AssetListMainScreen} 
                options={{ headerShown: false }} 
              /> */}

              <Stack.Screen
                name="AssetListSort"
                component={AssetListSort}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AssetListFilter"
                component={AssetListFilter}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AssetListDetails"
                component={AssetListDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AssetListImage"
                component={AssetListImage}
                options={{headerShown: false}}
              />
              {/* <Stack.Screen name="ComponentWithCropFreeIcon" component={ComponentWithCropFreeIcon} options={{ headerShown: false }} /> */}
              <Stack.Screen
                name="AssetListMainScreen"
                component={AssetListMainScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="QrScanner"
                component={QrScanner}
                options={{headerShown: false}}
              />

              {/* Add other screens here */}
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  userDetailsContainer: {
    // borderRadius:10,
    // borderRadius:20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 0,
    width: 270,

    left: 15,
    top: 15,
    marginBottom: 10,
  },
  UserDetailsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
    maxHeight: 50,
    overflow: 'hidden',
  },
  UserDetailsTextSection: {
    alignItems: 'center',
    maxWidth: 150,
  },
  UserDetailsIconContainer: {
    right: 10,
  },
  UserDetailsSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // left:'100%',
  },
});

export default App;
