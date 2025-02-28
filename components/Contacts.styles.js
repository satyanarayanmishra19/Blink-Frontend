import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      // paddingVertical:20,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: -80,
    left: -20,
    paddingBottom: 10,
    marginTop: scaleSize(25)
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
    share: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    shareText: {
      color: '#007aff',
      fontSize: 16,
      marginLeft: 8,
    },
    list: {
      paddingHorizontal: 16,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
    },
    contactInfo: {
      flex: 1,
      gap: 5,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    idCode: {
      fontSize: 14,
      color: '#666',
    },
    phone: {
      fontSize: 14,
      color: '#007aff',
    },
    addButton: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#007aff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0E0E0',
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    bottom: -3,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  });

  export default styles