import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import store from './store';
import TodoApp from './TodoApp'

export default function App() {
    return ( <
        Provider store = { store } >
        <
        TodoApp / >
        <
        /Provider>
    );
}

const styles = StyleSheet.create({});