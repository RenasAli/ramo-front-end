const STANDARD_URL = "http://localhost:8080/api";

const makeRequest = async (url, settings) => {
  const response = await fetch(`${STANDARD_URL}/${url}`,settings);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}`);
  }
  return data;
};

export default makeRequest
