import React, { useState } from 'react';
import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Görev ekleme işlevi
  const addTask = () => {
    if (text.length > 0) {
      const newTask = {
        id: tasks.length + 1,
        text: text,
        isCompleted: false
      };
      setTasks([...tasks, newTask]);
      setText('');
    }
  };

  // Görevin uzun basmayla tamamlanma durumunu değiştirme işlevi
  const handleLongPress = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Tamamlanmamış görevlerin sayısını hesaplama
  const incompleteTasksCount = tasks.filter(task => !task.isCompleted).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head_container}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.title}>{incompleteTasksCount}</Text>
      </View>      

      <FlatList 
        style={styles.task_list}
        data={tasks}
        renderItem={({ item }) => 
          <Pressable 
            onLongPress={() => handleLongPress(item.id)} 
            delayLongPress={2000}
            style={[styles.task, item.isCompleted && styles.completedTask]}>
            <Text style={[styles.taskText, item.isCompleted && styles.completedText]}>
              {item.text}
            </Text>
          </Pressable>}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <View style={styles.foot_container}>
        <TextInput 
          style={styles.input} 
          placeholder='Yapılacak...' 
          value={text} 
          onChangeText={setText} 
        />
        <Button 
          title='Kaydet' 
          onPress={addTask} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004445',
    justifyContent: 'center',
  },
  head_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f8b400'
  },
  task: {
    fontSize: 18,
    backgroundColor: '#6ec189',
    margin: 10,
    padding: 6,
    borderRadius: 8,
    color: 'white'
  },
  foot_container: {
    backgroundColor: '#55c59d',
    margin: 10,
    padding: 20,
    borderRadius: 12
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8b400',
    marginBottom: 10,
    fontSize: 18,
    padding: 10
  },
  completedTask: {
    backgroundColor: '#ff5a5f', // Uzun basıldığında arka plan rengini değiştir
  },
  taskText: {
    fontSize: 20,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through', // Uzun basıldığında yazının üstünü çiz
  }
  
});
