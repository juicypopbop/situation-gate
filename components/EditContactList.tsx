import {
  Box,
  Pressable,
  Text,
  Center,
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import { Check as CheckIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import useContactStore from '@/store/contactsStore';

interface CheckboxProps {
  value: string;
  label: string;
  children: React.ReactNode;
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
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const { addContacts } = useContactStore();

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

        // addContacts(data); works to add
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = useCallback((contactIDs: React.SetStateAction<string[]>) => {
    console.log(contactIDs, 'current contactIDs');
    const selectedContactsArray = Array.isArray(contactIDs) ? contactIDs : [contactIDs];
    console.log(selectedContactsArray, 'current selectedContactsArray');
    const selectedContacts = contacts.filter((contact) =>
      selectedContactsArray.includes(contact.id)
    );
    console.log(selectedContacts, 'selectedContacts');

    // verify if selectedContacts are not already in the store before adding to the store

    addContacts(selectedContacts);

    setSelectedContacts(contactIDs);
    console.log(contacts, 'contacts in state store');
  }, []);

  console.log(selectedContacts, 'selectedContacts currently selected');

  if (contacts.length === 0) {
    return (
      <Center>
        <Text>Loading Contacts...</Text>
      </Center>
    );
  }

  return (
    <Box flex={1} borderWidth="$1" borderColor="$amber400" borderRadius="$md" px="$1.5" py="$10">
      <CheckboxGroup value={selectedContacts} onChange={handleChange}>
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
              <MemoizedCheckbox value={item?.id} label={label}>
                {item.firstName}
              </MemoizedCheckbox>
            );
          }}
          keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        />
      </CheckboxGroup>
    </Box>
  );
}

export default function EditContactList() {
  return (
    <Box flex={1} mt={0}>
      <Text $light-color="$amber500" $dark-color="$blue400">
        Here are your Contacts:
      </Text>
      <Text>Choose Contacts you wish to import into your list.</Text>
      <ListContactsCheckBox />
      <Pressable
        alignItems="center"
        justifyContent="center"
        my={12}
        py={12}
        px={32}
        borderRadius={4}
        elevation={3}
        backgroundColor="aqua"
        onPress={() => {
          console.log('pressed button for adding contacts to list!');
        }}
      >
        <Text style={styles.text}>Add Contacts to your List 🔒</Text>
      </Pressable>
    </Box>
  );
}

const styles = StyleSheet.create({
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
