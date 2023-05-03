const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };
  
  const Header = ({ course }) => <h1>{course.name}</h1>;
  
  const Content = ({ parts }) => {
    if (parts.length === 0) {
      return <p>This course currently has no parts available!</p>;
    }
    return parts.map((part) => <Part key={part.id} part={part} />);
  };
  
  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );
  
  const Total = ({ parts }) => (
    <p>
      {`Number of exercises ${parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
      )}`}
    </p>
  );

  export default Course;