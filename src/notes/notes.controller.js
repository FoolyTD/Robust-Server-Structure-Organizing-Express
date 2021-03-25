const notes = require("../data/notes-data");

const noteExists = (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id not found: ${req.params.noteId}`,
    });
  }
};

const hasText = (req, res, next) => {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  return next({ status: 400, message: "A 'text' property is required." });
};

function create(req, res, next) {
  const { data: { text } = {} } = req.body;

  const newNote = {
    id: notes.length + 1, // Assign the next ID
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

function list(request, response) {
  response.json({ data: notes });
}

function read(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  res.json({ data: foundNote });
}

function update(req, res, next) {
 const noteId = Number(req.params.noteId);
 const foundNote = notes.find((note) => note.id === noteId);

const oldText = foundNote["text"];

const {data:{text}={}} = req.body;

foundNote["text"] = text;
res.json({data: foundNote});

}

function destroy(req, res) {
    res.sendStatus(204);  
}

module.exports = {
  create: [hasText, create],
  list,
  read: [noteExists, read],
  update: [noteExists, hasText, update],
  delete: [noteExists, destroy],
};
