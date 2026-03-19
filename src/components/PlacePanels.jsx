import React, { useMemo, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../lib/useAuth'
import './PlacePanels.css'

function hashColor(n) {
  const h = (Number(n || 0) * 2654435761) >>> 0
  const hue = h % 360
  return `hsl(${hue} 70% 45%)`
}

function Stars({ value }) {
  const filled = Math.max(0, Math.min(5, Math.round(value || 0)))
  return (
    <div className="place-stars" aria-label={`Рейтинг: ${filled} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < filled ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function PlacePanels({ place, reviews, myReview, onClose, onReviewAdded }) {
  const { isAuthenticated } = useAuth()
  const hasAnyReview = (reviews?.length || 0) > 0
  const isRated = Number(place?.average_rating || 0) > 0 || hasAnyReview
  const userAlreadyRated = Boolean(myReview)

  const title = place?.name || 'Место'
  const avg = Number(place?.average_rating || 0)

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [addMode, setAddMode] = useState(false)

  const canRate = isAuthenticated && !userAlreadyRated

  const accessibilityItems = useMemo(
    () => [
      { icon: '/kol.svg', label: 'Пригодно для колясочников' },
      { icon: '/vtlo.svg', label: 'Подойдёт для пользователей СИМ' },
      { icon: '/ded.svg', label: 'Пригодно для маломобильных граждан' },
    ],
    []
  )

  const submit = async () => {
    if (!canRate) return
    setError('')
    setSubmitting(true)
    try {
      await api.addReview(place.id, { rating, comment: comment.trim() || null })
      setComment('')
      setAddMode(false)
      onReviewAdded?.()
    } catch (e) {
      setError(e?.message || 'Не удалось отправить отзыв')
    } finally {
      setSubmitting(false)
    }
  }

  // Slide 16_9 - 7: место без оценки/отзывов
  if (!isRated) {
    const canAdd = isAuthenticated
    return (
      <div className="place-single-panel">
        <div className="place-single-card">
          <div className="place-single-header">
            <div className="place-title">{title}</div>
            <button className="place-close" onClick={onClose} aria-label="Закрыть">
              ×
            </button>
          </div>
          {!addMode ? (
            <div className="place-single-body" />
          ) : (
            <div className="place-add-form">
              <div className="place-add-row">
                <div className="place-add-label">Рейтинг этого места:</div>
                <select
                  className="review-rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  disabled={!canAdd || submitting}
                  aria-label="Оценка"
                >
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>
                      {v} ★
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Комментарий (необязательно)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-input"
                disabled={!canAdd || submitting}
              />

              {error ? <div className="review-error">{error}</div> : null}

              <div className="place-add-actions">
                <button
                  className="place-add-secondary"
                  onClick={() => {
                    setAddMode(false)
                    setError('')
                  }}
                  disabled={submitting}
                >
                  Отмена
                </button>
                <button className="place-add-primary" onClick={submit} disabled={!canAdd || submitting}>
                  {submitting ? 'Отправка...' : 'Сохранить'}
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className="place-primary-bottom"
          onClick={() => {
            if (!isAuthenticated) return
            setAddMode(true)
            setError('')
          }}
          disabled={!isAuthenticated || addMode}
          title={!isAuthenticated ? 'Войдите, чтобы оценить место' : undefined}
        >
          Добавить информацию о месте
        </button>
      </div>
    )
  }

  // Slide 16_9 - 6/14: оценённое место + отзывы, разница в доступности оценки
  return (
    <div className="place-panels">
      <div className="place-info-card">
        <div className="place-info-top">
          <div className="place-title">{title}</div>
          <button className="place-close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        <div className="place-rating-row">
          <span className="rating-dot" />
          <span>Рейтинг: {avg ? avg.toFixed(1) : '0.0'}</span>
        </div>
        <Stars value={avg} />

        <div className="place-accessibility">
          {accessibilityItems.map((it) => (
            <div className="place-access-item" key={it.label}>
              <img src={it.icon} alt="" className="place-access-icon" />
              <span>{it.label}</span>
            </div>
          ))}
        </div>

        <button className="place-cta" disabled={!canRate} title={!isAuthenticated ? 'Войдите, чтобы оценить' : undefined}>
          Оценить место
        </button>
      </div>

      <div className="place-reviews-card">
        <div className="reviews-title">Отзывы:</div>
        <div className="reviews-list">
          {(reviews || []).map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-avatar" style={{ background: hashColor(r.user_id) }} />
              <div className="review-content">
                <div className="review-user">Пользователь</div>
                <div className="review-text">{r.comment || `Оценка: ${r.rating}`}</div>
              </div>
            </div>
          ))}
        </div>

        {userAlreadyRated ? (
          <div className="review-hint">Вы уже оценивали это место.</div>
        ) : null}

        {error ? <div className="review-error">{error}</div> : null}

        {isAuthenticated ? (
          <div className="review-form">
            <select
              className="review-rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              disabled={!canRate || submitting}
              aria-label="Оценка"
            >
              {[5, 4, 3, 2, 1].map((v) => (
                <option key={v} value={v}>
                  {v} ★
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Оставить отзыв..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="review-input"
              disabled={!canRate || submitting}
            />
            <button className="review-send" onClick={submit} disabled={!canRate || submitting} aria-label="Отправить">
              ➜
            </button>
          </div>
        ) : (
          <div className="review-hint">Войдите, чтобы оставить отзыв.</div>
        )}
      </div>
    </div>
  )
}

