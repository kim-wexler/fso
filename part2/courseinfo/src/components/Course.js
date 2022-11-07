import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Course = ({course}) => {
  let total = course.parts.reduce(
    (acc, val) => acc + val.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map(part => {
        return <Part key={part.id} part={part} />
      }
      )}
      <Total sum={total} />
    </div>
  )
}

export default Course