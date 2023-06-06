import express, { Application, Request, Response } from "express";
import crypto from "crypto";
import axios from "axios"

const port: number = 3039;
const app: Application = express();

interface iData {
  name?: string;
  price?: number;
  id?: string;
}

const dataSet: iData[] = [];

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  try {
    return res
      .status(200)
      .json({ message: "reading from database...", data: dataSet });
  } catch (error) {
    throw error;
  }
});
app.post("/create", (req: Request, res: Response): Response => {
  const { name, price } = req.body;

  const newID = crypto.randomUUID();

  const newObj = {
    id: newID,
    name,
    price,
  };

  const adddata = dataSet.push(newObj);
  try {
    return res
      .status(201)
      .json({ message: "creating into database...", data: dataSet });
  } catch (error) {
    throw error;
  }
});

app.get("/:id",(req:Request, res:Response)=>{
  try {
    const {id}= req.params;
    const mynewData= dataSet.filter((props:any)=>{
      return props.id ===id;

    })

    return res.status(200).json({
      message: "Removing one from the DataBase",
      data: mynewData
    })
  } catch (error) {
    throw error;
  }
})

app.get("/api/github", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const url = `https://api.github.com/users/${name}`;

    const myData = await axios.get(url).then((res) => {
      return res.data;
    });

    return res.status(200).json({
      message: "Accessing API from Github",
      data: myData,
    });
  } catch (error) {
    if (error) {
      res.write(`This is a 404 message`);
      res.end();
    } else {
      res.end();
    }
  }
});


app.listen(port, () => {
  console.log("");
  console.log("listening on port", port);
});
