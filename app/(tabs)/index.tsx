import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import GenerateSMS from '@/components/GenerateSMS';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Situation Gate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={styles.simpleContainer}>
        <Text
          style={styles.friendlyText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          SMS here stuf
        </Text>
      </View>
      <GenerateSMS />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  friendlyText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  simpleContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});
