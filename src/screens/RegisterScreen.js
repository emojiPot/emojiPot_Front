import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image source={null} style={{width: wp(30), resizeMode: 'contain'}} />
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>회원가입</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput style={styles.inputField} placeholder={'아이디'} />
        <TextInput style={styles.inputField} placeholder={'비밀번호'} />
        <TextInput style={styles.inputField} placeholder={'비밀번호확인'} />
        <TextInput style={styles.inputField} placeholder={'이메일'} />
      </View>

      {/* 소셜로그인 따로 .js파일 만들어서 해야하나..? */}
      {/* 카카로 소셜 로그인으로 바꾸기 */}
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.kakaoBtn}>
            <Text style={(styles.Text, {color: 'black'})}>카카오회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 구글 소셩 로그인으로 바꾸기 */}
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.googleBtn}>
            <Text style={(styles.Text, {color: 'black'})}>구글회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn}>
            <Text style={(styles.Text, {color: 'white'})}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 2}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
    paddingTop: wp(2),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  TextArea: {
    flex: 0.3,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Text: {
    fontSize: wp('6%'),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
    paddingTop: wp(2),
  },

  formArea: {
    justifyContent: 'center',
    //paddingTop: wp(10),
    flex: 3,
  },

  inputField: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: wp(2),
  },

  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  kakaoBtn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE034',
  },
  googleBtn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default RegisterScreen;
