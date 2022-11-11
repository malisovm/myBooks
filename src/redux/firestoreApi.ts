import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { IBook } from '../interfaces'

const firebaseConfig = {
  apiKey: 'AIzaSyAAK9AKbSHpRBrucxHcuFqc4mOekbjohp0',
  authDomain: 'mybooks-11313.firebaseapp.com',
  projectId: 'mybooks-11313',
  storageBucket: 'mybooks-11313.appspot.com',
  messagingSenderId: '767862900406',
  appId: '1:767862900406:web:08bee10c4226a9c2b2c817',
}

const db = getFirestore(initializeApp(firebaseConfig))

const getBooks = async () => {
  const data: IBook[] = []
  const response = await getDocs(collection(db, 'books'))
  response.forEach((doc) => {
    let book = doc.data()
    book.id = doc.id
    data.push(book as IBook)
  })
  return data
}

const addBook = async (book: IBook) => {
  await addDoc(collection(db, 'books'), book)
}

const removeBook = async (id: string) => {
  await deleteDoc(doc(db, 'books', id))
}

export const firestoreApi = createApi({
  tagTypes: ['Books'],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getBooksFromFirebase: build.query({
      queryFn(arg: void) {
        try {
          return { data: getBooks() }
        } catch (e) {
          return { error: e }
        }
      },
      providesTags: ['Books'],
    }),
    addBook: build.mutation({
      queryFn(book: IBook) {
        try {
          return { data: addBook(book) }
        } catch (e) {
          return { error: e }
        }
      },
      invalidatesTags: ['Books'],
    }),
    removeBook: build.mutation({
      queryFn(id: string) {
        try {
          return { data: removeBook(id) }
        } catch (e) {
          return { error: e }
        }
      },
      invalidatesTags: ['Books'],
    }),
  }),
})

export const {
  useGetBooksFromFirebaseQuery,
  useAddBookMutation,
  useRemoveBookMutation,
} = firestoreApi
