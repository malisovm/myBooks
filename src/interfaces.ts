export interface IBook {
  id: string
  title: string
  author: string
  year: string
  genre: string
  added: string
}

export interface IAddBookModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
}
