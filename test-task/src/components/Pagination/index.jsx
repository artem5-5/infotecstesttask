import PropTypes from 'prop-types'
import css from './index.module.scss'

export const Pagination = ({ users, currentPage, totalPages, onPageChange, pageSize, totalItems, onPageSizeChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let startPage, endPage
      if (currentPage <= 3) {
        startPage = 1
        endPage = maxVisiblePages
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4
        endPage = totalPages
      } else {
        startPage = currentPage - 2
        endPage = currentPage + 2
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const pages = getPageNumbers()
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className={css.container}>
      <div className={css.info}>
        Показано {startItem}-{endItem} из {totalItems}
      </div>

      <div className={css.controls}>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          &lt;&lt;
        </button>

        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>

        {pages.map((page) => (
          <button key={page} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}

        {totalPages > 5 && currentPage < totalPages - 2 && <span className={css.ellipsis}>...</span>}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        )}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
          &gt;
        </button>

        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>
          &gt;&gt;
        </button>
      </div>

      <div className={css.sizeSelector}>
        <label htmlFor="pageSize" className={css.info}>
          Строк на странице:{' '}
        </label>
        <select id="pageSize" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          <option className={css.option}value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={users.length}>{users.length}</option>
        </select>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
}
