const Header = ({title}) => <h1>{title}</h1>
const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)

const Part = ({ name, exercise }) => <p>{name} {exercise}</p>

const Sum = ({parts}) => {
    const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
    return (<p><strong>Total of {sum} exercises</strong></p>)
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
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (<Course key={course.id} course={course} /> ))}
        </div>
    )
}

export default App