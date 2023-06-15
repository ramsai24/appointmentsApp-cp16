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

  titleUpdate = event => this.setState({title: event.target.value})

  dateUpdate = event =>
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy,EEEE'),
    })

  addAppointment = event => {
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isActive: false,
    }
    event.preventDefault()
    this.setState(prevs => ({
      appointmentsList: [...prevs.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

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
    const {appointmentsList, stared, staredList} = this.state
    const print = stared ? appointmentsList : staredList

    console.log(print)
    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="inputs-container">
            <form>
              <h1>Add Appointment</h1>
              <label htmlFor="inputEl">TITLE</label>
              <br />
              <input id="inputEl" type="text" onChange={this.titleUpdate} />
              <br />
              <label htmlFor="textAreaEl">DATE</label>
              <br />
              <input id="textAreaEl" type="date" onChange={this.dateUpdate} />
              <button type="submit" onClick={this.addAppointment}>
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>

          <hr />
          <div className="appointments-container">
            <h1>Appointments</h1>
            <button type="button" onClick={this.staredFilter}>
              Starred
            </button>
          </div>

          {stared ? (
            <ul>
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
