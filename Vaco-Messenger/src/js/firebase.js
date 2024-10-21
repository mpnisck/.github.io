import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig  } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function saveChat(data) {
  const messageRef = ref(db, `/chats/${data.id}`);
  await set(messageRef, data);
}

let isInitialFetch = true;

export function subscribeToNewMessage (callback) {
  const chatRef = ref(db, "/chats");

  onValue(chatRef, (snapshot) => {
    if (isInitialFetch) {
      isInitialFetch = false;
      return;
    }

    const data = snapshot.val();
    const messages = Object.values(data).sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
    });
    const newMessage = messages[messages.length - 1];

    callback(newMessage);
  });
}

export async function getAllMessages () {
  const chatRef = ref(db, "/chats");
  const snapshot = await get(chatRef);
  const data = snapshot.val();

  if  (data === null) return [];

  const sortedMessages = Object.values(data).sort((a, b) => {
    if (a.createdAt > b.createdAt) return 1;
    if (a.createdAt < b.createdAt) return -1;
  });

  return sortedMessages;
}
