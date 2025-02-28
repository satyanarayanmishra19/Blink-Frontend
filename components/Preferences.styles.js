import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 50,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#1a3c79',
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'left',
      marginBottom: 20,
      color: '#606060',
      marginTop: 20,
    },
    list: {
      flex: 1,
      marginBottom: 130, // Ensure space for the button
    },
    grid: {
      flexGrow: 1,
    },
    row: {
      justifyContent: 'space-between',
    },
    preferenceContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Softer background color
    padding: 20, // Slightly less padding for a cleaner look
    margin: 10, // Increased margin for better spacing
    borderRadius: 12, // Increased border radius for smoother corners
    alignItems: 'flex-start',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Subtle shadow offset
    shadowOpacity: 0.1, // Reduced shadow opacity for a lighter feel
    shadowRadius: 6, // Slightly softer shadow radius
    // Elevation for Android
    elevation: 8,
    borderWidth: 1, // Added border for definition
    borderColor: '#e0e0e0', // Light border color for a clean look
  },

    selectedPreference: {
      backgroundColor: '#3498db',
    },
    preferenceTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    preferenceDescription: {
      fontSize: 12,
      color: '#666',
      marginTop: 8,
    },
    finishButton: {
      position: 'absolute',
      bottom: 50,
      width: '90%',
      height: 50,
      backgroundColor: '#3498db',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    finishButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  export default styles