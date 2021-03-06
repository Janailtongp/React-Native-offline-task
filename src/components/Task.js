import React from 'react'
import {StyleSheet,
     Text, 
     View, 
     TouchableWithoutFeedback,
     TouchableOpacity,
} from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Swipeable from 'react-native-swipeable'

export default props => {
    let check = null 
    if(props.doneAt !== null){
        check = (
            <View style={styles.done}>
                <Entypo name="check" 
                    size={20} 
                    color={commonStyles.colors.secondary}/>
            </View> 
        )
    }else{
        check = <View style={styles.pending} />        
    }

    const descStyle = props.doneAt !== null ?
        {textDecorationLine: 'line-through'} : {}
    
    //Conteúdo exibido ao arrastar para a esqurda
    const leftContent =(
        <View style={styles.exlude}>
            <Ionicons name='md-trash' size={20} color='#FFF' />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )
    //Conteúdo exibido ao arrastar para a Direira
    const rightContent =[
        <TouchableOpacity
            style={[styles.exlude, {justifyContent:'flex-start', paddingLeft: 20}]}
            onPress={()=>props.onDelete(props.id)}>
            <Ionicons name='md-trash' size={20} color='#FFF' />
        </TouchableOpacity>
    ]    

    return(
        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={()=> props.onDelete(props.id)}
            leftContent={leftContent} rightButtons={rightContent}>

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=> props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={styles.date}>
                        {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        height: 50,
    },
    checkContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending:{
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    exlude:{
     flex:1,
     backgroundColor: commonStyles.colors.today,
     flexDirection: 'row',
     justifyContent: 'flex-end',
     alignItems: 'center',   
    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    }
})