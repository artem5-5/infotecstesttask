import css from './index.module.scss'
import PropTypes from 'prop-types'

export const UsersTable = ({ users, columns, onRowClick }) => {
  if (!users || users.length === 0) {
    return <div className={css.noData}>Нет данных для отображения</div>
  }
  return (
    <div className={css.wrapper}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <div>{column.value}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
