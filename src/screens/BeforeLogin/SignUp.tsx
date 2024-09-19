import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import CustomImage from '../../components/CustomImage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {addUser} from '../../redux/usersSlice';
import {userProps} from '../../navigations/types';
import {useMutation} from 'react-query';

const {width} = Dimensions.get('window');
interface SignUpProps {
  navigation: any;
}
interface signUpHandlerProps {
  email: string;
  password: string;
}

const SignUp = ({navigation}: SignUpProps) => {
  const [userName, setUserName] = useState<string | undefined>();
  const [isFocusedName, setIsFocusedName] = useState<boolean | undefined>(
    false,
  );
  const [isBlurredName, setIsBlurredName] = useState<boolean | undefined>(
    false,
  );
  const [validUsername, setValidUsername] = useState<boolean | undefined>(
    false,
  );
  const [email, setEmail] = useState<string>();
  const [isFocusedEmail, setIsFocusedEmail] = useState<boolean | undefined>(
    false,
  );
  const [isBlurredEmail, setIsBlurredEmail] = useState<boolean | undefined>(
    false,
  );
  const [validEmail, setValidEmail] = useState<boolean | undefined>(false);
  const [password, setPassWord] = useState<string>();
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
  const [signUpStatus, setSignUpStatus] = useState<String | undefined>('');
  const nameError = 'please enter name more than 7 characters';
  const emailError = 'please enter valid email';
  const passwordError =
    'please enter valid password including special characters';
  const nameRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    nameRegex.test(userName) ? setValidUsername(true) : setValidUsername(false);
    emailRegex.test(email) ? setValidEmail(true) : setValidEmail(false);
    passwordRegex.test(password)
      ? setValidPassword(true)
      : setValidPassword(false);
  }, [userName, email, password]);

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

  const signUpHandler = async ({
    email,
    password,
  }: signUpHandlerProps): Promise<void> => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const userId = res.user.uid;
        await firestore().collection('Users').doc(userId).set({
          userName: userName,
          email: email,
          profilePic: '',
        });
        const userData: userProps = {
          userName: userName,
          email: email,
          profilePic: '',
        };
        dispatch(addUser(userData));
        setSignUpStatus('');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setSignUpStatus('email is already in use');
        }

        if (error.code === 'auth/invalid-email') {
          setSignUpStatus('That email address is invalid!');
        }
        console.error(error);
      });
  };
  const userMutation = useMutation<void, Error, signUpHandlerProps>(
    signUpHandler,
    {
      onSuccess: () => {
        console.log('user Added successfully');
      },
      onError: (error: any) => {
        console.error('Error creating user:', error.message);
      },
    },
  );
  const handleSignUp = () => {
    userMutation.mutate({email, password});
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.backImgView]} activeOpacity={1}>
        <CustomImage
          style={styles.backImg}
          source={require('../../assets/img/icon.jpg')}
        />
      </TouchableOpacity>
      <View style={[styles.signUpView]}>
        <Text style={[styles.signUpText]}>Sign up</Text>
      </View>
      <View style={styles.textInputs}>
        <View style={styles.name}>
          <CustomTextInput
            label="Name"
            value={userName}
            onChangeText={setUserName}
            onFocus={() => setIsFocusedName(true)}
            onBlur={() => setIsBlurredName(true)}
            isFocus={isFocusedName}
            isBlur={isBlurredName}
            validity={validUsername}
            maxLength={20}
          />
          <View style={{backgroundColor: '#F9F9F9'}}>
            {isBlurredName && !validUsername && (
              <Text style={styles.errorText}>{nameError}</Text>
            )}
          </View>
        </View>
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
        <Text style={styles.haveAccountText}>Already have account ?</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.8}>
            <Image source={require('../../assets/img/right_arrow.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10, marginStart: 30}}>
        <Text style={{fontSize: 18, color: 'red'}}>{signUpStatus}</Text>
      </View>
      <CustomButton
        title="sign up"
        textColor="white"
        backgroundColor="#DB3022"
        onPress={handleSignUp}
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

export default SignUp;

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
  signUpView: {
    justifyContent: 'flex-start',
    marginTop: 30,
    marginStart: 10,
  },
  signUpText: {
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
  footerImg: {},
});
