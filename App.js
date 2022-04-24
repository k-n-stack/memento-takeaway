import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={styles.statusBar} translucent={false} backgroundColor="white"/>
      <LinearGradient
        colors={['#3261cf', '#694896']}
        start={[0,1]}
        end={[1,0]}
        style={styles.background}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Sign in with Facebook</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: "100%",
    height: "100%",
  },
  statusBar: {
    backgroundColor: 'red',
  }
});
