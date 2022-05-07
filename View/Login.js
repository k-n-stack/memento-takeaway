import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Dimensions, Button, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import { login, setStatus, setUserThreads } from '../Store/Features/userSlice';
import { setIsLogin } from '../Store/Features/navigationSlice';
import { setView } from '../Store/Features/navigationSlice';
import { autoLogin } from '../Store/Features/userSlice';

import * as SecureStore from 'expo-secure-store';

// async function getValueFor(k"stmn_token" {
//   return await SecureStore.getItemAsync(key);
// }


const Login = () => {

  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginStatus = useSelector((state) => (state.user.status));

  const handleLogin = () => {
    dispatch(login({
      email: "global@stackmemento.com",
      password: "password",
    }));
    // dispatch(login({
    //   email: email,
    //   password: password,
    // }));
  }

  useEffect(() => {

    if (loginStatus === "pending login") {
    }

    if (loginStatus === "unauthenticated") {
      setErrorMessage("Email do not exist or wrong password");
      dispatch(setStatus(''));
    }

    if (loginStatus === 'authenticated') {
      dispatch(setStatus(""));
      dispatch(setIsLogin(true));
      dispatch(setView("myThreads"));
    }

  });

  useEffect(() => {
    SecureStore.getItemAsync("stmn_token").then(function (res) {
      if (res === null) {
        // alert('no token');
      } else {
        // alert('got token : ' + res);
        dispatch(autoLogin());
        dispatch(setStatus(""));
        dispatch(setIsLogin(true));
        dispatch(setView("myThreads"));
      }
    })
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={['#8299ce', '#694896']}
          // colors={['#3261cf', '#694896']}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.background}
        >
        </LinearGradient>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.titleIconContainer}>
          <View style={styles.iconContainer}>
            <Svg width="100%" height="100%" viewBox="0 0 772 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0 83.5294C0 37.3974 37.6487 0 84.0906 0C130.533 0 168.181 37.3974 168.181 83.5294C168.181 125.668 136.768 160.519 95.9344 166.237V243.529C104.654 322.141 115.549 355.852 161.075 371.177V224.706C161.075 208.462 174.332 195.294 190.684 195.294H535.337C551.69 195.294 564.947 208.462 564.947 224.706V380L604.481 379.999C612.181 341.756 646.172 312.941 686.938 312.941C733.379 312.941 771.028 350.339 771.028 396.471C771.028 442.603 733.379 480 686.938 480C643.398 480 607.449 445.65 603.143 403.529H564.947V470.588C564.947 486.832 551.69 500 535.337 500H190.684C174.332 500 161.075 486.832 161.075 470.588V394.118C126.454 384.868 112.522 372.984 95.3422 344.118V499.412H72.8391V166.318C31.7171 160.856 0 125.872 0 83.5294ZM249.903 236.471H204.897C201.626 236.471 198.975 239.104 198.975 242.353V320C198.975 323.249 201.626 325.882 204.897 325.882H249.903C253.174 325.882 255.825 323.249 255.825 320V242.353C255.825 239.104 253.174 236.471 249.903 236.471ZM402.687 236.471H357.681C354.411 236.471 351.759 239.104 351.759 242.353V320C351.759 323.249 354.411 325.882 357.681 325.882H402.687C405.958 325.882 408.609 323.249 408.609 320V242.353C408.609 239.104 405.958 236.471 402.687 236.471ZM502.175 415.294H204.897C201.626 415.294 198.975 417.928 198.975 421.176V435.294C198.975 438.543 201.626 441.176 204.897 441.176H502.175C505.446 441.176 508.097 438.543 508.097 435.294V421.176C508.097 417.928 505.446 415.294 502.175 415.294ZM502.175 381.177H204.897C201.626 381.177 198.975 383.81 198.975 387.059V401.177C198.975 404.425 201.626 407.059 204.897 407.059H502.175C505.446 407.059 508.097 404.425 508.097 401.177V387.059C508.097 383.81 505.446 381.177 502.175 381.177ZM502.175 449.412H204.897C201.626 449.412 198.975 452.045 198.975 455.294V469.412C198.975 472.661 201.626 475.294 204.897 475.294H502.175C505.446 475.294 508.097 472.661 508.097 469.412V455.294C508.097 452.045 505.446 449.412 502.175 449.412Z" 
                fill="rgba(255, 255, 255, 0.8)"
              />
            </Svg>
          </View>
          <Text style={styles.title}>Stack-memento</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput 
            onChangeText={(text) => {
              setEmail(text);
            }} 
            style={styles.emailInput}
            placeholder='Email'
            placeholderTextColor="rgba(255, 255, 255, 0.6)" 
            autoComplete='email'
          />
            
          <View style={styles.passwordInputContainer}>
            <TextInput 
              onChangeText={(text) => {
                setPassword(text);
              }} 
              style={styles.passwordInput}
              placeholder='Password'
              placeholderTextColor="rgba(255, 255, 255, 0.6)" 
              secureTextEntry={hidePassword}
              autoComplete="password"
            />

            <TouchableWithoutFeedback onPress={() => {
              setHidePassword(!hidePassword);
            }}>
              <View style={styles.showPassword}>
                  <View style={styles.eyeIconContainer}>
                    {
                      hidePassword ?                    
                      <Svg width="100%" height="100%" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.5 0.25C5.02948 0.25 0.820293 5.0695 0.820293 5.0695L0.430481 5.5L0.820293 5.9305C0.820293 5.9305 4.65804 10.3064 9.7617 10.7093C10.0052 10.7395 10.2486 10.75 10.5 10.75C10.7513 10.75 10.9948 10.7395 11.2383 10.7087C16.3419 10.3064 20.1797 5.93116 20.1797 5.93116L20.5695 5.5L20.1797 5.0695C20.1797 5.0695 15.9705 0.25 10.5 0.25ZM10.5 1.5625C11.9457 1.5625 13.2785 1.95756 14.4375 2.48519C14.869 3.19607 15.096 4.01217 15.0937 4.84375C15.0965 5.97498 14.6815 7.06741 13.9283 7.91144C13.1751 8.75547 12.1368 9.29166 11.0125 9.41716C10.9994 9.41978 10.9843 9.41453 10.9718 9.41716C10.815 9.42437 10.6588 9.4375 10.5 9.4375C10.3254 9.4375 10.1568 9.427 9.98745 9.41716C8.8632 9.29166 7.82487 8.75547 7.07167 7.91144C6.31847 7.06741 5.90345 5.97498 5.90623 4.84375C5.90623 3.98734 6.13723 3.19 6.54214 2.50553H6.52179C7.68926 1.96741 9.03851 1.5625 10.5 1.5625ZM10.5 2.875C9.97766 2.87517 9.4768 3.08283 9.10759 3.45229C8.73838 3.82175 8.53106 4.32274 8.53123 4.84506C8.5314 5.36738 8.73906 5.86824 9.10852 6.23745C9.47798 6.60666 9.97897 6.81399 10.5013 6.81381C10.7599 6.81373 11.016 6.7627 11.2549 6.66365C11.4938 6.5646 11.7109 6.41946 11.8937 6.23652C12.0765 6.05359 12.2215 5.83643 12.3204 5.59746C12.4193 5.35849 12.4701 5.10238 12.47 4.84375C12.47 4.58512 12.4189 4.32905 12.3199 4.09014C12.2208 3.85123 12.0757 3.63418 11.8928 3.45136C11.7098 3.26855 11.4927 3.12355 11.2537 3.02466C11.0147 2.92577 10.7586 2.87491 10.5 2.875V2.875ZM4.75779 3.49056C4.6511 3.93379 4.59605 4.38787 4.59373 4.84375C4.59373 5.99481 4.92186 7.07172 5.49607 7.98128C4.3311 7.29882 3.2621 6.46441 2.3172 5.5C3.06104 4.74957 3.87871 4.07613 4.75779 3.48991V3.49056ZM16.2422 3.49056C17.1212 4.07658 17.9389 4.7498 18.6828 5.5C17.7379 6.46441 16.6689 7.29882 15.5039 7.98128C16.0958 7.04204 16.4088 5.95396 16.4062 4.84375C16.4062 4.37453 16.3445 3.92631 16.2422 3.48991V3.49056Z" fill="rgba(255, 255, 255, 0.7)"/>
                      </Svg> :
                      <Svg width="100%" height="100%" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.01229 0L1.07639 0.935905L5.10227 4.93903L13.5371 13.3739L17.9877 17.8453L18.923 16.91L14.7969 12.7846C17.4622 11.4279 19.4485 9.51449 19.5733 9.38961L20 8.96361L19.5935 8.49533C19.4251 8.30087 15.4597 3.71955 9.99968 3.71955C8.70411 3.71955 7.49699 3.99141 6.40239 4.3901L2.01229 0ZM9.99968 5.02032C11.4071 5.02032 12.7053 5.38129 13.8617 5.89444C14.3007 6.61052 14.5524 7.4261 14.5524 8.27225C14.5524 9.45335 14.0971 10.5284 13.3531 11.3414L11.504 9.49172C11.7882 9.14839 11.9459 8.71792 11.9508 8.27225C11.9508 7.19781 11.0741 6.32109 9.99968 6.32109C9.55391 6.32607 9.12339 6.48404 8.7802 6.76856L7.43846 5.42682C8.24494 5.18552 9.09564 5.02032 9.99968 5.02032ZM3.90231 5.58941C1.79636 6.88238 0.500797 8.38412 0.406491 8.49598L0 8.96361L0.426653 9.39026C0.612013 9.57562 4.86033 13.7244 9.38961 14.0847H9.43059C9.6192 14.1004 9.81171 14.1257 9.99968 14.1257C10.1883 14.1257 10.3808 14.0997 10.5688 14.0847H10.6097C11.1312 14.0411 11.648 13.9528 12.1544 13.8207L11.0357 12.7033C10.8731 12.741 10.6982 12.7664 10.5284 12.7846L10.4471 12.8041C10.1415 12.8302 9.85529 12.8302 9.55286 12.8041L9.49172 12.7846C8.38024 12.6624 7.35293 12.1344 6.60658 11.3018C5.86023 10.4692 5.44733 9.39043 5.44698 8.27225C5.44698 7.92429 5.4899 7.58935 5.56925 7.2557L3.90231 5.58941ZM4.32897 6.87002C4.21062 7.32814 4.14923 7.7991 4.14621 8.27225C4.14621 9.32132 4.43108 10.3021 4.91886 11.1587C3.81527 10.4958 2.77427 9.73383 1.80872 8.88231C2.57866 8.12812 3.42305 7.45391 4.32897 6.87002V6.87002ZM15.6704 6.87002C16.5719 7.45874 17.4096 8.13991 18.1698 8.90247C17.2108 9.74699 16.1768 10.5022 15.0805 11.1587C15.5854 10.2804 15.8518 9.28532 15.8531 8.27225C15.8484 7.79922 15.7871 7.32846 15.6704 6.87002V6.87002ZM9.99968 7.62187C10.3574 7.62187 10.6501 7.91454 10.6501 8.27225C10.6501 8.37891 10.6143 8.46737 10.5688 8.55712L9.71481 7.70316C9.80159 7.65295 9.89946 7.62501 9.99968 7.62187V7.62187Z" fill="rgba(255, 255, 255, 0.7)"/>
                      </Svg>
                    }
                  </View>
              </View>
            </TouchableWithoutFeedback> 
          </View>

          <TouchableHighlight onPress={() => {
            handleLogin();
          }}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>Login</Text>
            </View>
          </TouchableHighlight>

          <View>
            <Text>{errorMessage}</Text>
          </View>
          


          {/* <TouchableHighlight onPress={() => {
            alert('clicked');
            dispatch(setUserThreads());
          }}>
            <View style={{
              backgroundColor: "red",
              width: 100,
              height: 100,
            }}>
              <Text>hello test</Text>
            </View>
          </TouchableHighlight> */}

        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    // backgroundColor: 'green'
  },
  background: {
    width: "100%",
    height: "100%",
  },
  titleIconContainer: {
    marginTop: 80,
    marginBottom: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  headerText: {
    // color: 'rgba(255, 255, 255, 0.6)',
    color: '#FFF',
    fontSize: 20,
    fontWeight: "bold"
  },
  iconContainer: {
    width: 80,
    height: 80,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.8)',
    // color: '#EEE',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    // 
    // backgroundColor: 'red', 
  },
  emailInput: {
    color: '#EEE',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    height: 30,
    fontSize: 15,
    marginBottom: 30,
  },
  passwordInputContainer: {
    marginBottom: 50,
  },
  passwordInput: {
    color: '#EEE',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    height: 30,
    fontSize: 15,
  },
  showPassword: {
    flex: 1,
    // backgroundColor: 'rgba(145, 34, 144, 0.3)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 80,
    height: 60,
  },
  eyeIconContainer: {
    width: 30,
    height: 30,
  },
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  backgroundContainer: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  submit: {
    backgroundColor: '#99D17E',
    width: 200,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    elevation: 4,
  },
  submitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});


export default Login;