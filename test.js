const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));



// 处理 POST 请求 /auth/signin 路径
app.post("/auth/signin", (req, res) => {
  // 从请求体中获取 email、phone 和 password 数据
  const { email, password } = req.body;
  console.log("request signin", req.body);

  if (email === undefined || password === undefined)
    return res.status(400).send("missing something");
  else if (password !== "123")
    return res.status(401).send("Error password or email");
  // 假设这里是验证用户信息的逻辑

  // 返回包含 token 的响应数据
  return res.json({ token: "sajkdhjkasjkhgjsdhjaskdhjkhd" });
});

// 处理 GET 请求 /organizations 路径
app.get("/organizations", (req, res) => {
  // 返回指定格式的数据
  // console.log("request organizations");
  console.log(req.headers);
  const data = [
    {
      id: "12",
      name: "绿源天然气有限公司",
      description: "注塑机",
    },
    {
      id: "13",
      name: "绿源天然气有限公司2",
      description: "注塑机",
    },
    {
      id: "14",
      name: "绿源天然气有限公司3",
      description: "注塑机",
    },
  ];
  // console.log(data);
  res.json(data); // 将数据以 JSON 格式返回
});
var response = [
  {
    id: "6bd185f99fb725b27d8edc12",
    fullName: "John Well",
    email: "john@gmail.com",
    phone: "13812345678",
    nickname: "johnW",
    gender: 1,
    avatar:
      "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
    initialPassword: true,
    activatedAt: "2019-08-24T14:15:22Z",
    banned: false,
    role: 21,
  },
  {
    id: "6bd185f99fb725b27d8edc12123213",
    fullName: "John Wick",
    email: "Wick@gmail.com",
    phone: "13812345678",
    nickname: "johnW",
    gender: 0,
    avatar:
      "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
    initialPassword: false,
    activatedAt: "2019-08-24T14:15:22Z",
    banned: false,
    role: 21,
  },
];
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

app.get("/user", (req, res) => {
  console.log(req.query)

  console.log(response);
  return res.status(200).send(response);
});
app.get("/organizations/:organizationId", (req, res) => {
  // 返回指定格式的数据
  // console.log("request organizations");

  console.log(1);
  var data;
  const organizationId = req.params.organizationId;
  if (organizationId === "12")
    data = {
      id: "12",
      name: "绿源天然气有限公司12",
      description: "注塑机",
      address: "宁波莫干山路123号",
      contact: "张三",
      phone: "0574-87155701",
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    };
  else if (organizationId === "13")
    data = {
      id: "13",
      name: "绿源天然气有限公司13",
      description: "注塑机",
      address: "宁波莫干山路123号",
      contact: "张三",
      phone: "0574-87155701",
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    };
  else {
    data = {
      id: "14",
      name: "绿源天然气有限公司14",
      description: "注塑机",
      address: "宁波莫干山路123号",
      contact: "张三",
      phone: "0574-87155701",
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
    };
  }
  console.log("request organizationId::", organizationId);

  // console.log(data);
  res.json(data); // 将数据以 JSON 格式返回
});

app.post("/user", (req, res) => {
  // 返回指定格式的数据
  // console.log("request organizations");
  console.log(req.body);
  var data = req.body;
  data.id = generateRandomString(20)
  response = [...response,data] 
  console.log(response);
  res.json(data); // 将数据以 JSON 格式返回
});
// 启动服务器，监听端口
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
