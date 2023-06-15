// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentList, makeStar} = props

  const {id, title, date, isActive} = appointmentList

  const makeStared = () => {
    // console.log(id)
    makeStar(id)
  }

  const starImg = isActive ? (
    <button data-testId="star" type="button" onClick={makeStared}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
        alt="star"
      />
    </button>
  ) : (
    <button data-testid="star" type="button" onClick={makeStared}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
        alt="star"
      />
    </button>
  )
  return (
    <li>
      <div>
        <h1>{title}</h1>
        <p>Date: {date}</p>
      </div>
      {starImg}
    </li>
  )
}

export default AppointmentItem
