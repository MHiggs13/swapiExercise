import { useState, useEffect } from "react";
import { Table } from "antd";
import * as dayjs from "dayjs";
import { getPeople } from "../api/get-people";
import { getWrapper } from "../api/get-api-request";
import Pagination from "../components/pagination";
import Search from "../components/search";
import {
  Wrapper,
  TableWrapper,
  LoadingSpinner,
  TooltipContainer,
  TooltipContent,
} from "./styles";

const People = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [planets, setPlanets] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [isTTVisible, setIsTTVisible] = useState(new Array(10));
  const [currPage, setCurrPage] = useState(1);
  const [peopleTotal, setPeopleTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { Column } = Table;

  const fetchHomeworld = async (url) => {
    const homeworld = await getWrapper(url);
    return homeworld.data;
  };

  useEffect(() => {
    setIsTTVisible(isTTVisible.fill(false));
    void (async () => {
      try {
        setIsLoading(true);
        const dateFormat = "DD/MM/YYYY";
        const peopleResponse = await getPeople(currPage);
        const iterableData = peopleResponse.data.results;

        setPeopleTotal(peopleResponse.data.count);

        let planetRequests = [];

        const peopleData = iterableData.map((person, index) => {
          person.created = dayjs(person.created).format(dateFormat);
          person.edited = dayjs(person.edited).format(dateFormat);
          person.index = index;

          if (!planetRequests.some((req) => req === person.homeworld)) {
            planetRequests.push(person.homeworld);
          }

          return person;
        });

        const planetsArr = await Promise.all(
          planetRequests.map(async (request) => {
            const value = await fetchHomeworld(request);
            return { [request]: value };
          })
        ).then((values) => {
          return values;
        });

        const planetsMap = new Map();

        planetsArr.forEach((planet) => {
          planetsMap.set(Object.keys(planet)[0], Object.values(planet)[0]);
        });

        setPlanets(planetsMap);
        setPeople(peopleData);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        // display error, use a toast?
      }
    })();
  }, [currPage]);

  const columnSortNumber = (key, a, b) => {
    if (isNaN(Number(a[key]))) return 1;
    if (isNaN(Number(b[key]))) return -1;
    return Number(a[key]) - Number(b[key]);
  };

  const columnSortText = (key, a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  };

  const columnSortDate = (key, a, b) => {
    const dateA = dayjs(a[key]);
    const dateB = dayjs(b[key]);
    return dateA.diff(dateB);
  };

  const columnSortHomeworld = (key, a, b) => {
    const planetA = planets.get(a[key]).name;
    const planetB = planets.get(b[key]).name;

    if (planetA === "unknown") return 1;
    if (planetB === "unknown") return -1;
    if (planetA > planetB) return 1;
    if (planetA < planetB) return -1;
    return 0;
  };

  const onSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredPeople([]);
    }
    const searchResult = people.filter((person) => {
      return person.name.toUpperCase().includes(searchTerm.toUpperCase());
    });
    setFilteredPeople(searchResult);
  };

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Wrapper>
      <Search onSearch={onSearch} onChange={onChange} value={searchTerm} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <TableWrapper>
            <Table
              dataSource={
                (filteredPeople.length !== 0 && filteredPeople) || people
              }
              pagination={false}
            >
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                sorter={(a, b) => columnSortText("name", a, b, false)}
                showSorterTooltip={false}
              />
              <Column
                title="Height"
                dataIndex="height"
                key="height"
                sorter={(a, b) => columnSortNumber("height", a, b)}
                showSorterTooltip={false}
              />
              <Column
                title="Mass"
                dataIndex="mass"
                key="mass"
                sorter={(a, b) => columnSortNumber("mass", a, b)}
                showSorterTooltip={false}
              />
              <Column
                title="Created"
                dataIndex="created"
                key="created"
                sorter={(a, b) => columnSortDate("created", a, b)}
                showSorterTooltip={false}
              />
              <Column
                title="Edited"
                dataIndex="edited"
                key="edited"
                sorter={(a, b) => columnSortDate("edited", a, b)}
                showSorterTooltip={false}
              />
              <div>
                <Column
                  title="Homeworld"
                  key="homeworld"
                  sorter={(a, b) => columnSortHomeworld("homeworld", a, b)}
                  showSorterTooltip={false}
                  render={(person) => {
                    const homeworld = planets.get(person.homeworld);
                    return (
                      <TooltipContainer
                        className="tooltip"
                        data-tooltip="hello"
                        onMouseEnter={() =>
                          setIsTTVisible(
                            isTTVisible.map(
                              (_, index) => index === person.index
                            )
                          )
                        }
                        onMouseLeave={() =>
                          setIsTTVisible(isTTVisible.map(() => false))
                        }
                      >
                        {homeworld.name}
                        {!!isTTVisible[person.index] &&
                          homeworld.name !== "unknown" && (
                            <TooltipContent>
                              <b>{homeworld.name}</b>
                              <div>Diameter: {homeworld.diameter}</div>
                              <div>Climate: {homeworld.climate}</div>
                              <div>Population: {homeworld.population}</div>
                            </TooltipContent>
                          )}
                      </TooltipContainer>
                    );
                  }}
                />
              </div>
            </Table>
          </TableWrapper>
          <Pagination
            total={peopleTotal}
            current={currPage}
            setCurrPage={(page) => {
              setFilteredPeople([]);
              setSearchTerm("");
              setCurrPage(page);
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default People;
