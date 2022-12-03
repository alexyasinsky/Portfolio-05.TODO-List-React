// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyJ4kTh2apV5vvbS9xDbFmzL3fPDof8pI",
  authDomain: "todo-list-react-e94ff.firebaseapp.com",
  databaseURL: "https://todo-list-react-e94ff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-react-e94ff",
  storageBucket: "todo-list-react-e94ff.appspot.com",
  messagingSenderId: "952744361017",
  appId: "1:952744361017:web:1088659d333a31dd9de1e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);



// export const messagesRef = ref(db, 'messages');
// export const getUsersRefById = id => ref(db, `users/${id}`);
// export const getUserNickNameRefById = id => ref(db, `users/${id}/nickname`);
// export const getNicknameFromNicknames = nickname => ref(db, `nicknames/${nickname}`);
// export const getMessagesIdRefFromChats = (profileId, buddyId) => ref(db, `chats/${profileId}/${buddyId}`);
// export const getProfileChatsRefById = (id) => ref(db, `chats/${id}`);
// export const getCurrentChatRef = (profileId, buddyId) => ref(db, `chats/${profileId}/${buddyId}`);
// export const getMessagesRefById = (messagesId) => ref(db, `messages/${messagesId}`);