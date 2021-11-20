const Header = ({course}) => {
    return (
      <div>
        <h1>
          {course.name}
        </h1>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
          {course.parts.map(part => 
            <Part key={part.id} part={part}/>
          )}
      </div>
    )
  }
  
  const Total = ({ course }) => {
    const list = course.parts.map(part => part.exercises)
    return (
      <div>
          total of {list.reduce((result,number)=> result+number)} exercises
      </div>
    )
  }
  
  
  const Course = ({ course }) => (
    <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </div>
  )

export default Course