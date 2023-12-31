import { Container, Row, Col, Table } from "react-bootstrap";

import { MAPS_EMBED_CAS } from "../../global/routes";
import { MAPS_KEY } from "../../global/apikeys";

const WhereWhen = () => {
  return (
    <Container>
      <h1 id="wherewhen" className="sectionTitle">
        Where & When
      </h1>
      <Row className="wwDesc">
        <Col md={{ span: 6, offset: 0 }}>
          <p>
            All main events are held in BU's College of Arts and Sciences (CAS)
            at 725 Commonwealth Ave. <i>Ultimate</i> and <i>Brawl</i> events
            happen every Saturday in CAS room 426, and <i>Melee</i> events
            happen every Friday in CAS room 227. All events are open until their
            bracket has been completed.
          </p>
          <p>
            BU Bimonthly events are held on one or two Saturdays each semester
            in BU's Photonics Center (PHO) at 8 St. Mary's Street. They're
            located on the 9th floor colloquium room. Their exact date varies
            each semester.
          </p>
        </Col>
        <Col>
          <iframe
            className="mapsEmbed"
            loading="lazy"
            src={MAPS_EMBED_CAS + MAPS_KEY}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 4, offset: 0 }}>
          <h3 className="sectionTitle">Melee</h3>
          <p>Fridays, CAS Room 227</p>
          <Table bordered size="md">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5:15 p.m.</td>
                <td>Doors open</td>
              </tr>
              <tr>
                <td>6:00 p.m.</td>
                <td>Bracket starts</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col lg={{ span: 4, offset: 0 }}>
          <h3 className="sectionTitle">Ultimate & Brawl</h3>
          <p>Saturdays, CAS Room 426</p>
          <Table bordered size="md">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2:00 p.m.</td>
                <td>Doors open</td>
              </tr>
              <tr>
                <td>3:00 p.m.</td>
                <td>Brawl bracket starts</td>
              </tr>
              <tr>
                <td>4:30 p.m.</td>
                <td>Ultimate bracket starts</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col lg={{ span: 4, offset: 0 }}>
          <h3 className="sectionTitle">Bimonthly</h3>
          <p>Date varies, PHO 9th Floor Colloquium Room</p>
          <Table bordered size="md">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12:00 p.m.</td>
                <td>Doors open</td>
              </tr>
              <tr>
                <td>Varies</td>
                <td>Brawl bracket starts</td>
              </tr>
              <tr>
                <td>Varies</td>
                <td>Side bracket starts</td>
              </tr>
              <tr>
                <td>4:00 p.m.</td>
                <td>Ultimate bracket starts</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default WhereWhen;
