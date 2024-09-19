import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from '../../components/CustomImage';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import firestore from '@react-native-firebase/firestore';
import {addUser} from '../../redux/usersSlice';
import {userProps} from '../../navigations/types';
interface SignInProps {
  navigation?: any;
}

const {width} = Dimensions.get('window');

const SignIn = ({navigation}: SignInProps) => {
  const [email, setEmail] = useState<string>();
  const [isFocusedEmail, setIsFocusedEmail] = useState<boolean | undefined>(
    false,
  );
  const [isBlurredEmail, setIsBlurredEmail] = useState<boolean | undefined>(
    false,
  );
  const [validEmail, setValidEmail] = useState<boolean | undefined>(false);
  const [password, setPassWord] = useState<string | undefined>();
  const [isFocusedPassword, setIsFocusedPassword] = useState<
    boolean | undefined
  >(false);
  const [isBlurredPassword, setIsBlurredPassword] = useState<
    boolean | undefined
  >(false);
  const [validPassword, setValidPassword] = useState<boolean | undefined>(
    false,
  );
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [userDetails, setUserDetails] = useState<userProps>();
  const dispatch = useDispatch();
  const emailError = 'please enter valid email';
  const passwordError =
    'please enter valid password including special characters';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    emailRegex.test(email) ? setValidEmail(true) : setValidEmail(false);
    passwordRegex.test(password)
      ? setValidPassword(true)
      : setValidPassword(false);
  }, [email, password]);

  const signInHandler = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const uid = userCredential.user.uid;
        try {
          const userDocument = await firestore()
            .collection('Users')
            .doc(uid)
            .get();
          const userData = {...userDocument.data(), uid: uid};
          if (userDocument.exists) {
            console.log('userDocument.data', userDocument.data());
            dispatch(addUser(userData as userProps));
          } else {
            console.log('No such document');
          }
        } catch (error) {
          console.log('error', error);
        }
        // console.log('userDetails',userDetails)
        navigation.navigate('home');
      })
      .catch(error => {
        const errorCode = error.code;
        console.log('error', error);
        const errorMessage = error.message;
      });
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.backImgView]}
        activeOpacity={1}
        onPress={() => navigation.goBack()}>
        <CustomImage
          style={styles.backImg}
          source={require('../../assets/img/icon.jpg')}
        />
      </TouchableOpacity>
      <View style={[styles.signInView]}>
        <Text style={[styles.signInText]}>Login</Text>
      </View>
      <View style={styles.textInputs}>
        <View style={styles.email}>
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsBlurredEmail(true)}
            isFocus={isFocusedEmail}
            isBlur={isBlurredEmail}
            validity={validEmail}
            maxLength={30}
          />
          <View style={{backgroundColor: '#F9F9F9'}}>
            {isBlurredEmail && !validEmail && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
          </View>
        </View>
        <View style={styles.password}>
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassWord}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsBlurredPassword(true)}
            isFocus={isFocusedPassword}
            isBlur={isBlurredPassword}
            validity={validPassword}
            maxLength={15}
          />
          <View style={{backgroundColor: '#F9F9F9'}}>
            {isBlurredPassword && !validPassword && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.haveAccount}>
        <Text style={styles.haveAccountText}>Forgot your password ?</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.8}>
            <Image source={require('../../assets/img/right_arrow.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        title="Login"
        textColor="white"
        backgroundColor="#DB3022"
        onPress={signInHandler}
        textStyle={styles.textButtonStyle}
        buttonStyle={[styles.buttonStyle]}
      />
      <View
        style={[
          styles.signUpFooter,
          {marginBottom: keyboardHeight > 0 ? -1 * keyboardHeight : 20},
        ]}>
        <View style={styles.textFooterView}>
          <Text style={styles.textFooter}>Or sign up with social account</Text>
        </View>
        <View style={styles.footerImgs}>
          <CustomButton
            source={require('../../assets/img/Google.png')}
            imgStyle={styles.googleImg}
            buttonStyle={styles.footerImg}
            backgroundColor="white"
            isImg
          />
          <CustomButton
            source={require('../../assets/img/Facebook.png')}
            imgStyle={styles.googleImg}
            buttonStyle={styles.footerImg}
            backgroundColor="white"
            isImg
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  backImgView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 40,
    height: undefined,
    aspectRatio: 1.2,
    marginTop: 52,
    marginLeft: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  backImg: {
    width: '80%',
    aspectRatio: 1,
  },
  signInView: {
    justifyContent: 'flex-start',
    marginTop: 30,
    marginStart: 10,
  },
  signInText: {
    fontSize: width * 0.07,
    color: '#222222',
    fontFamily: 'Metropolis-Bold',
  },
  textInputs: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 73,
    gap: width * 0.04,
    marginStart: 20,
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.04,
    marginLeft: width * 0.04,
    marginTop: width * 0.01,
  },
  email: {},
  password: {},
  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  haveAccountText: {
    marginStart: 160,
    color: '#222222',
    fontSize: width * 0.045,
    fontFamily: 'Metropolis-Medium',
    marginTop: 12,
  },
  buttonStyle: {
    marginStart: 16,
    marginTop: 23,
    margin: 'auto',
    width: width * 0.94,
    borderRadius: 50,
    padding: 20,
  },
  textButtonStyle: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'Metropolis-Medium',
  },
  signUpFooter: {
    flexDirection: 'column',
    width: width,
  },
  textFooter: {
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Metropolis-Medium',
  },
  textFooterView: {
    marginStart: 86,
  },
  googleImg: {},
  footerImgs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
