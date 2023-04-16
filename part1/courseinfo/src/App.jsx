const Header = (props) => <h1>{props.course.name}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = (props) =>
  props.course.parts.map((element) => (
    <Part key={element.name} part={element} />
  ));

const calculateTotalExercises = (parts) => {
  return parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
};

const Total = (props) => (
  <p>
    Number of exercises {calculateTotalExercises(props.course.parts)}
  </p>
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
