import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import CustomImage from '../../components/CustomImage';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Profile = () => {
  const userName = useSelector((state: RootState) => state.users.userName);
  const userImg = useSelector((state: RootState) => state.users.profilePic);
  const userEmail = useSelector((state: RootState) => state.users.email);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="light-content" />
      <View style={styles.textHeader}>
        <Text style={styles.textTitle}>My profile</Text>
      </View>
      <View style={styles.personalDetails}>
        <View>
          <CustomImage
            source={{uri: userImg}}
            style={{
              borderRadius: 32,
              width: 64,
              height: 64,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.nameStyle}>{userName}</Text>
          <Text style={styles.emailStyle}>{userEmail}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    marginTop: 86,
    marginLeft: 14,
  },
  textTitle: {
    fontWeight: '700',
    fontFamily: 'Metropolis-Bold',
    color: '#222222',
    fontSize: 30,
  },
  personalDetails: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 14,
    justifyContent: 'flex-start',
  },
  nameStyle: {
    color: '#222222',
    fontFamily: 'Metropolis-Medium',
    fontSize: 18,
  },
  emailStyle: {
    color: '#9b9b9b',
    fontFamily: 'Metropolis-Medium',
    fontSize: 18,
  },
});
