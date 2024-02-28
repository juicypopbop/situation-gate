import { Text, Center, Divider, Box, Heading } from '@gluestack-ui/themed';

import EditScreenInfo from '@/components/EditScreenInfo';
import SettingsPage from '@/components/SettingsPage';

export default function SettingsTabScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab Three</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="app/(tabs)/three.tsx" />
    // </View>
    // fix the theme token so i don't have to manually set background color
    <Box flex={1} bg="$white" $dark-bg="$black">
      <Center>
        <Heading size="lg" pt="$2" pb="$0">
          Settings
        </Heading>
        <Divider my={30} height={1} width="80%" />
      </Center>
      <SettingsPage />
    </Box>
  );
}
