import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Help.styles';


const Help = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
  // Sample FAQ data
  const faqData = [
    {
      category: 'App Informative',
      questions: [
        'What do the symbols next to a message mean?',
        'How do I use Blink on desktop computer?',
        'Why are some of my friends missing on my Blink contact list?',
        'How can I reinstall Blink without paying again?',
        'Why are incoming messages sometimes delayed or only arrive once I open the app?',
      ],
    },
    {
      category: 'General Queries',
      questions: [
        'What do the symbols next to a message mean?',
        'How do I use Blink on desktop computer?',
        'Why are some of my friends missing on my Blink contact list?',
      ],
    },
  ];

  const filteredFaqData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(question =>
      question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })); 


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
        <View style={{ width: 24 }} />
      </View>

    

      <ScrollView style={styles.mainContent}>
        {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View> 
        {/* FAQ Section */}
        {faqData.map((section, index) => (
          <View key={index}>
            {/* Category Title */}
            <Text style={styles.categoryTitle}>{section.category}</Text>

            {/* Questions List */}
            {section.questions.map((question, qIndex) => (
              <TouchableOpacity key={qIndex} style={styles.questionContainer}>
                <Text style={styles.questionText}>{question}</Text>
                <Icon name="chevron-right" size={24} color="#aaa" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;
