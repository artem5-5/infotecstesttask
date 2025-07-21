import { useEffect, useState } from 'react'
import { UsersTable } from './../../components/UsersTable'
import { fetchUsersData } from './../../services/api'
import { Pagination } from './../../components/Pagination'
import { UserModal } from '../../components/UserModal'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import css from './index.module.scss'

export const HomePage = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    { key: 'firstName', value: 'ИМЯ', sortable: true },
    { key: 'lastName', value: 'ФАМИЛИЯ', sortable: true },
    { key: 'maidenName', value: 'ОТЧЕСТВО', sortable: true },
    { key: 'age', value: 'ВОЗРАСТ', sortable: true },
    { key: 'gender', value: 'ПОЛ', sortable: true },
    { key: 'phone', value: 'ТЕЛЕФОН', sortable: true },
    { key: 'email', value: 'EMAIL', sortable: false },
    { key: 'country', value: 'СТРАНА', sortable: false },
    { key: 'city', value: 'ГОРОД', sortable: false },
  ]

  const totalItems = users.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleRowClick = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUsersData()
        setUsers(data)
      } catch (error) {
        setError('Ошибка загрузки данных')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className={css.container}>
      <Header />
      <div className={css.content}>
        <UsersTable users={paginatedUsers} columns={columns} onRowClick={handleRowClick} />
        {error && <div>Что-то пошло не так, попробуйте перезагрузить страницу</div>}
        {loading && <div>Загрузка данных ...</div>}
        <Pagination
          users={users}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageSizeChange={handlePageSizeChange}
        />
        {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
      </div>
      <Footer />
    </div>
  )
}
