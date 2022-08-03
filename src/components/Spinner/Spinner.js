import { BallTriangle } from 'react-loader-spinner';

function Spinner() {
  return (
    <div className="container text-center mt-3">
      <div className="offset-6 col-md-4">
        <BallTriangle color="red" height={80} width={80} />
      </div>
    </div>
  );
}

export default Spinner;
