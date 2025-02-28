import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F6ED4',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(8),
    borderRadius: 10,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(0),
    paddingHorizontal: scaleSize(5),
    paddingVertical: 10,
    marginTop: scaleSize(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: scaleSize(8),
  },
  cancelButton: {
    color: '#007aff',
    fontSize: 16,
  },
  okButton:{
    color: '#007aff',
    fontSize: 16,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'monospace',
  },
  closeButton: {
    backgroundColor: '#1F6ED4',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeModal: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#000',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10),
    alignItems: 'center',
  },
  detailTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  detailName:{
    fontSize: 16
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#e5e5e5',
    marginVertical: 15,
  },
  dropdown: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    padding: scaleSize(14),
    marginTop: 8,
    color: '#7A7A7A',
    width: '87%',
  },
  editButton: {
    marginTop: 10,
    padding: 6,
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
  enlargedImage: {
    width: scaleSize(300),
    height: scaleSize(300),
    borderRadius: scaleSize(10),
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  linkedDetailsSection: {
    marginTop: scaleSize(30),
    marginBottom: scaleSize(10),
    paddingHorizontal: scaleSize(20),
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    height: 370,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#e0f0ff',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPublicKeyBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  privacySection: {
    marginTop: scaleSize(10),
    paddingHorizontal: scaleSize(20),
  },
  profileID: {
    marginTop: scaleSize(10),
    fontSize: scaleSize(18),
    color: '#7A7A7A',
  },
  profileIDValue: {
    fontSize: scaleSize(20),
    fontWeight: 'bold',
    color: '#1F6ED4',
  },
  profileImage: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(50),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(10),
    paddingHorizontal: scaleSize(20),

  },
  profileSectionTitle: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
    paddingHorizontal: scaleSize(20),
    marginTop: scaleSize(30),
  },
  publicKeyButton: {
    marginTop: scaleSize(20),
    width: scaleSize(250),
    paddingVertical: scaleSize(20),
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
  },
  publicKeyText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 16
  },
  logOutButton: {
    marginTop: scaleSize(20),
    width: scaleSize(150),
    paddingVertical: scaleSize(20),
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    
  },
  logOutText: {
    color: 'red',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: 5,
    paddingHorizontal: 80,
  },
  searchIcon: {
    marginRight: 10,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: scaleSize(22),
    fontWeight: 'bold',
    marginBottom: scaleSize(8),
    color: '#3498db',
  },
  shareButton: {
    marginTop: scaleSize(10),
    padding: scaleSize(8),
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
  shareText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tokenContainer: {
    width: '100%',
    height: 130,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    borderWidth: 2,
    borderColor: '#1F6ED4',
  },
  tokenText: {
    color: '#1F6ED4',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardsButton: {
    alignSelf: 'flex-start',
  },
  rewardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  coinsText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#B8860B',
  },
});

export default styles;
