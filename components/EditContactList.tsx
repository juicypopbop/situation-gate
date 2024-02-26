import {
  Box,
  Pressable,
  Text,
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import { Check as CheckIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

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
        // const contact = data[0];
        // console.log(contact);
        // console.table(data);
        setContacts(data);

        // addContacts(data); works to add
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // TODO: performance optimization needed here, might be due to dependency array
  const handleChange = useCallback(
    (contactIDs: React.SetStateAction<string[]>) => {
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
    },
    [contacts, addContacts, setSelectedContacts]
  );

  if (contacts.length === 0) {
    return (
      <Box flex={1} borderWidth="$1" borderColor="$amber400" borderRadius="$md" px="$1.5" py="$10">
        <Text>Loading Contacts...</Text>
      </Box>
    );
  }

  console.log(selectedContacts, 'selectedContacts currently selected');
  return (
    <Box flex={1} borderWidth="$1" borderColor="$amber400" borderRadius="$md" px="$1.5" py="$0">
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
                {item.name ?? 'Unnamed contact'}
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
        backgroundColor="$darkBlue600"
        $active-bgColor="white"
        onPress={() => {
          console.log('pressed button for adding contacts to list!');
        }}
      >
        <Text
          fontSize={16}
          lineHeight={21}
          fontWeight="bold"
          letterSpacing={0.25}
          color="$yellow100"
        >
          Add Contacts to your List 🔒
        </Text>
      </Pressable>
      <Pressable
        alignItems="center"
        justifyContent="center"
        my={12}
        py={12}
        px={32}
        borderRadius={4}
        elevation={3}
        backgroundColor="$emerald600"
        $active-bgColor="white"
        onPress={() => {
          console.log('pressed button for adding contacts to list!');
        }}
      >
        <Text
          fontSize={16}
          lineHeight={21}
          fontWeight="bold"
          letterSpacing={0.25}
          color="$yellow100"
        >
          Clear All Contacts in your List 🧹
        </Text>
      </Pressable>
    </Box>
  );
}
