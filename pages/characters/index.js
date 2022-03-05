import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Header, Icon, List, Image } from "semantic-ui-react";
import styles from "../../styles/Characters.module.css";
//
export default function CharacterList({ res }) {
  //
  const initialRes = useRef(res);
  const [search, setSearch] = useState(res);
  const input = useRef("");
  const router = useRouter();
  //   console.log(res);
  console.log("here -------------------------", search);
  console.log("re-render 2");
  //
  function filterByID(item) {
    if (item.name.includes(input.current) === true) {
      return true;
    }
    return false;
  }
  async function handleSubmit() {
    console.log("hello");
    let hold = initialRes.current.filter(filterByID);
    await setSearch(hold);
  }
  //
  if (res !== undefined) {
    return (
      <div style={styles.outsideContainer}>
        <div className={styles.container}>
          <Header as="h2" color="yellow">
            <Icon name="search" color="yellow" />
            <Header.Content>
              Search
              <Header.Subheader
                style={{
                  backgroundColor: "#FFBD59",
                  padding: "2px",
                  borderRadious: "32px",
                }}
              >
                For Characters
              </Header.Subheader>
            </Header.Content>
          </Header>
          <div>
            <Input
              // fluid
              style={{ minWidth: "75%", marginRight: "1rem" }}
              focus
              placeholder="Search..."
              onChange={(e) => {
                input.current = e.target.value;
              }}
            />
            <Button
              // fluid
              style={{
                margin: "1rem 0",
                backgroundColor: "#FFBD59",
                maxWidth: "50%",
              }}
              // onClick={() => {
              //   router.push(`/domains/${input.current}`);
              // }}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </div>
          {/* <Image src="/1.png" alt="me" width={1000} height={500} /> */}

          <List divided relaxed style={{ maxHeight: "50vh" }}>
            {search.length !== undefined ? (
              <div
                style={{
                  height: "75vh",
                  minWidth: "50vw",
                  borderRadius: "1rem",
                  border: "1px black solid",
                  overflowY: "scroll",
                }}
              >
                {search.map((item, index) => {
                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        border: "1px solid white",
                        borderRadius: "1rem",
                        margin: "1rem",
                        padding: "1rem",
                        backgroundColor: "#FFBD59",
                      }}
                    >
                      <List.Item
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          avatar
                          alt="img"
                          src={item.image}
                          style={{ marginRight: "2rem" }}
                        />
                        <List.Content>
                          <List.Header as="a">
                            {item.name} - {item.actor}
                          </List.Header>
                          <List.Description>
                            {`${item.gender !== "male" ? "She" : "He"} is `}
                            <b>{item.house}</b>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Couldnt retrieve anything.</div>
            )}
          </List>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export async function getServerSideProps() {
  const req = await fetch("http://hp-api.herokuapp.com/api/characters");
  const data = await req.json();

  return {
    props: { res: data },
  };
}
