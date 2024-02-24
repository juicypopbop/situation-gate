import * as Contacts from 'expo-contacts';
import { create } from 'zustand';

// export type Contact = Contacts.Contact & {
//   id: string | undefined;
// };

export type ContactsList = Contacts.Contact[];

export interface ContactState {
  contacts: ContactsList;
  contactCount: number;
  addContact: (contact: Contacts.Contact) => void;
  addContacts: (contacts: ContactsList) => void;
  updateContact: (contact: Contacts.Contact) => void;
  removeContact: (contact: Contacts.Contact) => void;
  searchContacts: (query: string) => ContactsList;
  //   sortContacts: (sortOrder: SortOrder) => void;
  clearContacts: () => void;
}

const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  contactCount: 0,
  addContact: (contact: Contacts.Contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
      contactCount: state.contactCount + 1,
    })),
  addContacts: (contacts: ContactsList) => {
    console.log(contacts, 'contacts in state store');

    // verify if the contacts are already in the state via .lookupKey
    // if the contact is not in the state, add it
    // if the contact is in the state, update it
    // const newContacts = contacts.map((contact) => {
    //   const existingContact = get().contacts.find((c) => c.lookupKey === contact.lookupKey);
    //   if (existingContact) {
    //     return contact;
    //   }
    //   return contact;
    // });

    set((state) => ({
      contacts: [...contacts],
      contactCount: contacts.length,
    }));
  },
  updateContact: (contact: Contacts.Contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
    })),
  removeContact: (contact: Contacts.Contact) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
      contactCount: state.contactCount - 1,
    })),
  searchContacts: (query: string) => {
    // const searchContactResults = get().contacts.filter((c) =>
    //   c.name.toLowerCase().includes(query.toLowerCase())
    // );
    const searchContactsAdvancedResults = get().contacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(query.toLowerCase()) ||
        contact.phoneNumbers?.some(
          (phoneNumber) => phoneNumber.number?.includes(query.replace(/\D/g, '')) ?? ''
        )
    );
    // create a more advanced search function that looks through all fields and returns the complete contact objects which match the query
    return searchContactsAdvancedResults;
  },

  clearContacts: () => set({ contacts: [], contactCount: 0 }),
}));

export default useContactStore;
