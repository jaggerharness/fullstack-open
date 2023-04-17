const Header = ({course}) => <h1>{course.name}</h1>;

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({course}) =>
  course.parts.map((element) => (
    <Part key={element.name} part={element} />
  ));

const calculateTotalExercises = (parts) =>
  parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

const Total = ({course}) => (
  <p>Number of exercises {calculateTotalExercises(course.parts)}</p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;