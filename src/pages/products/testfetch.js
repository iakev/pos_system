async function fetchData(url, authorizationToken) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${authorizationToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
const url = "http://127.0.0.1:8000/api/v1/products/";
const authorizationToken = "410fcdf64b6afcdd4af0eb3c0c1f8c88f81d8e70";

fetchData(url, authorizationToken)
  .then((data) => {
    // Handle the fetched data here
    console.log(data);
  })
  .catch((error) => {
    // Handle errors here
    console.error("An error occurred:", error);
  });
