const apiKey="6SKV7MB34N872JG94LLNA9HA9";

export async function fetchWeatherData(location) {
  const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}?unitGroup=metric&key=${apiKey}&include=current`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log("VC API Raw:", data);
    return data;
  } catch (err) {
    console.error("Visual Crossing API error:", err);
    return null;
  }
}

export function processedWeatherData(data) {
  if (!data || !data.currentConditions) return null;

  return {
    location: data.resolvedAddress,
    temp: `${data.currentConditions.temp}°C`,
    description: data.currentConditions.conditions,
    icon: getIconURL(data.currentConditions.icon),
  };
}


const giphyApiKey = "oz5hc3W6wlc0jGPBznbNqjmadOHH0DQS";

export async function fetchGifForCondition(condition) {
  const query = encodeURIComponent(condition + " weather");
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=1`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].images.original.url;
    } else {
      return null; // fallback image if nothing found
    }
  } catch (err) {
    console.error("Giphy fetch error:", err);
    return null;
  }
}
function getIconURL(iconCode) {
  return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${iconCode}.png`;
}
