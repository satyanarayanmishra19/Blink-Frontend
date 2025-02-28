import { 
  Image, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  PixelRatio 
} from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375; // Base width of 375 for scaling (common for many devices)

// Helper function for scaling sizes
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={require('../assets/images/Blink_BG-Mid.png')}
        style={styles.reactLogo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Let's Get Started</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>
          Blink protects your privacy more rigorously than any other messenger.
        </Text>
        {/* <Text style={styles.stepText}>
          Find out more in our{' '}
          <Text style={styles.linkText}>Privacy Policy.</Text>
        </Text> */}
      </View>

      {/* Main content container */}
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('GenerateIDScreen')}
        >
          <Text style={styles.startButtonText}>Create a New Account</Text>
        </TouchableOpacity>
        <View style={styles.restoreContainer}>
          <Text style={styles.restoreText}>Existing User? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(20),
  },
  titleText: {
    fontSize: normalize(25),
    fontWeight: 'bold',
  },
  stepContainer: {
    marginBottom: normalize(10),
    paddingHorizontal: normalize(20),
    gap: normalize(8),
  },
  stepText: {
    fontSize: normalize(14),
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: normalize(14),
  },
  reactLogo: {
    height: height * 0.35,
    width: width,
    resizeMode: 'cover',
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(100),
    borderRadius: normalize(30),
    alignItems: 'center',
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  restoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(20),
    justifyContent: 'center',
  },
  restoreText: {
    fontSize: normalize(14),
  },
  contentContainer: {
    marginTop: height * 0.2,
  },
});
