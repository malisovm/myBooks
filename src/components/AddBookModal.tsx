import React, { useState, useRef } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { IAddBookModalProps, IBook } from '../interfaces'
import { nanoid } from '@reduxjs/toolkit'
import { useAddBookMutation } from '../redux/firestoreApi'

export default function AddBookModal(props: IAddBookModalProps) {
  const { showModal, setShowModal } = props
  const [validated, setValidated] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const [addBook] = useAddBookMutation()

  function getDate() {
    let date = new Date()
    let fDate = {
      year: date.getFullYear() as number | string,
      month: date.getMonth() as number | string,
      day: date.getDate() as number | string,
      hours: date.getHours() as number | string,
      minutes: date.getMinutes() as number | string,
      seconds: date.getSeconds() as number | string,
    }
    Object.keys(fDate).forEach((key) => {
      fDate[key as keyof typeof fDate] = fDate[key as keyof typeof fDate]
        .toString()
        .padStart(2, '0')
    })
    return `${fDate.year}.${fDate.month}.${fDate.day} ${fDate.hours}:${fDate.minutes}:${fDate.seconds}`
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    const form = event.currentTarget as HTMLFormElement
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      setValidated(true)
      setShowModal(false)
      let date = new Date()
      let book: IBook = {
        id: nanoid(),
        title: titleRef!.current!.value,
        author: authorRef!.current!.value,
        year: yearRef!.current!.value.toString(),
        genre: genreRef!.current!.value,
        added: getDate(),
      }
      addBook(book)
      setValidated(false)
    }
  }

  return (
    <Offcanvas
      placement={'end'}
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add book</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book title</Form.Label>
            <Form.Control
              ref={titleRef}
              required
              placeholder="How to Learn Redux"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the book title.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Author</Form.Label>
            <Form.Control
              ref={authorRef}
              required
              placeholder="Redux McReacty"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the author.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Year</Form.Label>
            <Form.Control
              ref={yearRef}
              required
              type="number"
              placeholder="1234"
            />
            <Form.Control.Feedback type="invalid">
              Please specify the year.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Genre</Form.Label>
            <Form.Control ref={genreRef} required placeholder="programming" />
            <Form.Control.Feedback type="invalid">
              Please specify the genre.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
