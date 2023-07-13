import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Task = ({ text, number }) => {


  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}>
          <Text style={styles.number}>{number}</Text>
        </TouchableOpacity>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.circular}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:20,
  },
  itemLeft: {
    flexDirection:"row",
    alignItems:"center",
    flexWrap:"wrap"
  },
  square: {
    width:24,
    height:24,
    backgroundColor:"lightblue",
    opacity:0.4,
    borderRadius:53,
    marginRight:15,
    alignItems:"center",
    justifyContent:"center",
    color: "#FFFFFF",

  },
  itemText: {
      maxWidth: "80%",
  },
  circular: {
    width:12,
    height:12,
    borderWidth:2,
    borderRadius:5,
    borderColor:"lightblue",
  },
  number:{
    color: '#000',
    fontWeight:"bold",
    fontSize:17,
  }
})

export default Task
