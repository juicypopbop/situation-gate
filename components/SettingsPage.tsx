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
import { CloseIcon } from 'lucide-react-native';
import React, { useState } from 'react';

import useSettingsStore from '@/store/settingsStore';

interface DefaultTextPromptModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultTextPromptModal = ({ showModal, setShowModal }: DefaultTextPromptModalProps) => {
  const { defaultQuickMessage, setDefaultQuickMessage } = useSettingsStore();
  console.log(showModal);
  const ref = React.useRef(null);

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
          <Heading size="lg">Change Default Text Prompt</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Change here the default text prompt for sending SMS to your contacts.</Text>
          <Textarea size="md" isReadOnly={false} isInvalid={false} isDisabled={false} w="$64">
            <TextareaInput value={defaultQuickMessage} onChangeText={setDefaultQuickMessage} />
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
              setShowModal(false);
            }}
          >
            <ButtonText>Explore</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SettingsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box flex={1}>
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
          console.log('pressed button for adding contacts to list!');
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
          Change Default Text Prompt 📝
        </Text>
      </Pressable>
      <DefaultTextPromptModal showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default SettingsPage;
