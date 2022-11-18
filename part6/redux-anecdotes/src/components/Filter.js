import { setFilter } from "../reducers/filterReducer";
import { connect, useDispatch } from "react-redux";

const Filter = () => {
  const style = {
    marginBottom: 10,
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const content = event.target.value;
    dispatch(setFilter(content));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const connectedFilter = connect()(Filter);

export default connectedFilter;
// export default Filter;
