// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    stared: true,
    staredList: [],
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isActive: false,
    }

    this.setState(pervs => ({
      appointmentsList: [...pervs.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  titleUpdate = event => this.setState({title: event.target.value})

  dateUpdate = event =>
    this.setState({
      date: event.target.value,
    })

  makeStar = id => {
    // const {appointmentsList} = this.state

    console.log(id)

    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isActive: !each.isActive}
        }
        return each
      }),
    }))
  }

  staredFilter = () => {
    const {appointmentsList, stared} = this.state
    const intialList = appointmentsList

    const staredItem = intialList.filter(each => each.isActive === true)

    if (stared) {
      this.setState(prev => ({
        staredList: staredItem,
        stared: !prev.stared,
      }))
    } else {
      this.setState(prev => ({stared: !prev.stared}))
    }
  }

  render() {
    const {appointmentsList, stared, staredList, title, date} = this.state
    const print = stared ? appointmentsList : staredList
    const starredBtn = stared ? 'starred-btn' : 'star-btn'
    console.log(print)
    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="inputs-container">
            <form onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <label className="title-label" htmlFor="inputEl">
                TITLE
              </label>
              <br />
              <input
                className="inputEl"
                value={title}
                id="inputEl"
                type="text"
                onChange={this.titleUpdate}
                placeholder="Title"
              />
              <br />
              <label className="title-label" htmlFor="textAreaEl">
                DATE
              </label>
              <br />
              <input
                className="inputEl"
                value={date}
                id="textAreaEl"
                type="date"
                onChange={this.dateUpdate}
              />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="appointmentsImg"
            />
          </div>

          <hr />
          <div className="appointments-container">
            <div className="bottom-section">
              <h1 className="appointment">Appointments</h1>
              <button
                className={starredBtn}
                type="button"
                onClick={this.staredFilter}
              >
                Starred
              </button>
            </div>
          </div>

          {stared ? (
            <ul className="appointmentListContainer">
              {appointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointmentList={each}
                  makeStar={this.makeStar}
                />
              ))}
            </ul>
          ) : (
            <ul>
              {staredList.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointmentList={each}
                  makeStar={this.makeStar}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Appointments
