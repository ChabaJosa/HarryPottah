import { useRouter } from "next/router";
import { List } from "semantic-ui-react";

export default function Character({ res }) {
  const router = useRouter();
  const { name } = router.query;
  console.log(res);
  return (
    <div style={styles.outsideContainer}>
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          minWidth: "100%",
        }}
      >
        Characters Here
      </h1>
      <div>
        <List divided relaxed style={{ maxHeight: "50vh" }}>
          {res.domains !== undefined ? (
            <>
              {res.map((item) => {
                return (
                  <>
                    <List.Item>
                      <List.Icon
                        name="globe"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <List.Header as="a">{item.name}</List.Header>
                        <List.Description as="a">
                          Date of Birth {item.dateOfBirth}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </>
                );
              })}
            </>
          ) : (
            <div>Couldnt retrieve anything.</div>
          )}
        </List>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const req = await fetch(
    `https://api.domainsdb.info/v1/domains/search?limit=50&domain=${params.name}&country=us`
  );
  const data = await req.json();

  return {
    props: { res: data },
  };
}
