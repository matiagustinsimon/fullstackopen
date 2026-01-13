const Header = ({title}) => <h1>{title}</h1>
const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)

const Part = ({ name, exercise }) => <p>{name} {exercise}</p>

const Sum = ({parts}) => {
    const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
    return (<p>Total of {sum} exercises</p>)
}

const Course = ({course}) => {
    return (
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Sum parts={course.parts} />
        </>

    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

export default App