import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #ffe81f;
  border: 1px solid #ffe81f;
  border-radius: 4px;

  table {
    text-align: center;
    th {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .ant-table-column-sorter-up {
    cursor: pointer;
    padding: 0 3px;
  }

  .ant-table-column-sorter-down {
    cursor: pointer;
    padding-right: 3px;
  }
`;
export const LoadingSpinner = styled.div`
  display: inline-block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 80px;
  height: 80px;
  :after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ffe81f;
    border-color: #ffe81f transparent #ffe81f transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const TooltipContainer = styled.div`
  cursor: pointer;
`;

export const TooltipContent = styled.div`
  position: absolute;
  background-color: #ffe81f;
  color: black;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
`;
