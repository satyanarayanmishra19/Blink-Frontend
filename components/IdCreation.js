import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Dimensions, Alert, StatusBar, Animated } from 'react-native';
import { GlobalContext } from './GlobalContext';
import { useFocusEffect } from '@react-navigation/native';
import styles from './IdCreation.styles';

const { width, height } = Dimensions.get('window');

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function GenerateIDScreen({ navigation }) {
  const [randomStrings, setRandomStrings] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [highlightedCharacters, setHighlightedCharacters] = useState({});
  const { updateUserData } = useContext(GlobalContext);

  const regenerateCharacters = () => {
    setSelectedCharacters([]);
    setHighlightedCharacters({});
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => handleGesture(gestureState),
  });

  const handleGesture = (gestureState) => {
    const { moveX, moveY } = gestureState;
    const characterInfo = getCharacterFromPosition(moveX, moveY);
    if (characterInfo && selectedCharacters.length < 8 && !selectedCharacters.includes(characterInfo.char)) {
      setSelectedCharacters((prev) => [...prev, characterInfo.char]);
      setHighlightedCharacters((prev) => ({
        ...prev,
        [`${characterInfo.rowIndex}-${characterInfo.charIndex}`]: true,
      }));
    }
  };

  const getCharacterFromPosition = (x, y) => {
    const cellWidth = (width * 0.8) / 16; // Assuming 15 characters per row
    const cellHeight = (height * 0.35) / randomStrings.length-4;
    const offsetX = (width - width * 0.8) / 2;
    const offsetY = height * 0.3;

    if (x < offsetX || x > offsetX + width * 0.8 || y < offsetY || y > offsetY + height * 0.35) {
      return null;
    }

    const colIndex = Math.floor((x - offsetX) / cellWidth);
    const rowIndex = Math.floor((y - offsetY) / cellHeight);

    if (rowIndex >= 0 && rowIndex < randomStrings.length && colIndex >= 0 && colIndex < randomStrings[rowIndex].length) {
      return { char: randomStrings[rowIndex][colIndex], rowIndex, charIndex: colIndex };
    }

    return null;
  };

  useEffect(() => {
    const arrayLength = Math.floor((width + height) / 100);
    const strings = Array.from({ length: arrayLength }, () => generateRandomString(15));
    setRandomStrings(strings);
  }, []);

  const handleNextPress = () => {
    if (selectedCharacters.length < 8) {
      Alert.alert('Selection Incomplete', 'Please select at least 8 characters to proceed.');
    } else {
      const idString = selectedCharacters.join('');
      console.log('Selected Characters:', idString);
      updateUserData({ id: idString });
      navigation.navigate('BlinkIDScreen');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      regenerateCharacters();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5f5f5" />
      <Text style={styles.title}>Move your finger on the screen to generate your Blink ID</Text>

      <View style={styles.progressContainer} {...panResponder.panHandlers}>
      <View style={[styles.corner, styles.topLeftCorner]} />
        <View style={[styles.corner, styles.topRightCorner]} />
        <View style={[styles.corner, styles.bottomLeftCorner]} />
        <View style={[styles.corner, styles.bottomRightCorner]} />
        {randomStrings.map((str, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {str.split('').map((char, charIndex) => {
              const isHighlighted = highlightedCharacters[`${rowIndex}-${charIndex}`];
              return (
                <Text
                  key={charIndex}
                  style={[
                    styles.text,
                    isHighlighted && { color: 'blue', fontWeight: 'bold' },
                  ]}
                >
                  {char}
                </Text>
              );
            })}
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>
        Selected Characters: {selectedCharacters.join('')}
      </Text>

      <TouchableOpacity
        style={[styles.button, selectedCharacters.length < 8 && styles.buttonDisabled]}
        onPress={handleNextPress}
        disabled={selectedCharacters.length < 8}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
