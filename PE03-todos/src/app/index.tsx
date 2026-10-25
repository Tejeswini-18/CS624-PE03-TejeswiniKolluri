
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Keyboard,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type Filter = 'All' | 'Active' | 'Completed';

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Review React Native components', completed: true },
    { id: '2', title: 'Complete PE03 assignment', completed: false },
    { id: '3', title: 'Test the app on Expo Go', completed: false },
  ]);

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  const progress =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const addTodo = () => {
    const title = input.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
    };

    setTodos((current) => [...current, newTodo]);
    console.log('New todo added:', newTodo.title);
    setInput('');
    Keyboard.dismiss();
  };

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#102747" />

      <FlatList
        data={visibleTodos}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {/* Navy blue header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.eyebrow}>YOUR PERSONAL SPACE</Text>
                  <Text style={styles.heading}>My Todos</Text>
                  <Text style={styles.headerSubtitle}>
                    Plan your day. Make it count.
                  </Text>
                </View>

                <View style={styles.headerIcon}>
                  <Text style={styles.headerCheck}>✓</Text>
                </View>
              </View>

              <View style={styles.headerBottom}>
                <View>
                  <Text style={styles.headerSmall}>TASKS COMPLETED</Text>
                  <Text style={styles.headerProgress}>
                    {completedCount} of {todos.length}
                  </Text>
                </View>

                <View style={styles.headerPercent}>
                  <Text style={styles.headerPercentText}>{progress}%</Text>
                </View>
              </View>

              <View style={styles.headerTrack}>
                <View
                  style={[styles.headerFill, { width: `${progress}%` }]}
                />
              </View>
            </View>

            {/* Task summary */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <View style={[styles.statIcon, styles.blueIcon]}>
                  <Text style={styles.blueIconText}>☰</Text>
                </View>
                <Text style={styles.statNumber}>{todos.length}</Text>
                <Text style={styles.statLabel}>Total tasks</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIcon, styles.orangeIcon]}>
                  <Text style={styles.orangeIconText}>◷</Text>
                </View>
                <Text style={styles.statNumber}>{remainingCount}</Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIcon, styles.greenIcon]}>
                  <Text style={styles.greenIconText}>✓</Text>
                </View>
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>

            {/* Add task */}
            <Text style={styles.sectionHeading}>Create a task</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.input}
                placeholder="What needs to be done?"
                placeholderTextColor="#929EAF"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={addTodo}
                returnKeyType="done"
                accessibilityLabel="New task"
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={addTodo}
                accessibilityRole="button"
                accessibilityLabel="Add task"
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.listHeadingRow}>
              <Text style={styles.sectionHeading}>Your tasks</Text>
              <Text style={styles.taskCount}>
                {visibleTodos.length} shown
              </Text>
            </View>

            <View style={styles.filterRow}>
              {(['All', 'Active', 'Completed'] as Filter[]).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.filterChip,
                    filter === item && styles.filterChipSelected,
                  ]}
                  onPress={() => setFilter(item)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: filter === item }}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === item && styles.filterTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => toggleTodo(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: item.completed }}
          >
            <View
              style={[
                styles.taskNumber,
                item.completed && styles.taskNumberDone,
              ]}
            >
              <Text
                style={[
                  styles.taskNumberText,
                  item.completed && styles.taskNumberTextDone,
                ]}
              >
                {String(index + 1).padStart(2, '0')}
              </Text>
            </View>

            <View style={styles.taskDetails}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleDone,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskStatus}>
                {item.completed ? 'Completed' : 'In progress'}
              </Text>
            </View>

            <View
              style={[
                styles.checkbox,
                item.completed && styles.checkboxDone,
              ]}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptySubtitle}>
              Try another filter or create a new task above.
            </Text>
          </View>
        }
        ListFooterComponent={
          <Text style={styles.footer}>
            ONE TASK AT A TIME  •  YOU'VE GOT THIS
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  content: {
    paddingBottom: 28,
  },

  // Navy blue header
  header: {
    backgroundColor: '#102747',
    paddingHorizontal: 23,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#A9BEDA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 9,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: '#C5D2E3',
    fontSize: 13,
    marginTop: 7,
  },
  headerIcon: {
    width: 51,
    height: 51,
    borderRadius: 17,
    backgroundColor: '#254466',
    borderWidth: 1,
    borderColor: '#3D5B7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCheck: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  headerSmall: {
    color: '#A9BEDA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 5,
  },
  headerProgress: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
  },
  headerPercent: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#254466',
  },
  headerPercentText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  headerTrack: {
    height: 6,
    backgroundColor: '#354E6C',
    borderRadius: 8,
    marginTop: 17,
    overflow: 'hidden',
  },
  headerFill: {
    height: '100%',
    backgroundColor: '#72B7F2',
    borderRadius: 8,
  },

  // Summary cards
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    marginTop: 19,
    marginBottom: 26,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 14,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: '#E7ECF3',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  blueIcon: {
    backgroundColor: '#E7F0FF',
  },
  orangeIcon: {
    backgroundColor: '#FFF0DE',
  },
  greenIcon: {
    backgroundColor: '#E2F7EC',
  },
  blueIconText: {
    color: '#3268B2',
    fontSize: 17,
    fontWeight: '800',
  },
  orangeIconText: {
    color: '#D98229',
    fontSize: 18,
    fontWeight: '800',
  },
  greenIconText: {
    color: '#23965B',
    fontSize: 17,
    fontWeight: '800',
  },
  statNumber: {
    color: '#142C4B',
    fontSize: 23,
    fontWeight: '800',
  },
  statLabel: {
    color: '#7C899B',
    fontSize: 10,
    marginTop: 4,
  },

  // Input and filters
  sectionHeading: {
    color: '#142C4B',
    fontSize: 18,
    fontWeight: '800',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 27,
    padding: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4EAF2',
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#142C4B',
  },
  addButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#102747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 32,
  },
  listHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 13,
  },
  taskCount: {
    color: '#7C899B',
    fontSize: 12,
  },
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    gap: 9,
  },
  filterChip: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 11,
    backgroundColor: '#E6EBF3',
  },
  filterChipSelected: {
    backgroundColor: '#102747',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6F7E92',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },

  // Task cards
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6EBF2',
  },
  taskNumber: {
    width: 42,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E9F0FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  taskNumberDone: {
    backgroundColor: '#E2F6EB',
  },
  taskNumberText: {
    color: '#244E7D',
    fontSize: 12,
    fontWeight: '800',
  },
  taskNumberTextDone: {
    color: '#23965B',
  },
  taskDetails: {
    flex: 1,
    paddingRight: 8,
  },
  taskTitle: {
    color: '#25364D',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  taskTitleDone: {
    color: '#929EAF',
    textDecorationLine: 'line-through',
  },
  taskStatus: {
    color: '#8996A8',
    fontSize: 11,
    marginTop: 5,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1.5,
    borderColor: '#C8D2E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#279B62',
    borderColor: '#279B62',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 28,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E6EBF2',
  },
  emptyIcon: {
    color: '#244E7D',
    fontSize: 30,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#142C4B',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 7,
  },
  emptySubtitle: {
    color: '#8996A8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
  },
  footer: {
    color: '#98A4B5',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    paddingTop: 23,
    paddingHorizontal: 10,
  },
});
