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

export default Course