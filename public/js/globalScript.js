$("#removeProjectBtn").on("click", function() {
  console.log("Clicked");
  const projectId = $(this).attr("value");
  console.log(projectId);
  $.ajax({
    type: "DELETE",
    url: "/my-projects/delete/" + projectId,
    success: function(data) {
      console.log(data);
      location.reload();
    }
  });
});
