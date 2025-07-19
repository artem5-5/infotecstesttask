import { useEffect, useState } from 'react'
import { UsersTable } from './../../components/UsersTable'
import { fetchUsersData } from './../../services/api'
import css from './index.module.scss'

export const HomePage = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()

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
    <div className={css.wrapper}>
      <h1 className={css.title}>ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ</h1>
      <UsersTable users={users} columns={columns} />
    </div>
  )
}
