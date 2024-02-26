import { Center, Divider, Text } from '@gluestack-ui/themed';

import EditContactList from '@/components/EditContactList';

export default function TabTwoScreen() {
  return (
    <Center flex={1}>
      <Text fontSize={20} fontWeight="bold" pt={15}>
        Edit Quick Contacts
      </Text>
      <Divider my="$4" width="80%" />
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <EditContactList />
    </Center>
  );
}
