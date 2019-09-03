/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import classNames from 'classnames'
import dishes from './dishes.json'
import { connect } from 'react-redux'
import _ from 'lodash'
import actions from './redux/actions'
import { Dropdown, Input } from 'semantic-ui-react'
import './App.css'
import validation from './validation'
import { isObjEmpty } from './utility'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: ['Step 1', 'Step 2', 'Step 3', 'Review'],
      mealArray: ['Breakfast', 'Lunch', 'Dinner'],
      active: 0,
      selectedRestaurant: '',
      selectedPeople: '',
      selectedMeal: '',
      diet: [],
      selectedDishes: [],
      selectedServings: [],
      activeShowing: 1,
      errors: {
        selectedRestaurant: '',
        selectedPeople: '',
        selectedMeal: '',
      }
    } 
  }

  componentDidMount() {
    this.props.selectStep(this.state.steps[this.state.active])
  }

  validate() {
    let error = {}
    if (this.state.steps[this.state.active] === 'Step 1') {
      error = {
        selectedMeal: validation.requiredValidate(this.state.selectedMeal),
        selectedPeople: validation.requiredValidate(this.state.selectedPeople)
      }
    }

    if (this.state.steps[this.state.active] === 'Step 2') {
      error = {
        selectedRestaurant: validation.requiredValidate(this.state.selectedRestaurant)
      }
    }

    return error
  }

  Pagination = () => {
    const { steps, active } = this.state
    const val = steps.map((item, index) => (
      <li
        key={index}
        className={classNames("list-item", active===index ? 'active-nav' : '')}
      >
        <div>
          {item}
        </div>
      </li>
    ))

    return (
      <div className="steps">
        {val}
      </div>
    )
  }

  renderFields = () => {
    const {selectedRestaurant, selectedPeople, selectedMeal, selectedDishes }  = this.state
    const mealType = []
    const restaurantArray = []
    const dishArray = []
    Object.values(this.state.mealArray).map((ele) => mealType.push({
      key: ele,
      text: ele,
      value: ele
    }))

    Object.values(dishes).forEach((ele) => {
      Object.values(ele).forEach((res) => 
      restaurantArray.push({
      key: res.restaurant,
      text: res.restaurant,
      value: res.restaurant
    }))
    })

    Object.values(dishes).forEach((ele) => {
      Object.values(ele).forEach((res) => 
      dishArray.push({
      key: res.name,
      text: res.name,
      value: res.name
    }))
    })

    const filteredRes = _.uniqBy(restaurantArray, 'key')
    const filteredDishes = _.uniqBy(dishArray, 'key')

    const dishField = []
    
    for(let i= 1; i<= this.state.activeShowing; i++) {
      dishField.push(
        <div
          key={Object.keys(filteredDishes).map((ele) => ele.name)}
          className="input-label"
          >
            <div className="input-step3">
              <Dropdown
                options={filteredDishes}
                name={`dishes${i}`}
                selection
                value={this.state.diet[`filteredDish${i}`] && this.state.diet[`filteredDish${i}`].dishes}
                onChange={(e, data) => {
                  this.setState({
                    diet: {
                      ...this.state.diet,
                      [`filteredDish${i}`]: {
                        ...this.state.diet[`filteredDish${i}`],
                        dishes: data.value                    
                      }
                    }
                  })
                }}
              />
            </div>
            <div>
              <Input
                type="number"
                min="0"
                max="10"
                value={this.state.diet[`filteredDish${i}`] && this.state.diet[`filteredDish${i}`].servings}
                onChange={(e, data) => {
                  this.setState({
                    diet: {
                      ...this.state.diet,
                      [`filteredDish${i}`]: {
                        ...this.state.diet[`filteredDish${i}`],
                        servings: data.value                    
                      }
                    }
                  })
                }}
              />
            </div>
        </div>
      )
    }
    
    return (
    <div className="main-container">
      {
        this.props.dishes.stepName === 'Step 1' &&
        <div>
          <div className="input-fields">
            <label>Please select a meal
              <span className="error">&nbsp;&nbsp;{this.state.errors.selectedMeal}</span>
          </label>
          <Dropdown
            options={mealType}
            selection
            value={selectedMeal}
            label="Please select a meal"
            onChange={(e, data) => this.setState({
              selectedMeal: data.value
            })}
          />
          </div>
          <div className="input-fields">
            <label>Please enter number of people
              <span className="error">&nbsp;&nbsp;{this.state.errors.selectedMeal}</span>
            </label>
          <Input
            type="number"
            min="0"
            max="10"
            value={selectedPeople}
            onChange={(e, data) => this.setState({
              selectedPeople: data.value
            })}
          />
        </div>
        </div>
      }

      {
        this.props.dishes.stepName === 'Step 2' &&
        <div className="input-fields">
          <label>
            Please select a Restaurant
            <span className="error">&nbsp;&nbsp;{this.state.errors.selectedRestaurant}</span>
          </label>
          <Dropdown
            options={filteredRes}
            value={selectedRestaurant}
            onChange={(e, data) => this.setState({
              selectedRestaurant: data.value
            })}
            selection
            label="Please select a restaurant"
          />
        </div>
      }

      {
        this.props.dishes.stepName === 'Step 3' &&
        <div>
          <div className="input-fields">
          <div className="input-label">
            <label>Please select a dish</label>
            <label className="servings">Please enter number of servings</label>
          </div>
          {dishField}
          </div>
        <div
          className="add-more"
          onClick={() => this.setState({
            activeShowing: this.state.activeShowing + 1
          })}
        >
          +
        </div>
        </div>
      }
      {
        this.props.dishes.stepName === 'Review' &&
        <div className="input-fields Review">
          <div className="meals">
          <span>
            Meal:
          </span>
          <span>{selectedMeal}</span>
          </div>
          <div className="meals">
          <span>
            No of people:
          </span>
          <span>{selectedPeople}</span>
          </div>
          <div className="meals">
          <span>
            Restaurant:
          </span>
          <span>{selectedRestaurant}</span>
          </div>
          <div className="meals">
          Dishes:
          <div className="meal-dishes">
            {
              Object.values(this.state.diet).map((ele, index) => (
                <div key={index}>
                  <spna>
                    {ele.dishes} -
                  </spna>
                  <spna>
                    &nbsp;{ele.servings}
                  </spna>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      }
    </div>
    )
  }



  Nav = () => (
    <div>
        {this.Pagination()}
        {this.renderFields()}
      <div className="nav-container">
        <div
          disabled={this.state.active}
          className={classNames("arrows", this.state.active === 0 && 'noColor')}
          onClick={() => {
            (this.state.active > 0) ?
              this.setState({
                active: this.state.active - 1
              })
            : ''
            this.props.selectStep(this.state.steps[this.state.active - 1])
          }
        }
        >
          {
            this.state.active !== 0 &&
            'Previous'
          }
          </div>
        <div
          disabled={(this.state.active < (this.state.steps.length - 1))}
          className="fas fa-chevron-circle-right arrows"
          onClick={() => {
              const error = this.validate()
              if (!isObjEmpty(error)) {
                this.setState({
                  errors: error
                })
              } else {
                if (this.props.dishes.stepName !== 'Review') {
                  this.props.selectStep(this.state.steps[this.state.active + 1])
                  this.state.active < (this.state.steps.length - 1) ?
                    this.setState({
                      active: this.state.active + 1,
                      errors: {}
                    })
                    : ''
                } else {
                  this.props.submit(true)
                }
              }
            }
            }
        > {
          this.state.active < (this.state.steps.length - 1) ? 'Next' : 'Submit'
        }
          </div>
      </div>
    </div>
  )
 
  render() {
  return (
    <div className="App">
      {
        this.props.dishes.submit ?
        <div className="main-container center">
          <span>Submitted Succefully</span>
          <span>&#128522;</span>
        </div>
        :
      this.Nav()
      }
    </div>
  )
}
}

const mapStateToProps = (reducerState) => {
  return reducerState
}

export default connect(mapStateToProps,actions)(App)

