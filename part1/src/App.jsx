const Header = (course) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = (course) => {
    return (
        <p>{course.part} {course.exercise}</p>
    )
}
const Total = (course) => {
    return (
            <p>Number of exercises {course.exercise1 + course.exercise2 + course.exercise3}</p>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            {/*Header*/}
            <Header name={course}/>
            {/*Content*/}
            <Content part={part1} exercise={exercises1} />
            <Content part={part2} exercise={exercises2} />
            <Content part={part3} exercise={exercises3} />
            {/*Total*/}
            <Total exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
        </div>
    )
}

export default App