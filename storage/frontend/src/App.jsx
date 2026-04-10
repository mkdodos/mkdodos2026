import { useEffect, useState } from "react";
import axios from "axios";
import TableDemo from "./compnents/TableDemo";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    try {
      const url = "http://localhost:3000/api/items";
      const response = await axios.get(url);
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <TableDemo dataSource={data} />
    </div>
  );
}

export default App;
