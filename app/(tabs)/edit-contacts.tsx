import { Center, Divider, Text, View } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';

import EditContactList from '@/components/EditContactList';

export default function TabTwoScreen() {
  return (
    <Center flex={1}>
      <Text fontSize={20} fontWeight="bold" pt={15}>
        Edit Quick Contacts
      </Text>
      <Divider my="$4" width="$4/6" />
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <EditContactList />
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
