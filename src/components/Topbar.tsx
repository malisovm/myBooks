import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import AddBookModal from './AddBookModal'
import { useAppDispatch } from '../redux/hooks'
import { filterSelected } from '../redux/filterSlice'

export const filters = ['Added (default)', 'Title', 'Author', 'Year', 'Genre']

export default function Topbar() {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <nav>
      <Stack direction="horizontal" className="bg-primary border  mb-2" gap={2}>
        <div className="text-white h4 px-3">myBooks</div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add book
        </Button>
        <DropdownButton id="dropdown-basic-button" title="Filter by">
          {filters.map((filter) => (
            <Dropdown.Item
              as="button"
              key={filter}
              onClick={() => {
                const filterForDispatch = filter.toLowerCase().split(' ')[0]
                dispatch(filterSelected(filterForDispatch))
              }}
            >
              {filter}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Stack>
      <AddBookModal showModal={showModal} setShowModal={setShowModal} />
    </nav>
  )
}
