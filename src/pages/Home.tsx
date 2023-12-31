import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Tweet } from "react-twitter-widgets";
import { ref, get } from "firebase/database";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TournamentCard from "../components/tournaments/TournamentCard";

import { database } from "../firebase";

import * as ROUTES from "../global/routes";

import UltimateBanner from "../assets/home-banner/ultimate_banner.png";
import MeleeBanner from "../assets/home-banner/melee_banner.jpg";
import BrawlBanner from "../assets/home-banner/brawl_banner.jpg";

import "../styles/home.css";

function Home() {
  const [latestTournament, setLatestTournament] = useState({});
  const [latestEvents, setLatestEvents] = useState([]);
  const [ultBrawlTweetId, setUltBrawlTweetId] = useState<string>("");
  const [meleeTweetId, setMeleeTweetId] = useState<string>("");

  // Get most recent tournament
  useEffect(() => {
    fetch(ROUTES.SERVER_GET_LATEST_TOURNAMENT)
      .then((res) => res.json())
      .then((data) => setLatestTournament(data));
    let reference = ref(database, "tweets/ultbrawl");
    get(reference)
      .then((res) => res.toJSON())
      .then((data) => {
        setUltBrawlTweetId(data ? data["tweetId"] : "");
      });
    reference = ref(database, "tweets/melee");
    get(reference)
      .then((res) => res.toJSON())
      .then((data) => setMeleeTweetId(data ? data["tweetId"] : ""));
  }, []);

  // Get events of most recent tournament once it's loaded
  useEffect(() => {
    if (latestTournament["id"] != null) {
      fetch(ROUTES.SERVER_EVENTS_FROM_TOURNAMENT(latestTournament["id"]))
        .then((res) => res.json())
        .then((data) => {
          setLatestEvents(data["events"]);
        });
    }
  }, [latestTournament]);

  return (
    <>
      <Header />
      <Container>
        <Row className="banner">
          <div id="ultBanner" className="oddBanner">
            <img src={UltimateBanner} />
            <img src={UltimateBanner} />
          </div>
          <div id="melBanner" className="evenBanner">
            <img src={MeleeBanner} />
            <img src={MeleeBanner} />
          </div>
          <div id="brlBanner" className="oddBanner">
            <img src={BrawlBanner} />
            <img src={BrawlBanner} />
          </div>
          <div id="shade" />
          <div id="fade" />
          <div id="titleOverlay">
            <p>BU SMASH</p>
          </div>
        </Row>
        <Row id="infoRow">
          <Col lg={{ span: 3 }} id="tweetsCol">
            <Tweet tweetId={ultBrawlTweetId} options={{ width: "auto" }} />
            <Tweet tweetId={meleeTweetId} options={{ width: "auto" }} />
          </Col>
          <Col lg={{ span: 6 }} md={{ span: 7 }} id="welcomeCol">
            <h1 className="sectionTitle">Welcome</h1>
            <p>
              The Boston University Smash Society (BUSS) holds the biggest{" "}
              <i>Super Smash Bros.</i> gatherings at BU. For over six years,
              we've brought people together of all skill levels and backgrounds
              to enjoy playing with other people in Smash. We hold weekly
              tournaments for Ultimate, Melee, and Brawl throughout each school
              semester, and we look forward to seeing you at our next event!
            </p>
            <div className="btn-container">
              <Button href={ROUTES.ABOUT}>Read More</Button>
            </div>
            <h1 className="sectionTitle">Tournaments</h1>
            <p>
              Interested in checking out our history of events? We've archived
              several semesters worth of tournaments with key information and
              links to their bracket pages.
            </p>
            <div className="btn-container">
              <Button href={ROUTES.TOURNAMENTS}>Tournaments</Button>
            </div>
            <h1 className="sectionTitle">Players</h1>
            <p>
              We've also compiled detailed statistics for all players that have
              entered one of our events. Check them out below.
            </p>
            <div className="btn-container">
              <Button href={ROUTES.PLAYERS}>Players</Button>
            </div>
          </Col>
          <Col lg={{ span: 3 }} md={{ span: 5 }} id="latestTournamentsCol">
            <h1 className="sectionTitle">Latest Tournaments</h1>
            {latestEvents.length > 0 && (
              <TournamentCard
                title={latestEvents["0"]["tournamentName"]}
                date={latestTournament["date"]}
                events={latestEvents}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
