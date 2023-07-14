const message = require("../../models/message");

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/stories?format=json", (data) => {
      data.forEach((story) => {
        $(".modal-body").append(
          `<div>
   <span class="story-title">
   ${story.title}
   </span>
   <div class="story-content">
   ${story.content}
   </div>
   </div>`
        );
      });
    });
  });
});

const socket = io();
$("#chatForm").submit(() => {
  let text = $("#chat-input").val(),
    userName = $("#chat-user-name").val(),
    userId = $("#chat-user-id").val();
  socket.emit("message", {
    content: text,
    userName: userName,
    userId: userId,
  });
  $("#chat-input").val("");
  return false;
});
socket.on("message", (message) => {
  displayMessage(message.content);
});
socket.on("load all messages", (data) => {
  data.forEach((message) => {
    displayMessage(message);
  });
});
let displayMessage = (message) => {
  $("#chat").prepend(
    $("<li>").html(`
  <strong class="message ${getCurrentUserClass(message.user)}">
  ${message.userName}
  </strong>: ${message.content}
  `)
  );
};
let getCurrentUserClass = (id) => {
  let userId = $("#chat-user-id").val();
  return userId === id ? "current-user" : "";
};
