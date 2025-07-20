import { useEffect, useState } from 'react'
import { UsersTable } from './../../components/UsersTable'
import { fetchUsersData } from './../../services/api'
import { Pagination } from './../../components/Pagination'
import css from './index.module.scss'
import { UserModal } from '../../components/UserModal'

export const HomePage = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    { key: 'lastName', value: 'ФАМИЛИЯ' },
    { key: 'firstName', value: 'ИМЯ' },
    { key: 'maidenName', value: 'ОТЧЕСТВО' },
    { key: 'age', value: 'ВОЗРАСТ' },
    { key: 'gender', value: 'ПОЛ' },
    { key: 'phone', value: 'ТЕЛЕФОН' },
    { key: 'email', value: 'EMAIL' },
    { key: 'country', value: 'СТРАНА' },
    { key: 'city', value: 'ГОРОД' },
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
      }
    }
    loadData()
  }, [])

  return (
    <div className={css.container}>
      <header>
        <h1 className={css.title}>ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ</h1>
      </header>
      <div className={css.content}>
        <UsersTable users={paginatedUsers} columns={columns} onRowClick={handleRowClick} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageSizeChange={handlePageSizeChange}
        />
        {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
      </div>

      <footer>
        <div className={css.description}>
          <p>Тестовое задание для прохождения стажировки на позицию Разработчик JS</p>
        </div>
      </footer>
    </div>
  )
}
