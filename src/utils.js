import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Dodawanie wydarzenia
export const addEvent = async (newEvent) => {
  try {
    const docRef = await addDoc(collection(db, "events"), newEvent);
    return docRef.id; // Zwróć ID nowo dodanego dokumentu
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Pobieranie wydarzeń
export const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(), // Konwersja z Firebase Timestamp na Date
      endDate: doc.data().endDate.toDate(),
    }));
    return events;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e;
  }
};

// Aktualizacja wydarzenia
export const updateEvent = async (id, updatedEvent) => {
  try {
    const eventDocRef = doc(db, "events", id);
    await updateDoc(eventDocRef, updatedEvent);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Usuwanie wydarzenia
export const deleteEvent = async (id) => {
  try {
    const eventDocRef = doc(db, "events", id);
    await deleteDoc(eventDocRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};
