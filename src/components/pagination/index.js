import { Pagination as PaginationAnt } from "antd";
import { Wrapper } from "./styles";

const Pagination = ({ current, total, setCurrPage }) => {
  const handleChange = (page) => {
    setCurrPage(page);
  };

  return (
    <Wrapper>
      <PaginationAnt
        simple
        defaultCurrent={1}
        current={current}
        total={total}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default Pagination;
