import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
}

async function removeContact(contactId) {
  let contacts = await listContacts();
  contacts = contacts.filter((contact) => contact.id !== contactId.toString());
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  contacts.push({
    id: nanoid(),
    name,
    email,
    phone,
  });
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}

addContact("test", "test", "3232321");
