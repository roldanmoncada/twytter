// //  follower function......
// var followBtns = document.getElementsByClassName("follow-user-btn");
// for (let i = 0; i < followBtns.length; i++) {
//   followBtns[i].addEventListener("click", async function (clickEvent) {
//     alert("follow clicked...");
//     const response = await fetch(`/api/followers`, {
//       method: "POST",
//       body: JSON.stringify({
//         following: "",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert(response.statusText);
//     }
//   });
// }

// var unfollowBtns = document.getElementsByClassName("unfollow-user-btn");
// for (let i = 0; i < unfollowBtns.length; i++) {
//   unfollowBtns[i].addEventListener("click", function (clickEvent) {
//     alert("unfollowBtns clicked...");
//   });
// }
var followUserClick = async function (followingId, btn) {
  const response = await fetch(`/api/followers/${followingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    btn.innerHTML = "Unfollow";
    btn.removeAttribute("onclick");
    btn.setAttribute("onclick", "unFollowUserClick(this.id, this)");
  } else {
    alert(response.statusText);
  }
};

var unFollowUserClick = async function (followingId, btn) {
  const response = await fetch(`/api/followers/${followingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    btn.innerHTML = "Follow";
    btn.removeAttribute("onclick");
    btn.setAttribute("onclick", "followUserClick(this.id, this)");
  } else {
    alert(response.statusText);
  }
};
