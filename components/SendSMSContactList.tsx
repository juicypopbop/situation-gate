import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonIcon,
  HStack,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import { MessageCircleMore } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import useContactStore from '@/store/contactsStore';

function ListContactsCheckBox() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  // const renderItem = ({ item }: { item: Contacts.Contact }) => {
  //   const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9a2af';
  //   const color = item.id === selectedId ? 'white' : 'black';

  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => setSelectedId(item.id)}
  //       backgroundColor={backgroundColor}
  //       textColor={color}
  //     />
  //   );
  // };

  const ContactItem = ({ item }: { item: Contacts.Contact }) => {
    // const [imageUri, setImageUri] = useState<string | undefined>();

    // useEffect(() => {
    //   const fetchImageUri = async () => {
    //     // const uri = await item.image.uri; // replace this with your actual async operation
    //     if (item?.id) {
    //       const contact = await Contacts.getContactByIdAsync(item.id);
    //       console.log(contact);
    //       if (contact?.imageAvailable) {
    //         console.log(contact.imageAvailable, 'contact');
    //         console.log(contact.image, 'contact image');
    //         //item.rawImage = contact.image;
    //         setImageUri(contact.image?.uri);
    //       }
    //     }
    //   };

    //   fetchImageUri();
    // }, [item]);

    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9a2af';
    const color = item.id === selectedId ? 'white' : 'black';

    const sendSMS = async (item: Contacts.Contact) => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        // do your SMS stuff here

        //   allows you to send to multiple numbers
        //   const { result } = await SMS.sendSMSAsync(
        //     ['0123456789', '9876543210'],
        //     'My sample HelloWorld message'
        //   );
        const phoneNumber = item.phoneNumbers ? item.phoneNumbers[0] : null;
        if (phoneNumber?.number) {
          const { result } = await SMS.sendSMSAsync(
            [phoneNumber.number],
            `Hello ${item.firstName}! This is a test message from the Situation Gate app!`
          );
          console.log(result, 'SMS status!');
        } else {
          console.log('No phone number available for this contact');
        }
      } else {
        // misfortune... there's no SMS available on this device
        console.log('SMS is not available on this device');
      }
    };

    const getImageData = async (item: Contacts.Contact) => {
      // @ts-expect-error
      const contact = await Contacts.getContactByIdAsync(item.id);
      console.log(contact);
      if (contact?.imageAvailable) {
        console.log(contact.imageAvailable, 'contact');
        console.log(contact.image, 'contact image');
        //item.rawImage = contact.image;
        return contact.image?.uri;
      }
    };

    getImageData(item);

    if (item.imageAvailable) {
      console.log(item.imageAvailable, 'item');
      console.log(item.rawImage, 'item image');
    }

    // console.log(item.imageAvailable, 'item');

    return (
      <Box
        borderBottomWidth="$1"
        borderColor="$trueGray800"
        $dark-borderColor="$trueGray100"
        $base-pl={0}
        $base-pr={0}
        $sm-pl="$4"
        $sm-pr="$5"
        py="$2"
      >
        <HStack space="md" justifyContent="space-between">
          <Avatar size="md">
            <AvatarFallbackText>{item.firstName}</AvatarFallbackText>
            {/* <AvatarImage source={{ uri: imageUri }} /> */}
            {/* <MessageCircleMore /> */}
          </Avatar>
          <VStack>
            <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
              {item.firstName}
            </Text>
            <Text color="$coolGray600" $dark-color="$warmGray200">
              {item.phoneNumbers?.map((contact, index) => {
                return contact.number;
              })}
            </Text>
          </VStack>
          <Text
            fontSize="$xs"
            color="$coolGray800"
            alignSelf="flex-start"
            $dark-color="$warmGray100"
          >
            time stamp
          </Text>
          <Button
            action="primary"
            variant="solid"
            size="lg"
            onPress={() => {
              sendSMS(item);
            }}
          >
            <ButtonIcon as={MessageCircleMore} />
          </Button>
        </HStack>
      </Box>
    );
  };

  return (
    <Box py="$10">
      <Heading size="xl" p="$4" pb="$3">
        Inbox
      </Heading>
      <FlatList
        data={contacts}
        renderItem={ContactItem}
        keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
      />
    </Box>
  );
}

const SendSMSContactList = () => {
  const { contacts, contactCount } = useContactStore();
  //   console.log(contacts, 'contacts');

  return (
    <Box flex={1}>
      <Text>SendSMSContactList</Text>
      <Text>Number of Contacts: {contactCount}</Text>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <Box>
            <Text>{item.name}</Text>
          </Box>
        )}
        keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
      />
    </Box>
  );
};

export default SendSMSContactList;
