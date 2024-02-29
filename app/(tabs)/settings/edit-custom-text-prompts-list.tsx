import {
  Box,
  Button,
  ButtonIcon,
  ButtonGroup,
  ButtonText,
  Card,
  Center,
  Divider,
  HStack,
  Heading,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
  Pressable,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';
import { EditIcon, RotateCcwIcon } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import useQuickMessagesStore from '@/store/quickMessagesStore';

function ListCustomQuickMessages() {
  const { customQuickMessages, deleteCustomQuickMessage } = useQuickMessagesStore();
  const [messages, setMessages] = useState(customQuickMessages);
  const toast = useToast();
  const toastDuration = 5000;

  useEffect(() => {
    setMessages(customQuickMessages);
  }, [customQuickMessages]);

  if (customQuickMessages.length === 0) {
    return (
      <Box flex={1} py="$0" alignItems="center">
        {/* <Heading size="lg" pb="$0">
            Quick Contacts
          </Heading> */}
        <Heading size="md" pb="$3">
          No Custom Quick Messages
        </Heading>
      </Box>
    );
  }

  const handleDelete = (index: number, customQuickMessage: string) => {
    // TODO: remove customquickmessage parameter if unused
    const newMessages = [...messages];
    const messageToDelete = newMessages.splice(index, 1)[0];
    setMessages(newMessages);

    const deleteTimeout = setTimeout(() => {
      deleteCustomQuickMessage(index);
    }, toastDuration);

    // const customQuickMessageDeleted =
    //   customQuickMessage.length > 15
    //     ? `${customQuickMessage.substring(0, 15)}...`
    //     : customQuickMessage;

    // console.log(customQuickMessage);
    // console.log(typeof customQuickMessage);
    // console.log(messageToDelete);
    // console.log(typeof messageToDelete);

    toast.show({
      placement: 'bottom',
      duration: toastDuration,
      render: ({ id }) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="accent">
            <VStack space="xs">
              <ToastTitle>Deleted Custom Quick Message</ToastTitle>
              <ToastDescription>
                Do you wish to undo? You have {toastDuration / 1000} seconds.
              </ToastDescription>
            </VStack>
            <Pressable
              mt="$1"
              onPress={() => {
                // undo the delete
                console.log('Undoing the delete');
                clearTimeout(deleteTimeout);
                setMessages((prevMessages) => [
                  ...prevMessages.slice(0, index),
                  messageToDelete,
                  ...prevMessages.slice(index),
                ]);
                toast.close(id);
              }}
            >
              <Icon as={RotateCcwIcon} color="$coolGray50" />
            </Pressable>
          </Toast>
        );
      },
      onCloseComplete: () => {
        console.log('Toast Closed');
      },
    });
  };

  return (
    <Box flex={1} py="$0" alignItems="center">
      <FlatList
        data={messages}
        renderItem={({ item: customQuickMessage, index }) => (
          // <ContactItem contact={item} customQuickMessage={customQuickMessage} />'
          <Card
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            $dark-borderColor="$trueGray100"
            size="md"
            variant="elevated"
            m="$3"
          >
            <HStack alignItems="center" justifyContent="space-between" space="md" reversed={false}>
              <Box maxWidth="$48">
                <Heading mb="$0" size="md">
                  {customQuickMessage}
                </Heading>
              </Box>
              <ButtonGroup space="md">
                <Button
                  borderRadius="$full"
                  size="lg"
                  p="$3.5"
                  bg="$indigo600"
                  borderColor="$indigo600"
                  onPress={() => {
                    // edit the custom quick message
                    console.log(`Editing custom quick message: ${customQuickMessage}`);
                  }}
                >
                  <ButtonIcon as={EditIcon} />
                </Button>
                <Button
                  variant="solid"
                  bg="$error700"
                  borderColor="$error700"
                  $hover-bg="$error800"
                  $active-bg="$error700"
                  onPress={() => {
                    // delete the custom quick message
                    console.log(`Deleting custom quick message: ${customQuickMessage}`);
                    console.log(`At Index: ${index}`);
                    handleDelete(index, customQuickMessage);
                  }}
                >
                  <ButtonText fontSize="$sm" fontWeight="$medium">
                    Delete
                  </ButtonText>
                </Button>
              </ButtonGroup>
            </HStack>
          </Card>
        )}
        keyExtractor={(item, index) => item || index.toString()}
      />
    </Box>
  );
}

export default function EditCustomTextPromptsListScreen() {
  return (
    <Box flex={1}>
      <Center>
        <Heading size="xl" pt="$2" pb="$0">
          EditCustomTextPromptsList
        </Heading>
        <Divider my="$2" width="80%" />
        <Text>Here Are Your Currently Saved Custom Text Prompts</Text>
      </Center>
      <ListCustomQuickMessages />
    </Box>
  );
}
