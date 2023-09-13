import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const CommentScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 제일 처음에 화면 출력할 때 db에서 댓글 리스트 가져와서 comments에 추가
  
  // 댓글 작성한 거 db에 전송
  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.commentItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor="#d3d3d3" 
          value={newComment}
          onChangeText={setNewComment}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleCommentSubmit}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#C4C1CC',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommentScreen;
