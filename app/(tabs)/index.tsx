import { Box, Center, Divider, Heading } from '@gluestack-ui/themed';

import SendSMSContactList from '@/components/SendSMSContactList';

export default function TabOneScreen() {
  return (
    <Box flex={1}>
      {/* <Text fontSize={20} fontWeight="bold" pt={15}>
        Situation Gate
      </Text> */}
      <Center>
        <Heading size="xl" pl="$4" pt="$3" pb="$0">
          Situation Gate
        </Heading>
        <Divider my="$4" width="80%" />
      </Center>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <SendSMSContactList />
      {/* <GenerateSMS /> */}
    </Box>
  );
}
