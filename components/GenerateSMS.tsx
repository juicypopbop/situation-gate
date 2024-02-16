import * as SMS from 'expo-sms';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from './Themed';

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
    <View>
      <Text
        style={styles.friendlyText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Heyo
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('pressed button for sending sms!');
          sendSMS();
        }}
      >
        <Text style={styles.text}>Hi People</Text>
      </Pressable>
    </View>
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
});
