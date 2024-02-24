import { Text, Center, Divider } from '@gluestack-ui/themed';

import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabThreeScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab Three</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="app/(tabs)/three.tsx" />
    // </View>
    // fix the theme token so i don't have to manually set background color
    <Center flex={1} bg="$white" $dark-bg="$black">
      <Text fontSize={20} fontWeight="bold">
        Tab Three
      </Text>
      <Divider my={30} height={1} width="80%" />
      <EditScreenInfo path="app/(tabs)/three.tsx" />
    </Center>
  );
}
