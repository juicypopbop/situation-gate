import {
  AddIcon,
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import {
  BadgeCheckIcon,
  GlobeIcon,
  MessageCircleMore,
  NotebookTabs,
  PaintBucket,
  PuzzleIcon,
  SettingsIcon,
} from 'lucide-react-native';
import { FlatList } from 'react-native';

import useContactStore from '@/store/contactsStore';
import useQuickMessagesStore from '@/store/quickMessagesStore';

interface ContactItemProps {
  contact: Contacts.Contact;
  customQuickMessage: string;
}

const ContactItem = ({ contact, customQuickMessage }: ContactItemProps) => {
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

  const sendSMSByNumber = async (phoneNumber: string) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      const { result } = await SMS.sendSMSAsync([phoneNumber], customQuickMessage);
      console.log(result, 'SMS status!');
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

  getImageData(contact);

  if (contact.imageAvailable) {
    console.log(contact.imageAvailable, 'contact');
    console.log(contact.rawImage, 'contact image');
  }

  function areAllDuplicates(phoneNumbers: string[]): boolean {
    if (!phoneNumbers || phoneNumbers.length <= 1) {
      return false;
    }

    const firstNumber = phoneNumbers[0];
    for (let i = 1; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i] !== firstNumber) {
        return false;
      }
    }

    return true;
  }

  const colors = ['$indigo600', '$red500', '$yellow500', '$green500', '$blue500'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

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
      mx="$1"
    >
      <HStack space="xl" justifyContent="space-between">
        <Avatar bgColor={getRandomColor()} size="md">
          <AvatarFallbackText>{contact?.firstName[0]}</AvatarFallbackText>
          {/* <AvatarImage source={{ uri: imageUri }} /> */}
          {/* <MessageCircleMore /> */}
          <AvatarBadge $dark-borderColor="$black" />
        </Avatar>
        <VStack>
          <Text
            textAlign="center"
            color="$coolGray800"
            fontWeight="$bold"
            $dark-color="$warmGray100"
          >
            {contact.name}
          </Text>
          {/* <Text color="$coolGray600" $dark-color="$warmGray200">
            {item.phoneNumbers?.map((contact, index) => {
              return contact.number;
            })}
          </Text> */}
          {contact.phoneNumbers && contact.phoneNumbers.length > 1 && (
            <Badge size="sm" variant="solid" alignSelf="center" action="info" ml="$1">
              <BadgeText>Multiple Numbers</BadgeText>
              <BadgeIcon as={NotebookTabs} ml="$1" />
            </Badge>
          )}
        </VStack>
        {/* <Text fontSize="$xs" color="$coolGray800" alignSelf="flex-start" $dark-color="$warmGray100">
          time stamp
        </Text> */}
        {/* <Button
          action="primary"
          variant="solid"
          size="lg"
          onPress={() => {
            sendSMS(item);
          }}
        >
          <ButtonIcon as={MessageCircleMore} />
        </Button> */}

        <Menu
          placement="top"
          trigger={({ ...triggerProps }) => {
            return (
              // <Button {...triggerProps}>
              //   <ButtonText>Menu</ButtonText>
              // </Button>
              <Button
                // action="primary"
                // variant="solid"
                // size="lg"
                // onPress={() => {
                //   sendSMS(item);
                // }}
                size="lg"
                {...triggerProps}
              >
                <ButtonIcon as={MessageCircleMore} />
              </Button>
            );
          }}
        >
          {/* <MenuItem key="Community" textValue="Community">
            <Icon as={GlobeIcon} size="sm" mr="$2" />
            <MenuItemLabel size="sm">Community</MenuItemLabel>
          </MenuItem> */}
          {contact.phoneNumbers?.map((contact, index) => {
            return (
              <MenuItem
                key={index}
                textValue={contact.number}
                onPress={() => {
                  console.log(`Pressed Menu Item For Sending SMS to ${contact.number}!`);
                  if (contact.number) sendSMSByNumber(contact.number);
                  else console.log('No phone number available for this contact');
                }}
              >
                <Icon as={MessageCircleMore} size="sm" mr="$2" />
                <MenuItemLabel size="sm">{contact.number}</MenuItemLabel>
              </MenuItem>
            );
          })}
          {/* <MenuItem key="Plugins" textValue="Plugins">
            <Icon as={PuzzleIcon} size="sm" mr="$2" />
            <MenuItemLabel size="sm">Plugins</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Theme" textValue="Theme">
            <Icon as={PaintBucket} size="sm" mr="$2" />
            <MenuItemLabel size="sm">Theme</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Settings" textValue="Settings">
            <Icon as={SettingsIcon} size="sm" mr="$2" />
            <MenuItemLabel size="sm">Settings</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Add account" textValue="Add account">
            <Icon as={AddIcon} size="sm" mr="$2" />
            <MenuItemLabel size="sm">Add account</MenuItemLabel>
          </MenuItem> */}
        </Menu>
      </HStack>
    </Box>
  );
};

function ListContactsCheckBox() {
  const { contacts, contactCount } = useContactStore();
  const { getSelectedQuickMessage } = useQuickMessagesStore();

  const customQuickMessage = getSelectedQuickMessage();

  if (contactCount === 0) {
    return (
      <Box alignItems="center">
        {/* <Heading size="lg" pb="$0">
          Quick Contacts
        </Heading> */}
        <Heading size="md" pb="$3">
          No Contacts Available
        </Heading>
      </Box>
    );
  }

  return (
    <Box flex={1} py="$0">
      <Box alignItems="center">
        {/* <Heading size="lg" pb="$0">
          Quick Contacts
        </Heading> */}
        <Heading size="md" pb="$3">
          {contactCount} Contacts Available
        </Heading>
      </Box>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactItem contact={item} customQuickMessage={customQuickMessage} />
        )}
        keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
      />
    </Box>
  );
}

const SendSMSContactList = () => {
  return (
    <Box flex={1}>
      <ListContactsCheckBox />
    </Box>
  );
};

export default SendSMSContactList;
