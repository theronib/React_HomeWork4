import React, { useState } from "react";
import "./App.css";

const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Назва події обов'язкова!");
      return;
    }
    onAddEvent({ title, description, id: Date.now() });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Додати подію</h2>
      <input
        type="text"
        placeholder="Назва події"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

const CommentForm = ({ onAddComment }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Коментар не може бути порожнім!");
      return;
    }
    onAddComment({ name, comment, id: Date.now() });
    setName("");
    setComment("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Додати коментар</h2>
      <input
        type="text"
        placeholder="Ваше ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Коментар"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="container">
      <h1>Управління подіями та коментарями</h1>
      <div className="forms-container">
        <EventForm onAddEvent={handleAddEvent} />
        <CommentForm onAddComment={handleAddComment} />
      </div>
      <div className="lists-container">
        <h3>Події</h3>
        <ul className="list">
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
        </ul>
        <h3>Коментарі</h3>
        <ul className="list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong>: {comment.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
