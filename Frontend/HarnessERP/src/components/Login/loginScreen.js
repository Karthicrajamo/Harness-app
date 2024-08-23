import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {AsyncStorage} from 'react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import styles from './loginScreenStyles';
import * as Keychain from 'react-native-keychain';
import LoadingIndicator from '../commonUtils/LoadingIndicator';
// import { API_URL } from '@env';
import {fetchApiUrl, API_URL} from '../ApiUrl';
import CustomAlert from '../common-utils/CustomAlert';
import {sharedData} from './UserId';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertValidVisible, setIsAlertValidVisible] = useState(false);

  useEffect(() => {
    fetchApiUrl().then(url => {
      console.log('Fetched API URL:', url);
    });
  }, []);

  const handleAlert = () => {
    // console.log('Showing Alert');
    setIsAlertVisible(!isAlertVisible);
  };
  const handleValid = () => {
    // console.log('Showing Alert');
    setIsAlertValidVisible(!isAlertValidVisible);
  };

  const handleLogin = async () => {
    try {
      // Check if username and password are entered
      if (!username || !Password) {
        handleAlert();
        // Alert.alert('Alert', 'Please enter username and password to proceed.');
        return;
      }

      setIsLoading(true); // Show loading indicator

      const requestBody = {
        userId: username,
        password: Password,
      };

      sharedData.userName = requestBody.userId;

      // Sending the POST request to fetch user credentials
      // console.log('api url full: ', `${API_URL}/api/v1/login`);
      // console.log('requestBody : ', requestBody);
      const response = await fetch(`${API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ',
        },
        body: JSON.stringify(requestBody),
      });
      // console.log(JSON.stringify(requestBody))

      if (!response.ok) {
        setIsLoading(false); //stop loading, if response status not ok.
        if (response.status === 401) {
          throw new Error('Failed to authenticate');
        } else {
          throw new Error('Failed to fetch data' + response.status);
        }
      }

      const authToken = response.headers.get('Authorization');
      // console.log('authToken' + authToken);
      saveToken(authToken);

      async function saveToken(token) {
        // try {
        // Save the token
        await Keychain.setGenericPassword('jwt', token, {service: 'jwt'});

        // console.log('Token saved successfully');

        const credentials = await Keychain.getGenericPassword({service: 'jwt'});
        // console.log('saved token : ', credentials.password);
      }

      const responseBody = await response.json();
      const privileges = responseBody.privileges;
      // console.log('Extracted Privileges from keychain', privileges);
      await savePrevileges(privileges);

      async function savePrevileges(privileges) {
        try {
          await Keychain.setGenericPassword(
            'privileges',
            JSON.stringify(privileges),
            {service: 'privileges'},
          );
          // console.log('Privileges Saved Succefully!!!');

          const savedPrivileges = await Keychain.getGenericPassword({
            service: 'privileges',
          });
          // console.log(
          //   'saved privilages are: ',
          //   JSON.parse(savedPrivileges.password),
          // );
        } catch (error) {
          throw new Error('Failed to log in', error);
        } finally {
          setIsLoading(false); // Always hide loading indicator after login attempt (success or failure)
          setUsername(''); // Clear input field after login
          setPassword(''); // Clear password field after login
          setChecked('');
        }
      }

      // Alert.alert('Success', 'Login successful');
      navigation.navigate('HomeScreen', {username});
    } catch (error) {
      setIsLoading(false); //stopping loading, if  network error happens,
      console.error('Error:', error);
      handleValid();
      // Alert.alert('Error', 'Invalid Username or Password');
    }
  };

  const handleResetpassword = async () => {
    navigation.navigate('ResetPassword');
  };

  // Loading indicator component
  // const LoadingIndicator = () => (
  //   <View style={styles.loadingContainer}>
  //     <ActivityIndicator size="large" color="#fff" />
  //     <Text style={styles.loadingText}>Loading...</Text>
  //   </View>
  // );
  return (
    <>
      {/* <ImageBackground
source={require('../../images/Group74.png')} // Replace with your image URL or local asset
style={styles.backgroundImage}> */}
      <Image
        style={styles.body}
        source={require('../../images/Background.png')}
      />
      <View style={{flex: 1, zIndex: 10, height: '100%'}}>
        <Text style={styles.headText}>
          {' '}
          Harness Digitech Private Limited ERP, {'\n'}
          “The Potential Of Technology”
        </Text>
        {/* <Image style={styles.headLogo} source={require('../../images/logo-removebg.png')} /> */}
        <Image
          style={styles.headLogoBg}
          source={require('../../images/logo.png')}
        />

        <View style={styles.logincontainer}>
          <Text style={styles.subHeadText}>
            JJ Mills Private Limited Bangladesh
          </Text>
          <Image
            style={styles.headLogoBg}
            source={require('../../images/logo.png')}
          />
          <View style={styles.subcontainer2}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#3788E5"
              onChangeText={text => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#3788E5"
              onChangeText={text => setPassword(text)}
              value={Password}
              secureTextEntry={true}
            />

            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
                containerStyle={styles.checkbox}
                checkedColor="black"
              />
              <Text style={styles.checkboxtext}>Keep me signed in</Text>
            </View>
            {/* <Button style={styles.login} title="Login" onPress={handleLogin} /> */}
            <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
              <Text style={styles.loginbuttonText}>LOGIN</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleResetpassword}>
              <Text style={styles.resetpassword}>Reset Password ?</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.footerContainer}>
            {/* <View>
              <Image
                style={styles.footerLogoBg}
                source={require('../../images/logo-removebg-footer.png')}
              />
              <Text style={styles.loginFooterText}>
                Harness Digitech Private Limited ERP, {'\n'}
                HRMS AND PAYROLL {'\n'}
                “The Potential Of Technology”
              </Text>
            </View> */}
            <View style={styles.foot}>
              <Text style={styles.version}>App Version 1.1.0</Text>
              <Image
                style={styles.footer}
                source={require('../../images/Ellipse-1.png')}></Image>
            </View>
          </View>
        </View>
        <CustomAlert
          visible={isAlertVisible}
          title={'Alert'}
          message={'Please enter username and password to proceed.'}
          onClose={handleAlert}
        />
        <CustomAlert
          visible={isAlertValidVisible}
          title={'Alert'}
          message={'Invalid Username or Password'}
          onClose={handleValid}
        />
      </View>
      {/* </ImageBackground> */}
    </>
  );
};

//   return (
//   <View  style={styles.maincontainer} >
//         <ImageBackground source={require('../../images/harness_background.png')} style={styles.background}>

//     <View style={styles.subcontainer1} >
//       {/* LOGO AND COMPANY NAME FOR JJ MILLS ADISHTAM */}

//       <View style={styles.companylogo}>
//             <Image source={require('../../images/logo.png')} style={styles.companylogocircle} />
//       </View>
//             <Text style={styles.companyname}>JJ Mills Private Limited Bangladesh</Text>

//       {/* LOGO AND COMPANY NAME FOR HARNESS-ERP */}

//       {/* <View style={styles.av_logo}>
//             <Image source={require('../../images/logo.png')} style={styles.circleImage} />
//       </View>
//             <Text style={styles.JJ}>Harness Digitech Private Limited</Text> */}

//     </View>

// <View style={styles.logincontainer}>
//   <View style={styles.subcontainer2}>
//     {/* <Text style={styles.username}>username</Text> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={(text) => setUsername(text)}
//         value={username}
//       />
//     {/* <Text style={styles.password}>password</Text> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={(text) => setPassword(text)}
//         value={Password}
//         secureTextEntry={true}
//       />

//   <View style={styles.checkboxContainer}>
//       <CheckBox
//         checked={checked}
//         onPress={() => setChecked(!checked)}
//         containerStyle={styles.checkbox}
//         checkedColor="white"
//       />
//       <Text style={styles.checkboxtext}>Keep me signed in</Text>
//   </View>
//       {/* <Button style={styles.login} title="Login" onPress={handleLogin} /> */}
//       <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
//             <Text style={styles.loginbuttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity  onPress={handleResetpassword}>
//             <Text style={styles.resetpassword}>Reset Password</Text>
//       </TouchableOpacity>
//   </View>
//   </View>

//   <View style={styles.harnessdetailscon}>
// {/* <View style={styles.harnesscontainer}> */}
//           <View style={styles.harnessimagecircle}>
//             <Image source={require('../../images/logo.png')} style={styles.harnessimage} />
//           </View>
//           <View style={styles.harnessdetailscontainer}>
//           <Text style={styles.harnessdetails}>Harness Digitech Private limited</Text>
//           <Text style={styles.harnessdetails}>ERP, HRMS AND PAYROLL</Text>
//           <Text style={styles.harnessdetails}>"The Potential Of technology"</Text>
//           <Text style={styles.harnessdetails}></Text>
//           <Text style={styles.harnessdetails}>App Version 1.2.6</Text>
//           </View>
// {/* </View> */}
//   </View>

//          </ImageBackground>
//          {isLoading && <LoadingIndicator />}
//   </View>

//   );
// };

export default LoginScreen;
