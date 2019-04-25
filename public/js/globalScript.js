///This Script handles custom ajax call to the Rest API (app.js or sub routers)

//#region Removing Project
//since the remove button was a link insted of a button I used this ajax call to send
//a DELET request to the Rest API (app.js or sub routers)
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
//#endregion

//#region Adding Content Custom Ajax Method
/* This ajax call sends a POST data to the rest API (app.js or sub routers) through the listed url bellow
 * Custom Ajax call was used because unlike material of the projects the content did not have a seperate page.
 * So the button required a value that holds the _id of the instance of the section (section[i]) */
$("#addContentSubmitBtn").on("click", function(e) {
  e.preventDefault();
  console.log("Clicked");
  const sectionId = $("#addContentBtn").attr("value");
  console.log(sectionId);
  $.ajax({
    type: "POST",
    url: "/contents/add/" + sectionId,
    data: {
      cUrl: $("#contentUrl").val(),
      cText: $("#contentText").val()
    },
    success: function(data) {
      //location.reload();
      console.log(data);
    },
    error: function(error) {
      console.log(error);
    }
  });
});
//#endregion end of Adding Content
