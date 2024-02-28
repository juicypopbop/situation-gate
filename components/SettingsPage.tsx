import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Icon,
  Text,
  ButtonText,
  TextareaInput,
  Textarea,
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { CloseIcon } from 'lucide-react-native';
import { debounce } from 'moderndash';
import { useState, useRef, useCallback } from 'react';

import useQuickMessagesStore from '@/store/quickMessagesStore';

interface CustomTextPromptModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomTextPromptModal = ({ showModal, setShowModal }: CustomTextPromptModalProps) => {
  const {
    customQuickMessages,
    selectedQuickMessage,
    addCustomQuickMessage,
    setSelectedQuickMessage,
  } = useQuickMessagesStore();
  //   const [textAreaValue, setTextAreaValue] = useState(customQuickMessages[selectedQuickMessage]);
  const [textAreaValue, setTextAreaValue] = useState('');

  // TODO: Implement debouncing for saving changes to default text prompt

  const ref = useRef(null);

  //   const debouncedAddCustomQuickMessage = useCallback(
  //     debounce(() => {
  //       addCustomQuickMessage(textAreaValue);
  //       setSelectedQuickMessage(customQuickMessages.length); // Set the newly added message as the selected one
  //     }, 200),
  //     [addCustomQuickMessage, setSelectedQuickMessage, textAreaValue, customQuickMessages.length]
  //   );

  //   const saveChanges = () => {
  //     debouncedAddCustomQuickMessage();
  //     setShowModal(false);
  //   };

  const saveChanges = () => {
    addCustomQuickMessage(textAreaValue);
    // setSelectedQuickMessage(customQuickMessages.length); // Set the newly added message as the selected one
    setTextAreaValue('');
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add Custom Text Prompt</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Add here the custom text prompt for sending SMS to your contacts.</Text>
          <Textarea size="md" isReadOnly={false} isInvalid={false} isDisabled={false} w="$64">
            <TextareaInput
              placeholder="Enter New Custom Text Prompt Here..."
              value={textAreaValue}
              onChangeText={setTextAreaValue}
            />
          </Textarea>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              console.log('Saving changes to default text prompt!');
              saveChanges();
            }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SettingsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box flex={1} mx="$2">
      {/* <ListContactsCheckBox /> */}
      <Text $light-color="$amber500" $dark-color="$blue400">
        Here are your different settings for the app:
      </Text>
      <Pressable
        alignItems="center"
        justifyContent="center"
        my={12}
        py={12}
        px={32}
        borderRadius={4}
        elevation={3}
        backgroundColor="$amber600"
        $active-bgColor="white"
        onPress={() => {
          console.log('pressed button for adding custom text prompt to list!');
          setShowModal(true);
        }}
      >
        <Text
          fontSize={16}
          lineHeight={21}
          fontWeight="bold"
          letterSpacing={0.25}
          color="$yellow100"
        >
          Add New Custom Text Prompt 📝
        </Text>
      </Pressable>
      <Link href="/(tabs)/settings/edit-custom-text-prompts-list">
        <Text>go to place</Text>
      </Link>
      <Link href="/(tabs)/settings/edit-custom-text-prompts-list" asChild>
        <Pressable
          alignItems="center"
          justifyContent="center"
          my={12}
          py={12}
          px={32}
          borderRadius={4}
          elevation={3}
          backgroundColor="$indigo600"
          $active-bgColor="white"
          //   onPress={() => {
          //     console.log('pressed button for editing custom text prompts list!');
          //     // setShowModal(true);
          //   }}
        >
          <Text
            fontSize={16}
            lineHeight={21}
            fontWeight="bold"
            letterSpacing={0.25}
            color="$yellow100"
          >
            Edit Custom Text Prompt List 📝
          </Text>
        </Pressable>
      </Link>
      <CustomTextPromptModal showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default SettingsPage;
