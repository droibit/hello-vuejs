const bodyParser = require("body-parser");

module.exports = app => {
  app.use(bodyParser.json());

  const users = {
    "foo@domain.com": {
      password: "12345678",
      userId: 1,
      token: "123456789abcdef"
    }
  };

  // タスクリストID
  let nextTaskListId = 1;
  // タスクID
  let nextTaskId = 1;

  // タスクリストIDを生成するヘルパー関数
  const generateTaskListId = () => nextTaskListId++;

  // タスクIDを生成するヘルパー関数
  const generateTaskId = () => nextTaskId++;

  // タスクを作成をするヘルパー関数
  const createTask = listId => ({
    id: generateTaskId(),
    name: `タスク${nextTaskId - 1}`,
    description: `これはタスク${nextTaskId - 1}です。`,
    listId
  });

  // タスクリストを作成するヘルパー関数
  const createTaskList = (name, num) => {
    const id = generateTaskListId();
    const list = { id, name, items: [] };
    for (let i = 0; i < num; i++) {
      list.items.push(createTask(id));
    }
    return list;
  };

  // ボード情報
  const board = {
    lists: [
      createTaskList("TODO", 2),
      createTaskList("WIP", 1),
      createTaskList("DONE", 1)
    ]
  };

  // ログインAPIのエンドポイント'/auth/login'
  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: "ログインに失敗しました。" });
      } else {
        res.json({ userId: user.userId, token: user.token });
      }
    } else {
      res.status(404).json({ message: "ユーザーが登録されていません。" });
    }
  });

  // ボードタスクリストAPIのエンドポイント'/lists'
  app.get("/lists", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません。" });
    }
    res.json({ lists: board.lists });
  });

  // タスクを追加するヘルパー関数
  function addTask(board, name, listId) {
    let task = null;
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i];
      if (list.id === listId) {
        task = {
          id: generateTaskId(),
          name,
          description: "",
          listId
        };
        list.items.push(task);
        break;
      }
    }
    return task;
  }

  // タスク追加APIのエンドポイント'/tasks/add'
  app.post("/tasks/add", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません。" });
    }
    const { name } = req.body;
    const listId = parseInt(req.body.listId);
    const task = addTask(board, name, listId);
    if (task) {
      res.status(201).json(task);
    } else {
      res
        .status(500)
        .json({ message: "何らかの原因でタスクの追加に失敗しました。" });
    }
  });

  // タスクを更新するヘルパー関数
  function updateTask(board, id, name, description, listId) {
    let ret = false;
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i];
      if (list.id !== listId) {
        continue;
      }
      for (let j = 0; j < list.items.length; j++) {
        const item = list.items[j];
        if (item.id === id) {
          item.name = name;
          item.description = description;
          ret = true;
          break;
        }
      }
    }
    return ret;
  }

  // タスク更新APIのエンドポイント'/tasks/:id/update'
  app.put("/tasks/:id/update", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません。" });
    }
    const { name, description } = req.body;
    const id = parseInt(req.params.id);
    const listId = parseInt(req.body.listId);
    const ret = updateTask(board, id, name, description, listId);
    if (ret) {
      res.sendStatus(200);
    } else {
      res
        .status(500)
        .json({ message: "何らかの原因でタスクの更新に失敗しました。" });
    }
  });

  // タスクを削除するヘルパー関数
  function removeTask(board, id) {
    board.lists.forEach(list => {
      list.items = list.items.filter(item => item.id !== id);
    });
  }

  // タスク削除APIのエンドポイント`/task/:id/remove`
  app.delete("/tasks/:id/remove", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません。" });
    }
    const id = parseInt(req.params.id);
    removeTask(board, id);
    res.sendStatus(204);
  });

  // ログアウトAPIのエンドポイント`/auth/logout`
  app.delete("/auth/logout", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません。" });
    }
    // NOTE: モックAPIサーバーなので、特にトークンの検証等は実装しない。
    res.sendStatus(204);
  });
};
