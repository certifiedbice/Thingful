import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThingContext from '../../contexts/ThingContext'
import ThingApiService from '../../services/thing-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'
import { ThingStarRating } from '../../components/ThingStarRating/ThingStarRating'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import './ThingPage.css'

export default class ThingPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = ThingContext

  componentDidMount() {
    const { thingId } = this.props.match.params
    this.context.clearError()
    ThingApiService.getThing(thingId)
      .then(this.context.setThing)
      .catch(this.context.setError)
    ThingApiService.getThingReviews(thingId)
      .then(this.context.setReviews)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearThing()
  }

  renderThing() {
    const { thing, reviews } = this.context
    return <>
      <div className='ThingPage__image' style={{backgroundImage: `url(${thing.image})`}} />
      <h2>{thing.title}</h2>
      <ThingContent thing={thing} />
      <ThingReviews reviews={reviews} />
      <ReviewForm />
    </>
  }

  render() {
    const { error, thing } = this.context
    let content
    if (error) {
      content = (error.error === `Thing doesn't exist`)
        ? <p className='red'>Thing not found</p>
        : <p className='red'>There was an error</p>
    } else if (!thing.id) {
      content = <div className='loading' />
    } else {
      content = this.renderThing()
    }
    return (
      <Section className='ThingPage'>
        {content}
      </Section>
    )
  }
}

function ThingContent({ thing }) {
  return (
    <p className='ThingPage__content'>
      {thing.content}
    </p>
  )
}

function ThingReviews({ reviews = [] }) {
  return (
    <ul className='ThingPage__review-list'>
      {reviews.map(review =>
        <li key={review.id} className='ThingPage__review'>
          <p className='ThingPage__review-text'>
            <FontAwesomeIcon
              size='lg'
              icon='quote-left'
              className='ThingPage__review-icon blue'
            />
            {review.text}
          </p>
          <p className='ThingPage__review-user'>
            <ThingStarRating rating={review.rating} />
            <Hyph />
            {review.user.full_name}
          </p>
        </li>
      )}
    </ul>
  )
}
