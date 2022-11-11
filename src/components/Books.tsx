import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import CloseButton from 'react-bootstrap/CloseButton'
import { useAppSelector } from '../redux/hooks'
import { IBook } from '../interfaces'
import {
  useGetBooksFromFirebaseQuery,
  useRemoveBookMutation,
} from '../redux/firestoreApi'

export default function Books() {
  const books = useGetBooksFromFirebaseQuery().data as IBook[]
  const [removeBook] = useRemoveBookMutation()
  const filter = useAppSelector((state) => state.filter)
  console.log(filter)

  var booksSorted: IBook[] = []
  if (!books) return <h1>Loading...</h1>
  else if (books) {
    booksSorted = [...books].sort((a, b) =>
      a[filter as keyof IBook].localeCompare(b[filter as keyof IBook])
    )
  }

  return (
    <Container fluid className="px-3">
      <Row xs={1} md={3} className="g-3">
        {booksSorted.map((book) => (
          <Col key={book.id}>
            <Card>
              <Card.Body>
                <CloseButton
                  className="float-end"
                  onClick={() => {
                    removeBook(book.id)
                  }}
                />
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <i>Author:</i> {book.author}
                  <br />
                  <i>Year:</i> {book.year}
                  <br />
                  <i>Genre:</i> {book.genre}
                  <br />
                  <i>Added:</i> {book.added}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
