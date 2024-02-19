import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { View, Text } from './Themed';

type ItemProps = {
  item: Contacts.Contact;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.firstName}</Text>
    <Text style={[styles.title, { color: textColor }]}>
      {item.phoneNumbers?.map((contact, index) => {
        return contact.number;
      })}
    </Text>
  </TouchableOpacity>
);

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

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9a2af';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    // <View style={styles.container}>
    //   <Text
    //     style={styles.friendlyText}
    //     lightColor="rgba(0,0,0,0.8)"
    //     darkColor="rgba(255,255,255,0.8)"
    //   >
    //     Here are your contacts:
    //   </Text>
    //   <View style={styles.container}>
    //     <FlatList
    //       data={contacts}
    //       renderItem={({ item }) => (
    //         <View>
    //           <Text>{item.name}</Text>
    //         </View>
    //       )}
    //       keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
    //     />
    //   </View>
    // </View>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
        extraData={selectedId}
      />
    </SafeAreaView>
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
      <Text
        style={styles.friendlyText}
        // lightColor="rgba(0,0,0,0.8)"
        // darkColor="rgba(255,255,255,0.8)"
      >
        Heyo
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
