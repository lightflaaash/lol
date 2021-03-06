import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import "./App.css";
import { Icon, Row } from "antd";
import Spell from "./spell.js";
import { SImg } from "./shared.styled";

export default function Itemdetail(props) {
  const [imgNum, setImgNum] = useState(0);
  function yadewerni(param) {
    if (param === "right") {
      if (fetchSkins.length - 1 === imgNum) setImgNum(0);
      else setImgNum(imgNum + 1);
    } else {
      if (imgNum === 0) setImgNum(fetchSkins.length - 1);
      else setImgNum(imgNum - 1);
    }
  }
  const SSpin = styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    font-size: 200px;
    color: black;
    margin: 0 400px;
  `;

  const Sdiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const SIcon = styled(Icon)`
    font-size: 50px;
    cursor: pointer;
  `;

  const [fetchData, setFetchData] = useState(null);
  const [fetchSkins, setFetchSkins] = useState([]);
  const [fetchSpells, setFetchSpells] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://ddragon.leagueoflegends.com/cdn/10.2.1/data/en_US/champion/${props.match.params.champion}.json`
    )
      .then(json => {
        setFetchData(json.data.data);
        setFetchSkins(
          json.data.data[props.match.params.champion].skins.map(
            skin => skin.num
          )
        );
        setFetchSpells(
          json.data.data[props.match.params.champion].spells.map(spell => spell)
        );
      })

      .catch(err => {
        props.history.push("/champions");
      });
  }, []);

  return fetchData ? (
    <>
      <h1 className="App">
        This is the champion {props.match.params.champion}
      </h1>
      <Sdiv>
        <SIcon type="left" onClick={() => yadewerni("left")} />
        <SImg
          loader={<SSpin type="loading" />}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.match.params.champion}_${fetchSkins[imgNum]}.jpg`}
          alt=""
        />
        <SIcon type="right" onClick={() => yadewerni("right")} />
      </Sdiv>
      <h1 className="App">Spells:</h1>
      <Row justify="center" type="flex" align="middle">
        {fetchSpells.map(spell => (
          <Spell
            key={spell.id}
            name={spell.name}
            id={spell.id}
            desc={spell.description}
          />
        ))}
      </Row>
    </>
  ) : (
    <SSpin type="loading" />
  );
}
