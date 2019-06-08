const getInfo = function getInfoForView() {
  fetch('api/get_info.php', {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      console.log(response.text());
    } else {
      alert("Couldn't send name.");
    }
  });
};

export default function displayInfo() {
  getInfo();
}
