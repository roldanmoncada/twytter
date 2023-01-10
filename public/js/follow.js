async function followHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/following/${id}`, {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Followed successfully!");
    // document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}



document.querySelector(".follow-btn").addEventListener("click", followHandler);
