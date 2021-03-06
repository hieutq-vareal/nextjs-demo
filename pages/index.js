import { useEffect, useState } from "react";
import {connect} from 'react-redux';
import Head from "next/head";
import Link from "next/link";
import { Container, FormControl, Row, Col, Card } from "react-bootstrap";
import request from '../untils/request';
import { useQuery } from "react-query";
import { setPokemon } from '../Lib/redux/actions'

const getPokemon = async (key, q) => {
  const { data } = await request.get(`/api/search?q=${escape(q)}`);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

const Home = (props) => {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon);

  useEffect(() => {
      props.setPokemon(data)
  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>Pokemon!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Link href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{ maxHeight: 300 }}
                    />
                    <Card.Body>
                      <Card.Title>{name.english}</Card.Title>
                      <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);
  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    setPokemon: (data) => dispatch(setPokemon(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
