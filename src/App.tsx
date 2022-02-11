import { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Result from './components/Result';
import Loading from './components/Loading';
import './App.css';

export type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  });
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      fetch(`//api.weatherapi.com/v1/current.json?key=cb9a9d5e28d7422891c143529221002&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon
        })
        setCity("");
        setLoading(false);
      })
      .catch(err => alert("エラーが発生しました。ページをリロードして、もう1度トライしてください。"))
  }
  return (
    <div className="wrapper">
      <div className='container'>
        <Title/>
        <Form city={city} setCity={setCity} getWeather={getWeather}/>
        {loading ? <Loading/> : <Result results={results}/>}
      </div>
    </div>
  );
}

export default App;
