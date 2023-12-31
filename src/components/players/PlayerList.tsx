import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import PlayerCard from "./PlayerCard";
import PlayerSearch from "./PlayerSearch";
import PageSelect from "../PageSelect";

import * as ROUTES from "../../global/routes";

const PlayerList = () => {
  // Players currently displaying
  const [players, setPlayers] = useState([]);
  // Total number of players, whether displayed or not
  const [totalPlayers, setTotalPlayers] = useState(0);

  // Keeping track of items and pages for pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Search parameters
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState("alph");

  // Options for sort selector
  const sortTypes = [
    {
      id: 1,
      sort: "alph",
      text: "Alphabetical",
    },
    {
      id: 2,
      sort: "sets",
      text: "Most sets played",
    },
    {
      id: 3,
      sort: "wins",
      text: "Most wins",
    },
    {
      id: 4,
      sort: "winrate",
      text: "Highest win rate",
    },
  ];

  const onChangeSearch = (event) => {
    setSearchName(event.target.value);
  };

  const onChangeSort = (event) => {
    setSort(event.target.value);
  };

  // Get players initially and whenever page or search parameters change
  useEffect(() => {
    fetch(ROUTES.SERVER_GET_PLAYERS, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        perPage: perPage,
        search: searchName,
        sort: sort,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data["players"]);
        setTotalPlayers(data["total"]);
      });
  }, [page, searchName, sort]);

  const updatePerPage = (selectedPerPage) => {
    setPerPage(Number(selectedPerPage.target.value));
    setPage(1);
  };

  return (
    <>
      <h1 className="sectionTitle">Players</h1>
      <Container>
        <Row>
          <Col lg={{ span: 4 }}>
            <div className="dataSelectForm">
              <PlayerSearch
                sortTypes={sortTypes}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
              />
            </div>
            <PageSelect
              current={page}
              perPage={perPage}
              totalPages={Math.ceil((1.0 * totalPlayers) / perPage)}
              totalItems={totalPlayers}
              onChangePage={(selectedPage) => setPage(selectedPage)}
              onChangePerPage={(selectedPerPage) =>
                updatePerPage(selectedPerPage)
              }
            />
          </Col>
          <Col lg={{ span: 8 }} className="playerList">
            {players.map((player) => (
              <Row key={player["id"]}>
                <PlayerCard
                  name={player["name"]}
                  team={player["team"]}
                  numWins={player["numWins"]}
                  numLosses={player["numLosses"]}
                  topPlacing={player["topPlacing"]}
                  demon={player["demon"]}
                  blessing={player["blessing"]}
                />
              </Row>
            ))}
            {players.length == 0 && (
              <div className="playerNotFound">
                <p>No players found</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlayerList;
