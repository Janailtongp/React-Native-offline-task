import React, {Component} from 'react'
import {
    StyleSheet, 
    Text, 
    View, 
    ImageBackground, 
    Platform, 
    FlatList,
    Alert,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import * as Font from 'expo-font';
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import { Ionicons } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

console.disableYellowBox = true
//console.ignoredYellowBox[ 'Warning' ];

export default class Agenda extends Component{
    state = {
        fontLoaded: false,
        tasks: [],
        visibleTasks: [],
        showDoneTask: true,
        showAddTask: false,
      };
      
     //Carrega as fontes externas imediatamente após a renderização do componente
      async componentDidMount() {
        await Font.loadAsync({
          'outwrite': require('../../assets/fonts/Outwrite.ttf'),
          'lato': require('../../assets/fonts/Lato.ttf'),
        });
        this.setState({ fontLoaded: true });
        const data = await AsyncStorage.getItem('tasks')
        const tasks = JSON.parse(data) || []
        this.setState({tasks}, this.filterTasks)
    
      }
    addTask = task =>{
        const tasks = [... this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })
        this.setState({tasks: tasks, showAddTask:false}, this.filterTasks)
    }

     //Filta as tasks que serão exibidas (concluidas ou pendentes) de acordo com o 'showDoneTask'
     filterTasks = () =>{
         let visibleTasks = null
         if(this.state.showDoneTask){
             visibleTasks = [... this.state.tasks]
         }else{
             const pendding = task => task.doneAt === null
             visibleTasks = this.state.tasks.filter(pendding)
         }
         this.setState({visibleTasks: visibleTasks})
         AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
     }   
    //Altera o estado do filtro e chama a função de filtragem
     toggleFilter = () =>{
         this.setState({showDoneTask: !this.state.showDoneTask}, this.filterTasks)
     }

     //Realizaa troca do Checked e Unchecked  
      toggleTask = id => {
          const tasks = [... this.state.tasks]
          tasks.forEach(task => {
              if(task.id === id){
                  task.doneAt = task.doneAt ? null : new Date()
              }
          })
          this.setState({ tasks: tasks }, this.filterTasks)
      }

    //função para deltar a Tarefa
      deleteTask = id =>{
          const tasks = this.state.tasks.filter(task => task.id !== id)
          this.setState({tasks}, this.filterTasks)
      }
    render(){
        if(this.state.fontLoaded){
            return (
                <View style={StyleSheet.container}>
                    <AddTask isVisible={this.state.showAddTask} onSave={this.addTask}
                        onCancel={() => this.setState({showAddTask:false})} />

                    <ImageBackground source={todayImage} style={styles.backgroud}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Ionicons name={this.state.showDoneTask ? 'ios-eye': 'ios-eye-off'} 
                                size={30} color={commonStyles.colors.secondary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>
                                {moment().locale('pt-br').format('ddd, D [de] MMM')}
                            </Text>    
                        </View>
                    </ImageBackground>

                    <View style={styles.taskContainer}>
                       
                            <FlatList data={this.state.visibleTasks} 
                                keyExtractor={item => `${item.id}`} 
                                renderItem={({ item }) => 
                                <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>} 
                            />
                        
                            {/* {Alert.alert('Flat!',this.state.tasks[0].doneAt.toString())} */}
                    </View>
                    <ActionButton buttonColor={commonStyles.colors.today} onPress={() => {this.setState({showAddTask: true }) }} />
                </View>
            )
        }else{
            return (
            <View style={styles.carregando}>
                <Text style={{fontSize: 20, color: '#fff'}}>Carregando ... 
                    <Ionicons name='ios-hourglass' size={30} />
                </Text>
                <Text style={{fontSize: 15, color: '#fff'}}>Janailton - App. Hybrid</Text>
            </View>)
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
    },
    backgroud:{
        marginTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        height: (Dimensions.get('window').height/10) *2
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end',
        width: '60%'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer:{
        height: (Dimensions.get('window').height/10) *7.6
    },
    carregando:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b13b44',
    },
    iconBar:{
      marginTop: Platform.OS === 'ios' ? 30 : 10,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }

})