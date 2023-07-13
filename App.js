import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './Components/Task';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [task, setTask] = useState('')
  const [taskItems, setTaskItems] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await AsyncStorage.getItem('tasks')
      if (response) {
        setTaskItems(JSON.parse(response))
      }
    }
    fetchTasks();
  }, [])

  const handleAddTask = async () => {
    Keyboard.dismiss()
    const save = async () => {
      try {
        setTaskItems([...taskItems, task])
        const jsonValue = JSON.stringify(taskItems)
        await AsyncStorage.setItem('tasks', jsonValue)
        setTask(null)
      } catch (e) {
        console.log(e)
      }
    }
    save()
  }

  const handleDelete = async (id) => {
    setTaskItems(taskItems.filter((item, index) => {
      return index !== id
    }))
    const save = async () => {
      try {
        const jsonValue = JSON.stringify(taskItems)
        await AsyncStorage.setItem('tasks', jsonValue)
      } catch (e) {
        console.log(e)
      }
    }
    save()
  }

  return (
    <View style={styles.container}>
      {/* todays tasks  */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <ScrollView style={styles.items}>
          {/* where the tasks will go  */}
          {
            taskItems?.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleDelete(index)}>
                <Task number={index} text={item} />
              </TouchableOpacity>

            ))
          }
        </ScrollView>
      </View>

      {/* Write a task here  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writingWrapper}

      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30
  },
  writingWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,

  },
  addText: {

  }
});
