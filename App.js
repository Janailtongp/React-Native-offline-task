import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as Font from 'expo-font';
import commonStyles from  './src/commonStyles'
import Task from './src/components/Task'

export default class App extends Component{
  state = {
    fontLoaded: false,
    tasks: [
      {id: Math.random(), desc: 'Compra curso de react native',
          estimateAt: new Date(), doneAt: new Date() },
      {id: Math.random(), desc: 'Concluir o Curso', 
          estimateAt: new Date(), doneAt: null},
      {id: Math.random(), desc: 'Compra curso de react native',
          estimateAt: new Date(), doneAt: new Date() },
      {id: Math.random(), desc: 'Concluir o Curso', 
          estimateAt: new Date(), doneAt: null},
      {id: Math.random(), desc: 'Compra curso de react native',
          estimateAt: new Date(), doneAt: new Date() },
      {id: Math.random(), desc: 'Concluir o Curso', 
          estimateAt: new Date(), doneAt: null},
      {id: Math.random(), desc: 'Compra curso de react native',
          estimateAt: new Date(), doneAt: new Date() },
      {id: Math.random(), desc: 'Concluir o Curso', 
          estimateAt: new Date(), doneAt: null},
  ]
  };

  async componentDidMount() {
    await Font.loadAsync({
      'outwrite': require('./assets/fonts/Outwrite.ttf'),
      'lato': require('./assets/fonts/Lato.ttf'),
    });

    this.setState({ fontLoaded: true });

  }


  render(){
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? ( 
        // <Text style={styles.texto}>Janailton Galvão Pereira!</Text>

        <FlatList data={this.state.tasks} 
        keyExtractor={item => `${item.id}`} 
        renderItem={({ item }) => <Task {...item}/>} />

        ):null}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    fontFamily: commonStyles.fontFamily,
    fontSize:15,
  }
});
