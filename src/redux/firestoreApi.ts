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
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: 'mybooks-11313',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
