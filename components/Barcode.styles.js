import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  scannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#007AFF'
  },
  instructionContainer: {
      alignItems: 'center',
      top: 20,
      gap: 10,
    },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 20,
      width: '50%'
    },

    shareText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  logo: {
    width: 100,
    height: 100,
  },
});


  export default styles