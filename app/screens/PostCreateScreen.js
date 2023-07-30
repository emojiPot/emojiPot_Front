import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PostCreateScreen = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(currentDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentArea}>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="위치를 입력하세요"
          />
          <View>
            <Button title="Show date picker!" />
          </View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentArea: {
    flex: 1,
    paddingTop: wp(5),
    paddingLeft: wp(5),
  },
});

export default PostCreateScreen;
