import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const TodoApp = () => {
  // State cho danh sách users và modal
  const [users, setUsers] = useState([{ id: 1, fullname: 'John Doe', job: 'Engineer' }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ fullname: '', job: '' });

  // Thêm người dùng mới
  const addUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ fullname: '', job: '' });
  };

  // Hiển thị modal chỉnh sửa
  const editUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Lưu thông tin sau khi chỉnh sửa
  const saveEditUser = () => {
    setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      {/* Thêm người dùng mới */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          value={newUser.fullname}
          onChangeText={(text) => setNewUser({ ...newUser, fullname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Job"
          value={newUser.job}
          onChangeText={(text) => setNewUser({ ...newUser, job: text })}
        />
        <Button title="Add User" onPress={addUser} />
      </View>

      {/* Danh sách users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => editUser(item)}>
            <View style={styles.userContainer}>
              <Text>{item.fullname}</Text>
              <Text>{item.job}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal chỉnh sửa user */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Edit User</Text>
          <TextInput
            style={styles.input}
            placeholder="Fullname"
            value={selectedUser?.fullname}
            onChangeText={(text) => setSelectedUser({ ...selectedUser, fullname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Job"
            value={selectedUser?.job}
            onChangeText={(text) => setSelectedUser({ ...selectedUser, job: text })}
          />
          <Button title="Save Changes" onPress={saveEditUser} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
  userContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
});

export default TodoApp;
