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
  Center,
  ModalBackdrop,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalContent,
  ModalFooter,
  Icon,
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import { MessageCircleMore, X, Check as CheckIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState, version } from 'react';
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

const MemoizedCheckbox = React.memo(({ value, label, children }: CheckboxProps) => (
  <Checkbox
    size="lg"
    borderBottomWidth="$1"
    borderColor="$trueGray800"
    $dark-borderColor="$trueGray100"
    value={value}
    aria-label={label}
  >
    <CheckboxIndicator mr="$2" my="$5">
      <CheckboxIcon as={CheckIcon} />
    </CheckboxIndicator>
    <CheckboxLabel>{children}</CheckboxLabel>
  </Checkbox>
));

function ListContactsCheckBox() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [values, setValues] = useState(['1']);

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

  const handleChange = useCallback((keys) => {
    setValues(keys);
  }, []);

  console.log(values, 'values currently selected');

  if (contacts.length === 0) {
    return (
      <Center>
        <Text>Loading Contacts...</Text>
      </Center>
    );
  }

  return (
    // <Box py="$10">
    //   <Heading size="xl" p="$4" pb="$3">
    //     Inbox
    //   </Heading>
    //   <FlatList
    //     data={contacts}
    //     renderItem={ContactItem}
    //     keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
    //   />
    // </Box>
    <Box borderWidth="$1" borderColor="$amber400" borderRadius="$md" px="$1.5" py="$10">
      <CheckboxGroup value={values} onChange={handleChange}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => {
            const label = item.firstName ?? 'Unnamed contact';
            return (
              // <Checkbox value={item.id} aria-label={label}>
              //   <CheckboxIndicator mr="$2">
              //     <CheckboxIcon as={CheckIcon} />
              //   </CheckboxIndicator>
              //   <CheckboxLabel>{item.firstName}</CheckboxLabel>
              // </Checkbox>
              <MemoizedCheckbox value={item.id} label={label}>
                {item.firstName}
              </MemoizedCheckbox>
            );
          }}
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        />
      </CheckboxGroup>
    </Box>
    // other version
    // <VStack space="3xl">
    //   <CheckboxGroup value={values} onChange={handleChange}>
    //     {contacts.map((item) => {
    //       const label = item.firstName ?? 'Unnamed contact';
    //       return (
    //         // <Checkbox value={item.id} aria-label={label}>
    //         //   <CheckboxIndicator mr="$2">
    //         //     <CheckboxIcon as={CheckIcon} />
    //         //   </CheckboxIndicator>
    //         //   <CheckboxLabel>{item.firstName}</CheckboxLabel>
    //         // </Checkbox>
    //         <MemoizedCheckbox value={item.id} label={label}>
    //           {item.firstName}
    //         </MemoizedCheckbox>
    //       );
    //     })}
    //     {/* <Checkbox value={item.id} aria-label={label}>
    //     <CheckboxIndicator mr="$2">
    //       <CheckboxIcon as={CheckIcon} />
    //     </CheckboxIndicator>
    //     <CheckboxLabel>{item.firstName}</CheckboxLabel>
    //   </Checkbox> */}
    //   </CheckboxGroup>
    // </VStack>
    //other version end

    // <CheckboxGroup
    //   value={values}
    //   onChange={(keys) => {
    //     setValues(keys);
    //   }}
    // >
    //   <VStack space="3xl">
    //     <Checkbox value="Eng" aria-label="Framer">
    //       <CheckboxIndicator mr="$2">
    //         <CheckboxIcon as={CheckIcon} />
    //       </CheckboxIndicator>
    //       <CheckboxLabel>Framer</CheckboxLabel>
    //     </Checkbox>
    //     <Checkbox value="invison" aria-label="Invision Studio">
    //       <CheckboxIndicator mr="$2">
    //         <CheckboxIcon as={CheckIcon} />
    //       </CheckboxIndicator>
    //       <CheckboxLabel>Invision Studio</CheckboxLabel>
    //     </Checkbox>
    //     <Checkbox value="adobe" aria-label="Adobe XD">
    //       <CheckboxIndicator mr="$2">
    //         <CheckboxIcon as={CheckIcon} />
    //       </CheckboxIndicator>
    //       <CheckboxLabel>Adobe XD</CheckboxLabel>
    //     </Checkbox>
    //   </VStack>
    // </CheckboxGroup>
  );
}

export default function EditContactList() {
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
    <Box style={styles.container}>
      <Text $light-color="$amber500" $dark-color="$blue400">
        Here are your Contacts:
      </Text>
      {/* <ListContacts /> */}

      <Text>Choose Contacts you wish to import into your list.</Text>

      <ListContactsCheckBox />
      <Pressable
        alignItems="center"
        justifyContent="center"
        py={12}
        px={32}
        borderRadius={4}
        elevation={3}
        backgroundColor="aqua"
        onPress={() => {
          console.log('pressed button for sending sms!');
          // sendSMS();
        }}
      >
        <Text style={styles.text}>Add Contacts to your List 🔒</Text>
      </Pressable>
    </Box>
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
