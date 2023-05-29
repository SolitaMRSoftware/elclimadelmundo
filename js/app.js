/*traigo la clave api de open weather */
const apikey = "ac185c80e383d5564d3ec8958911b62e";

/*declaro las variables */
const climaEl = document.getElementById('weather-data');
const ciudadInputEl = document.getElementById('city-input');

const formEl = document.querySelector('form');

/**hago una funcion para activar el formulario */
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  /**hago una constante para asignarle el valor que ingrese en el input*/
  const ciudad = ciudadInputEl.value;
  /**llamo a la funcion que espera por la API */
  getWeather(ciudad);
});

/**esta funcion toma los datos que le pido */
async function getWeather(ciudad) {
  try {
    const respuesta = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric`);

    if (!respuesta.ok) {
      throw new Error("Ha ocurrido un error. Intente más tarde");
    }

    const data = await respuesta.json();
    console.log(data)

    /**creo las variables para reemplazar con los datos de API */

    const temperatura = Math.round(data.main.temp);

    const descripcion = data.weather[0].description;

    /* el icono me rompe para abajo*
    const icono = data.weather[0].icon;*/

    const detalles = [
      `S. Térmica: ${Math.round(data.main.feels_like)}°C`,
      `Humedad: ${data.main.humidity}%`,
      `Viento: ${data.wind.speed}k/h`,
    ]

    /*
    climaEl.querySelector('.icono').innerHTML = `<img src="http://openweathermap.org/img/wn/${icono}.png" alt="weather icon"> `; */


    climaEl.querySelector('.temperature').textContent = `${temperatura}°C`;

    climaEl.querySelector('.description').textContent = `${descripcion}`;

    climaEl.querySelector('.details').innerHTML = detalles.map((detalles) => `<div>${detalles}</div>`).join('');  /**uso join para unir con una sepacion vacia */

  } catch (error) {}
}
