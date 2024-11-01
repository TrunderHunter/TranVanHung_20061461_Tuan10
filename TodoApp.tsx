import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser, editUser } from './userSlice';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ fullname: '', job: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ fullname: '', job: '' });
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSaveEditUser = () => {
    dispatch(editUser(selectedUser));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {/* Thêm user mới */}
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
        <Button title="Add User" onPress={handleAddUser} />
      </View>

      {/* Danh sách users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <TouchableOpacity onPress={() => handleEditUser(item)} style={{ flex: 1 }}>
              <Text>{item.fullname}</Text>
              <Text>{item.job}</Text>
            </TouchableOpacity>
            <Button title="Delete" color="red" onPress={() => handleDeleteUser(item.id)} />
          </View>
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
          <Button title="Save Changes" onPress={handleSaveEditUser} />
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
  userContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
});

export default TodoApp;
