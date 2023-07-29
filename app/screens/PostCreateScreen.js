import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PostCreateScreen = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
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
            <Button onPress={showDatePicker} title="Show date picker!" />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={date}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
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
