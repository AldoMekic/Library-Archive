import ReviewList from "../components/ReviewList";

const Test = () => {
  const reviews = [
    {index: 1, name: "bla", amount:1},
    {index: 2, name: "blabla", amount:2},
    {index: 3, name: "blablabla", amount:3},
  ]
  return (
    <>
      <p>This is the test page</p>
      <ReviewList reviews={reviews}/>
    </>
  );
}

export default Test;