import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBd2_ir1D5qhAeNXKep73P3Bt_mdLt-DJU",
  authDomain: "test-86c26.firebaseapp.com",
  projectId: "test-86c26",
  storageBucket: "test-86c26.appspot.com",
  messagingSenderId: "875514749650",
  appId: "1:875514749650:web:963fe350363c068cb4430b"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)


