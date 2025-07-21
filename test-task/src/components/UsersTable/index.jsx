import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { getComparer } from './../../utils/tableSortUtils'
import css from './index.module.scss'

export const UsersTable = ({ users, columns, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'none',
  })

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const column = columns.find((col) => col.key === key)

      if (!column || !column.sortable) {
        return
      }

      if (prev.key !== key) {
        return { key, direction: 'asc' }
      }

      return {
        key,
        direction: prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? 'none' : 'asc',
      }
    })
  }

  const sortedUsers = useMemo(() => {
    if (sortConfig.direction === 'none') return users

    return [...users].sort(getComparer(sortConfig.key, sortConfig.direction))
  }, [users, sortConfig])

  if (!users || users.length === 0) {
    return <div className={css.noData}>Нет данных для отображения</div>
  }
  return (
    <div className={css.wrapper}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={column.sortable ? () => handleSort(column.key) : undefined}>
                <div>
                  {column.value}{' '}
                  {sortConfig.key === column.key &&
                    (sortConfig.direction === 'asc' ? ' ↑' : sortConfig.direction === 'desc' ? ' ↓' : '')}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.maidenName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
}
