import PropTypes from 'prop-types'
import css from './index.module.scss'

export const UserModal = ({ user, onClose }) => {
  if (!user) return null

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={css.modalHeader}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <div className={css.userId}>ID: {user.id}</div>
        </div>

        <div className={css.modalBody}>
          <div className={css.avatarContainer}>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className={css.avatar} />
          </div>

          <div className={css.userDetails}>
            <div className={css.detailRow}>
              <span className={css.detailLabel}>Полное имя:</span>
              <span>
                {user.firstName} {user.lastName} {user.maidenName}
              </span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Возраст:</span>
              <span>{user.age}</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Адрес:</span>
              <span>
                {user.address.address}, {user.address.city},{user.address.state}, {user.address.postalCode}
              </span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Рост:</span>
              <span>{user.height} см</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Вес:</span>
              <span>{user.weight} кг</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Телефон:</span>
              <span>{user.phone}</span>
            </div>

            <div className={css.detailRow}>
              <span className={css.detailLabel}>Email:</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserModal.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}
