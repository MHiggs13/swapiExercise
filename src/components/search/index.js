import { Input } from "antd";
import { Wrapper } from "./styles";

const Search = ({ onSearch, onChange, value }) => {
  const { Search: SearchAnt } = Input;

  return (
    <Wrapper>
      <SearchAnt
        placeholder="Search by name"
        allowClear
        onSearch={onSearch}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Search;
