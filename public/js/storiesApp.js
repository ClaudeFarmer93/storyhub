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
