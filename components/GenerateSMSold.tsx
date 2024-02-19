import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Pressable,
  Text,
  VStack,
  Heading,
  AvatarFallbackText,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import { MessageCircleMore } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';

import { View } from './Themed';

type ItemProps = {
  item: Contacts.Contact;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => {
  return (
    // <View style={[styles.item, { backgroundColor: '#f9a2af' }]}>
    <Pressable
      onPress={onPress}
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      w="$full"
      // maxWidth="$5/6"
      px={4}
      borderRadius={4}
      marginVertical={4}
      backgroundColor={backgroundColor}
    >
      <Text size="lg">{item.firstName} </Text>
      {/* <Text size="lg">
        {item.phoneNumbers?.map((contact, index) => {
          return contact.number;
        })}{' '}
      </Text> */}
      <Button action="primary" variant="solid" size="lg">
        <ButtonIcon as={MessageCircleMore} />
      </Button>
    </Pressable>
    // </View>
  );
};

function ListContacts() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
        console.table(data);
        setContacts(data);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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

export default function GenerateSMS() {
  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here

      //   allows you to send to multiple numbers
      //   const { result } = await SMS.sendSMSAsync(
      //     ['0123456789', '9876543210'],
      //     'My sample HelloWorld message'
      //   );

      const { result } = await SMS.sendSMSAsync(['9876543210'], 'My sample HelloWorld message');
      console.log(result, 'SMS status!');
    } else {
      // misfortune... there's no SMS available on this device
      console.log('SMS is not available on this device');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.friendlyText} $light-color="$amber500" $dark-color="$blue400">
        Here are your Contacts:
      </Text>
      <ListContacts />
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('pressed button for sending sms!');
          sendSMS();
        }}
      >
        <Text style={styles.text}>Send Message To Someone</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  friendlyText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 4,
    // padding: 20,
    marginVertical: 4,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
