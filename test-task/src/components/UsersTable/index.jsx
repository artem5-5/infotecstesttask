import css from './index.module.scss'

export const UsersTable = (props) => {
  return (
    <div className={css.wrapper}>
      <table>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column.key}>
                <div>{column.value}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
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
